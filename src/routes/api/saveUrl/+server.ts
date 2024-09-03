import type { RequestHandler } from './$types';
import { json } from "@sveltejs/kit";
import { prisma } from '$lib/prisma';

//Using this, will save current page url
export const POST: RequestHandler = async ({ request, cookies }) => {
    //Get hash telegram id from cookie.
    const hashValue = cookies.get("hash");
    //Get current url.
    const url = cookies.get("url");
    //Update user url.
    await prisma.users.update({
        where: {
            telegram_id: hashValue
        },
        data: {
            url: url
        }
    })
    //Return success message.
    return json({ status: true });
}