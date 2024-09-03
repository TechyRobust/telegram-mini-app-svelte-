import { prisma } from '$lib/prisma.js';

//This will be called when wallet page load.
//And get withdraw card information from database.
export const load = (async ({ cookies }) => {
    //Get has telegram id from cookie.
    const hashValue = cookies.get("hash");
    console.log(hashValue);
    //Using hash telegram id, get user information.
    const findUser = await prisma.users.findUnique({
        where: {
            telegram_id: hashValue
        }
    })
    //Using user id, get the card verified by user.
    const findUserVerify = await prisma.user_verify.findFirst({
        where: {
            user_id: findUser?.id
        }
    })
    //Get conform withdraw information from database using user id.
    const findConformWithdraw = await prisma.conform_withdraw_info.findMany({
        where: {
            user_id: findUser?.id
        }
    })
    //Get all withdraw card information from database.  //This is for check if card is conform or not.
    let allWithdraw = await prisma.withdraw_card.findMany();
    //Check if all withdraw card is conform or not. If not, set isConform to false.
    if (findConformWithdraw.length == 0) {
        allWithdraw.forEach((ele) => {
            ele.isConform = false;
        })
    }
    else {
        allWithdraw.forEach((ele) => {
            let isConform = false;
            findConformWithdraw.forEach((withdraw) => {
                if (withdraw.withdraw_card_id == ele.id) {
                    isConform = true;
                }
            })
            ele.isConform = isConform;
        })        
    }
    let isUserVerify = false;
    if (findUserVerify) {
        isUserVerify = true;
    }
    //Return withdraw card infromation to wallet page.
    return { isUserVerify: isUserVerify, withDrawCards: JSON.stringify(allWithdraw) };
})