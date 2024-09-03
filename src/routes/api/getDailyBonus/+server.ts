import type { RequestHandler } from './$types';
import { json } from "@sveltejs/kit";
import { prisma } from '$lib/prisma';

//This will get daily bonus datas.
export const POST: RequestHandler = async ({ request, cookies }) => {
    //Get data from request. 
    const reqParam = await request.json();
    //Find daily bonus history data with user id and daily bonus id.
    const findDailyHistory = await prisma.daily_bonus_history.findMany({
        where: {
            user_id: reqParam.userId,
            daily_step: reqParam.dailyId
        }
    })
    //Get current date and time.
    const now = new Date();
    const nowTime = now.getTime();
    //Get one day millisecond.
    const oneDay = 360000 * 24;
    if (reqParam.dailyId == 1) {
        //Create daily bonus history data.
        await prisma.daily_bonus_history.create({
            data: {
                user_id: parseInt(reqParam.userId),
                daily_bonus_accept_date: `${nowTime}`,
                daily_step: 2
            }
        })
    }
    else {
        //If request is bad, this will return error message.
        if (findDailyHistory.length == 0) {
            return json({ status: false, content: "Вы не можете получить ежедневный бонус. Вы можете быть фейком."});
        }
        //Check the time of daily bonus...
        if (parseInt(findDailyHistory[0].daily_bonus_accept_date) + oneDay <= nowTime) {
            //Update daily bonus history data.
            const updateHistory = await prisma.daily_bonus_history.updateMany({
                where: {
                    user_id: reqParam.userId,
                    daily_step: reqParam.dailyId
                },
                data: {
                    daily_step: findDailyHistory[0].daily_step + 1,
                    daily_bonus_accept_date: `${nowTime}`
                }
            })
        }
        else {
            return json({ status: false, content: "Но до сих пор вы не можете получить этот бонус!!!"});
        }
    }
    //Get daily bonus information
    const findDayInfo = await prisma.daily_bonus.findUnique({
        where: {
            id: reqParam.dailyId
        }
    })
    //Get daily bonuse amount and type.
    let addSquirrel : any = 0;
    let addBoost : any = 0;
    let addTron : any = 0;
    if (reqParam.dailyType == 1) {
        addSquirrel = findDayInfo?.daily_bonus_cost;
    }
    else if (reqParam.dailyType == 2) {
        addBoost = findDayInfo?.daily_bonus_cost;
    }
    else {
        addTron = findDayInfo?.daily_bonus_cost;
    }
    //Update user's squirrel coin or boost coin or tron coin.
    const updateUser = await prisma.users.update({
        where: {
            id: reqParam.userId
        },
        data: {
            squirrel_coin: {increment: addSquirrel},
            boost_coin: {increment: addBoost},
            tron_coin: {increment: addTron}
        }
    })
    //Return success message.
    return json({status: true});
}