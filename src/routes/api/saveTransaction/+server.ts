import type { RequestHandler } from './$types';
import { json } from "@sveltejs/kit";
import { prisma } from '$lib/prisma';

//Using this, will save transaction
export const POST: RequestHandler = async ({ request, cookies }) => {
    //Get data from request.
    const reqParam = await request.json();
    //Get hash value from cookies.
    const hashValue = cookies.get("hash");
    //Find user in database by hash value.
    const findUser = await prisma.users.findUnique({
        where: {
            telegram_id: hashValue
        }
    });
    //If user squirrel_coin is not enough, return false.
    if (parseInt(findUser?.squirrel_coin) < parseInt(reqParam.withdrawAmount)) return json({ status: false, content: "Недостаточно беличьей монеты" });
    let withdrawAmount = 0;
    //Check transaction type. If withdraw type is 1, check withdraw card info. If withdraw type is 2, check USDT cost.
    if (reqParam.transactionType == 1) {
        //Find withdraw card info in database.
        const findInfo = await prisma.conform_withdraw_info.findFirst({
            where: {
                withdraw_card_id: reqParam.cardId,
                user_id: findUser?.id
            }
        })
        //If withdraw card info not found, return false.
        if (!findInfo) return json({ status: false, content: "Информация о снятии средств не найдена" });
        //If withdraw card number not match, return false.
        let cardNumber = reqParam.cardNumber.replace(/\s/g, "");
        if (findInfo.withdraw_card_number != cardNumber && reqParam.transactionType == 2) return json({
            status: false, content: "Неправильная карта вывода средств"
        })
        //Get withdraw amount from request.
        withdrawAmount = reqParam.withdrawAmount;
    }
    else if (reqParam.transactionType == 2) {
        //Get withdraw amount from request.
        withdrawAmount = reqParam.usdtCost;
    }
    //Get current date and time.
    let date: any = new Date();
    date = date.getTime();
    //Replace space with empty.
    //Create new transaction history.
    let cardNumber = reqParam.cardNumber.replace(/\s/g, "");
    const newData = {
        user_id: findUser?.id,
        card_id: reqParam.cardId,
        card_number: cardNumber,
        withdraw_amount: `${withdrawAmount}`,
        withdraw_state: 1,
        withdraw_date: `${date}`
    }
    await prisma.transaction_history.create({
        data: newData
    })
    //Get squirrel coin after withdraw
    const userSquirrel = parseInt(findUser?.squirrel_coin) - parseInt(reqParam.withdrawAmount);
    //Update user squirrel coin in database.
    await prisma.users.update({
        where: {
            id: findUser?.id
        },
        data: {
            squirrel_coin: userSquirrel
        }
    })
    //Return true if withdraw success.
    return json({ status: true, content: "Вывод средств успешен" });
}