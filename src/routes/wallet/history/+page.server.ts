import { prisma } from '$lib/prisma.js';

//This will be called when transaction history page load.
//And get transaction histories for history page.
export const load = (async ({ cookies }) => {
    //Get hash telegra id from cookie.
    const hasValue = cookies.get("hash");
    //Using hash telegram id, get user information.
    const findUser = await prisma.users.findUnique({
        where: {
            telegram_id: hasValue
        }
    })
    //Using user id, get transaction histories.
    const findTransactionHistory = await prisma.$queryRawUnsafe(`SELECT transaction_history.*, withdraw_card.svg_type, withdraw_card.type, withdraw_card.name, withdraw_card.image_url FROM transaction_history LEFT JOIN withdraw_card ON transaction_history.user_id = ${findUser?.id} AND withdraw_card.id = transaction_history.card_id;`);
    //Return transaction histories to transaction history page.
    return { transactionHistory: JSON.stringify(findTransactionHistory) };
})