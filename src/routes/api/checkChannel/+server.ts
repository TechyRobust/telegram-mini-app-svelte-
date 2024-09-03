import type { RequestHandler } from './$types';
import { json } from "@sveltejs/kit";
import { BOT_TOKEN } from '$env/static/private';

//In here, will check user join squirrel game channel.
export const POST: RequestHandler = async ({ request, cookies }) => {
    //Get data from request.
    const reqParam = await request.json();
    try {
        //Get joining state in channel...
        const result = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getChatMember?chat_id=@squirrel_game_channel&user_id=${reqParam.chatId}`);
        const jsonResult = await result.json();
        //Check joining state and return state.
        if (jsonResult.ok == true && jsonResult.result.status != "left") {
            return json({ status: true });
        }
        else {
            return json({ status: false });
        }
    }
    catch {
        return json({ status: false });
    }
}