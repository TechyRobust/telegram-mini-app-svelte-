import { prisma } from "$lib/prisma";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from './$types';

//In here, user squirrel coin value will change.
export const POST: RequestHandler = async ({ request, cookies }) => {
    //Get hash telegram id from cookie.
    const hashValue = cookies.get("hash");
    //Check if hash is exist. If not, return relogin message.
    if (!hashValue) return json({ status: false, content: "Relogin" });
    //Find user using hash telegram id.
    const findUser = await prisma.users.findFirst({
        where: {
            telegram_id: hashValue
        }
    })
    //Find task type is 2.
    const findTask = await prisma.task.findFirst({
        where: {
            task_type: 2
        }
    })

    //Find task history using task id and user id.
    const findTaskHistory = await prisma.task_history.findFirst({
        where: {
            task_id: findTask?.id,
            task_user_id: findUser?.id
        }
    })

    //If task history is exist and state is not 0 (not completed), calculate bonus squirrel coin.
    if (findTaskHistory && findTaskHistory.task_state != 0) {
        let len = findTaskHistory.task_progress;
        let count = 1;
        while(true) {
            if (len - 5 * count < 0) break;
            len -= 5 * count;
            count ++;
        }
        let sumSquirrel = 0;
        const competeInvite = findTaskHistory.task_state;
        for (let i = 0; i < competeInvite; i ++) {
            sumSquirrel = sumSquirrel + 50 * (count - i - 1);
        }
        //return squirrel coin amount.
        return json({status: true, sumSquirrel: sumSquirrel});
    }
    else {
        return json({status: false})
    }
}