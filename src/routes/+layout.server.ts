import { prisma } from '$lib/prisma.js';

//This will be called when layout load.
//And get user data for user.
export const load = (async ({ cookies }) => {
    let hashValue = cookies.get("hash");
    if (hashValue) {
        //This query wil get user detail information using users, level, improvecard, card table in database.
        const result : any = await prisma.$queryRawUnsafe(`SELECT users.*, level.useful_energy, level.title, level.boost_coin AS level_boost_coin, level.per_tap, level.target_count, level.default_add_energy, newcard.sumsquirrel, newcard.sumenergy, newcard.sumboost FROM users INNER JOIN level ON users.level_id = level.id AND users.telegram_id = '${hashValue}' LEFT JOIN (SELECT improvecard.user_id, SUM(card.squirrel_coin_amount + card.add_squirrel * (improvecard.level - 1)) AS sumsquirrel, SUM(card.energy_amount + card.add_energy * (improvecard.level - 1)) AS sumenergy, SUM(card.boost_coin_amount + card.add_boost * (improvecard.level - 1)) AS sumboost FROM improvecard INNER JOIN card ON improvecard.card_id = card.id GROUP BY improvecard.user_id) AS newcard ON users.id = newcard.user_id;`);
        if (result) {
            return {auth: true, userInfo: JSON.stringify(result[0])};
        }
        else return {auth: false}
    }
    return {auth: false, userLevel: JSON.stringify({status: "error"})};
});