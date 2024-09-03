import { prisma } from "$lib/prisma";
import type { RequestHandler } from './$types';
import { json } from "@sveltejs/kit";

//In here, will conform id verify
export const POST: RequestHandler = async ({ request, cookies }) => {
    //Get data from request. 
    const reqParam = await request.json();
    //Get hash telegram id from cookie. 
    const hashValue = await cookies.get("hash");
    //Find user by telegram id in database.
    const findUser = await prisma.users.findUnique({
        where: {
            telegram_id: hashValue
        }
    })

    //Find id verify data with user id.
    const findIdVerify = await prisma.user_verify.findFirst({
        where: {
            user_id: findUser?.id,
        }
    })
    //If user has already verified, return false.
    if (findIdVerify) return json({ status: false, content: "You have alread verified" });
    //If squirrel coin is less than 250, return false.
    if (parseInt(findUser?.squirrel_coin) < 250) return json({ status: false, content: "Squirrel coin not enough" });
    //Get current time
    let now: any = new Date();
    now = now.getTime();
    //Create data for user_verify table.
    const verifyData = {
        user_id: findUser?.id,
        user_name: reqParam.name,
        user_surname: reqParam.surname,
        user_birthday: reqParam.birthday,
        user_city: reqParam.city,
        user_verify_state: 1,
        user_verify_date: `${now}`
    }
    //Get user's squirrel coin amount after id verify.
    const userSquirrel = parseInt(findUser?.squirrel_coin) - 250;
    //Update user's squirrel coin amount.
    await prisma.users.update({
        where: {
            id: findUser?.id
        },
        data: {
            squirrel_coin: userSquirrel
        }
    })
    //Create new id verify data in user_verify table. 
    const newVerify = await prisma.user_verify.create({
        data: verifyData
    })
    //Return true and new verify data.
    return json({ status: true, newVerify: JSON.stringify(newVerify)  });
}  