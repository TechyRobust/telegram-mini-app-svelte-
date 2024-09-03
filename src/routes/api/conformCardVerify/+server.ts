import { prisma } from "$lib/prisma";
import type { RequestHandler } from './$types';
import { json } from "@sveltejs/kit";

//In here, will get conform card for withdraw verify.
export const POST: RequestHandler = async ({ request, cookies }) => {
    //Get data from request.
    const reqParam = await request.json();
    //Get hash telegram id from cookie.
    const hasValue = cookies.get("hash");
    //Using hash telegram id, get user information.
    const findUser = await prisma.users.findUnique({
        where: {
            telegram_id: hasValue
        }
    });
    //Get withdraw card information from conform_withdraw_info table using user id, card id.
    const findWithdrawInfo = await prisma.conform_withdraw_info.findFirst({
        where: {
            user_id: findUser?.id,
            withdraw_card_id: reqParam.cardId
        }
    })
    //If card have already verified, return false.
    if (findWithdrawInfo) return json({ status: false, content: "This card have already verified" });
    //If user's squirrel coin is not enough, return false.
    if (parseInt(findUser?.squirrel_coin) < 250) return json({ status: false, content: "Squirrel coin not enough" });
    //Replace space with empty string.
    let cardNumber = reqParam.cardNumber.replace(/\s/g, "");
    //Create new conform card information.
    const newInfo = {
        info_state: 1,
        user_id: findUser?.id,
        withdraw_card_id: reqParam.cardId,
        withdraw_card_number: cardNumber,
        withdraw_card_owner: reqParam.cardOwner,
    }
    //Set squirrel coin amount....
    const userSquirrel = parseInt(findUser?.squirrel_coin) - 250;
    //Update user's squirrel coin.
    await prisma.users.update({
        where: {
            id: findUser?.id
        },
        data: {
            squirrel_coin: userSquirrel
        }
    })

    //Create new conform card information in conform_withdraw_info table.
    await prisma.conform_withdraw_info.create({
        data: newInfo
    })

    //Return true.
    return json({ status: true, content: "Success" });
}