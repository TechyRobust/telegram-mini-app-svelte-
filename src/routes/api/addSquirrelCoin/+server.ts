import { prisma } from "$lib/prisma";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from './$types';

//In here, user squirrel coin value will change.
export const POST: RequestHandler = async ({ request, cookies }) => {
    //Get parameter data from request.
    const reqParam = await request.json();
    //Get user information from database using reqParam.id.
    const result = await getUserInformation(reqParam.id);

    let squirrelCoin = 10;
    let boostCoin = 0;

    //If user doesn't exist, return failed message.
    if (result) {
        //These values will be updated in database.
        let sumSquirrel = 10;
        let sumBoost = 0;
        //Get current time.
        const now = new Date();
        //Get coin amount.
        boostCoin = parseInt(result.level_boost_coin);
        const nowTime = now.getTime();
        if (result.sumsquirrel) squirrelCoin = squirrelCoin + parseInt(result.sumsquirrel);
        if (result.sumboost) boostCoin = parseInt(result.sumboost) + parseInt(result.level_boost_coin);
        //If the reuest is when start this game.....
        //Check bonus amount and do it.
        if (reqParam.isfirst) {
            if (reqParam.coin > 2) {
                sumSquirrel = squirrelCoin * 2 + parseInt(result.squirrel_coin);
                sumBoost = boostCoin * 2 + parseInt(result.boost_coin);
            }
            else if (reqParam.coin != 0) {
                sumSquirrel = squirrelCoin * reqParam.coin + parseInt(result.squirrel_coin);
                sumBoost = boostCoin * reqParam.coin + parseInt(result.boost_coin);
            }
            else {
                return json({status: "not", updateUser: JSON.stringify(result)});
            }
        }
        else {
            if (parseInt(result.accept_bonus_last_date) + 3600000 > nowTime) return json({status: false});
            sumSquirrel = squirrelCoin + parseInt(result.squirrel_coin);
            sumBoost = boostCoin  + parseInt(result.boost_coin);
        }
       
        //Update user squirrel coin or tron coin or boost coin amount
        const updateResult = await prisma.users.update({
            where: {
                id: reqParam.id
            },
            data: {
                squirrel_coin: sumSquirrel,
                boost_coin: sumBoost,
                accept_bonus_last_date: `${nowTime}`,
            }
        })
        //Get user information updated by you.
        const updateUser = await getUserInformation(updateResult.id);
        //Return updated user data.
        return json({status: "success", updateUser: JSON.stringify(updateUser)});
    }
    else {
        return json({status: "failed"});
    }
}

//This function will return user information related by level, card.
const getUserInformation = async (id : number) => {
    const result : any = await prisma.$queryRawUnsafe(`SELECT users.*, level.useful_energy, level.title, level.boost_coin AS level_boost_coin, level.per_tap, level.target_count, level.default_add_energy, newcard.sumsquirrel, newcard.sumenergy, newcard.sumboost FROM users INNER JOIN level ON users.level_id = level.id AND users.id = ${id} LEFT JOIN (SELECT improvecard.user_id, SUM(card.squirrel_coin_amount + card.add_squirrel * (improvecard.level - 1)) AS sumsquirrel, SUM(card.energy_amount + card.add_energy * (improvecard.level - 1)) AS sumenergy, SUM(card.boost_coin_amount + card.add_boost * (improvecard.level - 1)) AS sumboost FROM improvecard INNER JOIN card ON improvecard.card_id = card.id GROUP BY improvecard.user_id) AS newcard ON users.id = newcard.user_id;`);
    return result[0];
}