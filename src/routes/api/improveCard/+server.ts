import type { RequestHandler } from './$types';
import { json } from "@sveltejs/kit";
import { prisma } from '$lib/prisma';

//Using this, user can improve the card of oneself.
export const POST: RequestHandler = async ({ request, cookies }) => {
    //Get data from request.
    const reqParam = await request.json();
    //Get hash value from cookies.
    let hashValue = cookies.get("hash");
    //Find user information using hashValue
    const findUser = await prisma.users.findUnique({
        where: {
            telegram_id: hashValue
        }
    });
    //Find card information using card_id from request.
    const findCard = await prisma.card.findUnique({
        where : {
            id: reqParam.card_id
        }
    });
    let userBoost = 0;
    //Get card information using card id.
    const cardInfo = await getCardCost(findCard.id);
    //Check card information.
    if (cardInfo || cardInfo == undefined) {
        //Check if user's boost coin is enough.
        if (findCard?.cost > findUser?.boost_coin) {
            return json({status: false, content: "Squirrel Coin is not enough!!!"});
        }
        else {
            userBoost = parseInt(findUser?.boost_coin) - parseInt(findCard?.cost);
        }
    }
    else if (cardInfo.sumcost > findUser?.boost_coin) {
        return json({status: false, content: "Squirrel Coin is not enough!!!"});
    }
    else {
        userBoost = parseInt(findUser?.boost_coin) - parseInt(cardInfo.sumcost);
    }
    if (findUser?.level_id >= parseInt(findCard?.require_user_level)) {
        //Fond improvecard in database.
        const targetCard : any = await prisma.$queryRawUnsafe(`SELECT MAX(improvecard.level) AS maxlevel FROM improvecard WHERE improvecard.user_id = ${findUser?.id} AND improvecard.card_id = ${findCard?.id} GROUP BY user_id;`);
        //Get new card level.
        let cardLevel = 1;
        if(targetCard.length != 0) {
            cardLevel = parseInt(targetCard[0].maxlevel) + 1;
        }
        //Update user's level.
        if (cardLevel > 10) return json({ status: false, content: "Вы достигли максимального" })
        await prisma.users.update({
            where: {
                id: findUser?.id
            },
            data: {
                boost_coin: userBoost
            }
        });
        //Create improvecard in database.
        const result = await prisma.improvecard.create({
            data: {
                user_id: findUser?.id,
                card_id: reqParam.card_id,
                level: cardLevel
            }
        })
        //Find task of improve card.
        const findTask = await prisma.task.findFirst({
            where: {
                task_type: 5,
                task_target_id: findCard?.id
            }
        })
        //Find task history of improve card.
        const findTaskHistory = await prisma.task_history.findFirst({
            where: {
                task_user_id: findUser?.id,
                task_id: findTask?.id
            }
        })
        //If task history found, update task progress.
        if (findTaskHistory) {
            if (findTaskHistory.task_state == 1) {
                //update task progress and task_state.
                let newState = 1;
                if (cardLevel >= findTask?.task_target) {
                    newState = 2
                }
                await prisma.task_history.update({
                    where: {
                        id: findTaskHistory.id
                    },
                    data: {
                        task_progress: cardLevel,
                        task_state: newState
                    }
                })
            }
        }
        else {
            //Create new task history.
            const newHistory = {
                task_user_id: findUser?.id,
                task_id: findTask?.id,
                task_state: 1,
                task_progress: cardLevel
            }
            await prisma.task_history.create({data: newHistory});
        }
        //Get updated card information.
        const updateCard = await prisma.$queryRawUnsafe(`SELECT card.*, MAX(improvecardtable.level) + 1 AS maxLevel, card.squirrel_coin_amount + card.add_squirrel * (MAX(improvecardtable.level)) AS sumsquirrel, card.boost_coin_amount + card.add_boost * (MAX(improvecardtable.level)) AS sumbooster, card.energy_amount + card.add_energy * (MAX(improvecardtable.level)) AS sumenergy, card.cost + card.add_cost * MAX(improvecardtable.level) AS sumcost FROM card LEFT JOIN (SELECT * FROM improvecard WHERE improvecard.user_id = ${findUser?.id} ORDER BY improvecard.id DESC) AS improvecardtable ON card.id = improvecardtable.card_id GROUP BY card.id;`);
        //Get updated user information.
        const updateUser = await prisma.$queryRawUnsafe(`SELECT users.*, level.useful_energy, level.title, level.boost_coin AS level_boost_coin, level.per_tap, level.target_count, level.default_add_energy, newcard.sumsquirrel, newcard.sumenergy, newcard.sumboost FROM users INNER JOIN level ON users.level_id = level.id AND users.telegram_id = '${hashValue}' LEFT JOIN (SELECT improvecard.user_id, SUM(card.squirrel_coin_amount + card.add_squirrel * (improvecard.level - 1)) AS sumsquirrel, SUM(card.energy_amount + card.add_energy * (improvecard.level - 1)) AS sumenergy, SUM(card.boost_coin_amount + card.add_boost * (improvecard.level - 1)) AS sumboost FROM improvecard INNER JOIN card ON improvecard.card_id = card.id GROUP BY improvecard.user_id) AS newcard ON users.id = newcard.user_id;`)
        //Return updated user and card information.
        return json({
            status: true, updateUser: JSON.stringify(updateUser[0]), updateCard: JSON.stringify(updateCard, (key, value) => {
            if (typeof value === 'bigint') {
                return value.toString()
            }
            return value})});
    }
    return json({status: false, content: "This card is not allowed for your level!!!"});
}

const getCardCost = async (id : any) => {
    const result : any = await prisma.$queryRawUnsafe(`SELECT card.id, SUM(card.cost + card.add_cost * (improvecard.level - 1)) AS sumcost FROM improvecard INNER JOIN card ON improvecard.card_id = card.id AND card.id = ${id} GROUP BY card.id;`);
    return result[0];
}