import { prisma } from "$lib/prisma";
import type { RequestHandler } from './$types';
import { json } from "@sveltejs/kit";

//In here, will change invite bonus amount.
export const POST: RequestHandler = async ({ request, cookies }) => {
    //Get data from request.
    const reqParam = await request.json();
    //Get hash telegram id from request.
    const hashValue = reqParam.tid;
    if (hashValue) {
        //Find user using hash telegram id.
        const findUser : any = await prisma.users.findUnique({
            where: {
                telegram_id: hashValue
            }
        })
        //If user is exist .....
        if (findUser) {
            //Find all invite history using user id.
            const historyResult = await prisma.invite_history.findMany({
                where: {
                    invited_user_id: findUser.id
                }
            })
            //Get new bonus amount by dividing squirrel coin by 100.
            const newBonus = (findUser.squirrel_coin / 100).toFixed(0);
            //Update invite bonus and squirrel coin to all invite history.
            historyResult.forEach(async (ele) => {
                await prisma.invite_history.update({
                    where: {
                        id: ele.id
                    },
                    data: {
                        invite_bonus: newBonus
                    }
                })
                await prisma.users.update({
                    where: {
                        id: findUser.id
                    },
                    data: {
                        squirrel_coin: { increment: newBonus }
                    }
                })
            })
            //Return status true if update success.
            return json({status: true});
        }
        else {
            return json({status: false});
        }
    }
    else {
        return json({status: false, content: "You are fake"});
    }
}