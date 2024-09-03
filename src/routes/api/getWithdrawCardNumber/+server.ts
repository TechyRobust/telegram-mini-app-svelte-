import type { RequestHandler } from './$types';
import { json } from "@sveltejs/kit";
import { prisma } from '$lib/prisma';

//Using this, user can get withdrawal card number.
export const POST: RequestHandler = async ({ request, cookies }) => {
    //Get data from request.
    const reqParam = await request.json();
    //Get hash value from cookies.
    const hashValue = cookies.get("hash");
    //Find user in database.
    const findUser = await prisma.users.findUnique({
        where: {
            telegram_id: hashValue
        }
    });
    //Find withdrawal information in database.
    const findWithdraw = await prisma.conform_withdraw_info.findFirst({
        where: {
            user_id: findUser?.id,
            withdraw_card_id: reqParam.cardId
        }
    })
    //If withdrawal information not found, return error message.
    if (!findWithdraw) return json({ status: false, content: "Withdrawal information not found" });
    return json({ status: true, content: "Withdrawal successful", cardNumber: findWithdraw.withdraw_card_number });    
}