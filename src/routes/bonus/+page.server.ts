import { prisma } from '$lib/prisma.js';

//Wen page load, this function will get daily bonus detail frm database.

export const load = (async ({ cookies }) => {
    //Get hash telegram_id from cookie.
    const cookieHash = cookies.get("hash");
    if (cookieHash) {
        //base on cookie, will find user information.
        const userInfo = await prisma.users.findUnique({
            where: {
                telegram_id: cookieHash
            }
        })
        
        //with user id, will find daily bonus history.
        const historyResult = await prisma.daily_bonus_history.findMany({
            where: {
                user_id: userInfo?.id
            }
        })

        //always get 7 daily bonus
        let min = 0;
        let max = 7;
        let dailyHistory : any = null;
        
        let result = await prisma.daily_bonus.findMany({
            
        });

        //Add more information, (isChecked: if receive the bonus, this will be true. if not, it will be false.)
        //(isPossible: if it's about time to receive bonus, this will be true, if not, it will be false.)
        result.forEach(day => {
            if (historyResult == null || historyResult.length == 0) {
                if (day.id == 1) {
                    day.isChecked = false;
                    day.isPossible = true;
                }
                else {
                    day.isChecked = false;
                    day.isPossible = false;
                }
            }
            else {
                const oneDay = 3600000 * 24;
                if (parseInt(day.id) < parseInt(historyResult[0].daily_step)) {
                    day.isChecked = true;
                    day.isPossible = true;
                }
                else if(parseInt(day.id) > parseInt(historyResult[0].daily_step)) {
                    day.isChecked = false;
                    day.isPossible = false;
                }
                else {
                    const now = new Date();
                    const nowTime = now.getTime();
                    day.isChecked = false;
                    if (nowTime < parseInt(historyResult[0].daily_bonus_accept_date) + oneDay) {
                        day.isPossible = false;
                    }
                    else {
                        day.isPossible = true;
                    }
                }
            }
        });
        //Get invite history from database.
        const inviteHistory = await prisma.$queryRawUnsafe(`SELECT invite_history.*, invited_user.avatar_url, invited_user.chatId, invited_user.nick_name FROM invite_history INNER JOIN users ON users.telegram_id = '${cookieHash}' AND users.id = invite_history.user_id LEFT JOIN users AS invited_user ON invite_history.invited_user_id = invited_user.id;`);
        //Get task datas from database for bonus page.
        const userTask = await prisma.$queryRawUnsafe(`SELECT task.*, task_history.task_state, task_history.task_progress, card.card_avatar, level.squirrel_url FROM task LEFT JOIN task_history ON task_history.task_id = task.id AND task_history.task_user_id = ${userInfo?.id} LEFT JOIN level ON task.task_type = 8 AND level.id = task.task_target_id LEFT JOIN card ON task.task_type = 5 AND task.task_target_id = card.id;`);
        //return all result to bonus page.
        return {dailyBonus: result, inviteHistory: JSON.stringify(inviteHistory), userTasks: JSON.stringify(userTask)};
    }
})