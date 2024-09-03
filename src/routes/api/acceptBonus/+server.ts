import { prisma } from "$lib/prisma";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from './$types';

//In here, user squirrel coin value will change.
export const POST: RequestHandler = async ({ request, cookies }) => {
    const reqParam = await request.json();
    const hashValue = cookies.get("hash");
    //Find user
    const findUser = await prisma.users.findUnique({
        where: {
            telegram_id: hashValue
        }
    })

    //Find task
    const findTask = await prisma.task.findMany({
        where: {
            id: reqParam.id
        }
    })

    //Find task history
    let findHistory = await prisma.task_history.findFirst({
        where: {
            task_id: findTask[0].id,
            task_user_id: findUser?.id
        }
    })
    //Check bonus type and do each type.
    if (reqParam.type == 1) {
        if (findHistory) {
            return json({ status: false, content: "You don't join" });
        }
        else {
            findHistory = await prisma.task_history.create({
                data: {
                    task_user_id: findUser?.id,
                    task_id: findTask[0].id,
                    task_state: 2,
                    task_progress: 0,
                }
            })
        }
    }
    else if (!findHistory || findHistory.task_state != 2) return json({ status: false, content: "Your level is not enough!" });
    if (reqParam.type == 8 && findTask[0].task_target_id > findHistory.task_progress) {
        return json({status: false, content: "Your level is not enough"});
    }
    else if (reqParam.type == 5 && findTask[0].task_target > findHistory.task_progress) {
        return json({status:false, content: "This card level is not enough"});
    }
    // else if (reqParam.type == 1) {
    //     if (findHistory) {
    //         return json({ status: false, content: "You don't not join" });
    //     }
    //     else {
    //         return json({ status: true, content: "Success" });
    //     }
    // }
    // else {
    //     // return json({status: false, content: "Developing"});
    // }

    //Get squirrel coin amount.
    const sumSquirrel = parseInt(findUser?.squirrel_coin) + parseInt(findTask[0].task_complete_bonus);
    await prisma.users.update({
        where: {
            id: findUser?.id
        }, 
        data: {
            squirrel_coin: sumSquirrel
        }
    })
    await prisma.task_history.update({
        where: {
            id: findHistory.id
        },
        data: {
            task_state: 3
        }
    })

    //Find user task datas from database using some table.
    const userTask = await prisma.$queryRawUnsafe(`SELECT task.*, task_history.task_state, task_history.task_progress, card.card_avatar, level.squirrel_url FROM task LEFT JOIN task_history ON task_history.task_id = task.id AND task_history.task_user_id = ${findUser?.id} LEFT JOIN level ON task.task_type = 8 AND level.id = task.task_target_id LEFT JOIN card ON task.task_type = 5 AND task.task_target_id = card.id;`);
    return json({status: true, content: "Accepted your bonus!!!", newTask: JSON.stringify(userTask)});

}