import type { RequestHandler } from './$types';
import { json } from "@sveltejs/kit";
import { prisma } from '$lib/prisma';
import { Prisma } from '@prisma/client';

//This api will be used by changing user information including user Squirrel Coin amount and user level, User Energy, user tap count.
//And will return the data was updated.
export const POST: RequestHandler = async ({ request, cookies }) => {
    try {
        //get data from request.
        let reqParam = await request.json();
        if (reqParam.count == 0 && reqParam) return json({ status: false });
        //get telegram_id from cookie.
        let cookieHash = cookies.get("hash");
        //If cookie hash is empty, probably it is fake. 
        if (!cookieHash || cookieHash == undefined || cookieHash == '') return json({ status: false });
        //get user data from cookie.
        let cookieCount: any = cookies.get("count");

        //get data from request.
        let count = reqParam.count;
        let paramUserCount = reqParam.userCount;
        let paramLevelCount = reqParam.levelCount;
        //If cookie count is not match parameter count
        //It maybe fake 
        if (count != parseInt(cookieCount)) return json({ status: false });


        //find user data from database.
        const user = await prisma.users.findUnique({
            where: {
                telegram_id: cookieHash
            }
        });
        //If there is user information .....
        //If not match database count and param data, it is fake.
        if (user?.count == (parseInt(paramUserCount) - parseInt(count))) {
            let newLevel = user.level_id;
            //check for user level
            if (paramLevelCount <= parseInt(paramUserCount)) {
                newLevel++;
                count = paramUserCount - paramLevelCount;
                //If level up, maybe task has complete.
                // const task = await prisma.
                const findTask = await prisma.task.findMany({
                    where: {
                        task_type: 8,
                        task_target_id: newLevel - 1,
                    }
                })

                //Find task history
                const findHistory = await prisma.task_history.findMany({
                    where: {
                        task_user_id: user?.id,
                    }
                })
                let levelCount = 0;
                if (newLevel > 10) {
                    newLevel = 10;
                    count = paramLevelCount;
                }
                findHistory.forEach(async ele => {
                    levelCount++;
                    if (ele.task_state == 1) {
                        let taskState: any = 1;
                        if (levelCount == newLevel - 1) {
                            taskState = 2;
                        }
                        await prisma.task_history.update({
                            where: {
                                id: ele.id
                            },
                            data: {
                                task_state: taskState,
                                task_progress: newLevel
                            }
                        })
                    }
                })
                // const newTaskHistory = {
                //     task_user_id: user?.id,
                //     task_id: findTask[0].id,
                //     task_state: 2,
                //     task_progress: 2,
                // }
                //Create new TaskHistory
                // await prisma.task_history.create({data: newTaskHistory});
            }
            else {
                count = user.count + count;
            }
            //get date for now.
            const now = new Date();
            let currentDate = now.getTime();

            //user data update
            const updateUser = await prisma.users.update({
                where: {
                    telegram_id: cookieHash
                },
                data: {
                    count: count,
                    level_id: newLevel,
                    last_date: `${currentDate}`,
                    energy: reqParam.energy,
                }

            })

            //First, check user level.
            //If user level was changed, will return changing user data.
            const result: any = await prisma.$queryRawUnsafe(`SELECT users.*, level.useful_energy, level.title, level.boost_coin AS level_boost_coin, level.per_tap, level.target_count, level.default_add_energy, newcard.sumsquirrel, newcard.sumenergy, newcard.sumboost FROM users INNER JOIN level ON users.level_id = level.id AND users.telegram_id = '${cookieHash}' LEFT JOIN (SELECT improvecard.user_id, SUM(card.squirrel_coin_amount + card.add_squirrel * (improvecard.level - 1)) AS sumsquirrel, SUM(card.energy_amount + card.add_energy * (improvecard.level - 1)) AS sumenergy, SUM(card.boost_coin_amount + card.add_boost * (improvecard.level - 1)) AS sumboost FROM improvecard INNER JOIN card ON improvecard.card_id = card.id GROUP BY improvecard.user_id) AS newcard ON users.id = newcard.user_id;`);
            return json({ status: "success", updateUser: JSON.stringify(result[0]) });

        }
        else {
            return json({ status: "failed" })
        }
    }
    catch (err) {
        //If including error.
        console.error("error:", err);
        return json({ status: "error" + err });
    }
}