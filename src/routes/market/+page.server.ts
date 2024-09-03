import { prisma } from '$lib/prisma.js';

// This function is called when page is loaded.
//In here, you can get the card information from database for market page.
export const load = (async ({ cookies }) => {
    //Get hash value from cookie.
    let hashValue = cookies.get("hash");
    //using cookie value, get user information.
    const user = await prisma.users.findUnique({
        where: {
            telegram_id: hashValue
        }
    })

    //Using user information, you will get card information.
    const result = await prisma.$queryRawUnsafe(`SELECT card.*, MAX(improvecardtable.level) + 1 AS maxLevel, card.squirrel_coin_amount + card.add_squirrel * (MAX(improvecardtable.level)) AS sumsquirrel, card.boost_coin_amount + card.add_boost * (MAX(improvecardtable.level)) AS sumbooster, card.energy_amount + card.add_energy * (MAX(improvecardtable.level)) AS sumenergy, card.cost + card.add_cost * MAX(improvecardtable.level) AS sumcost FROM card LEFT JOIN (SELECT * FROM improvecard WHERE improvecard.user_id = ${user?.id} ORDER BY improvecard.id DESC) AS improvecardtable ON card.id = improvecardtable.card_id GROUP BY card.id;`);
        return {userCards: JSON.stringify(result, (key, value) => {
        if (typeof value === 'bigint') {
            return value.toString()
        }
        return value})};
    }    
);