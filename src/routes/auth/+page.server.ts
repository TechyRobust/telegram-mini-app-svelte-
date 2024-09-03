import { redirect } from '@sveltejs/kit';
import { prisma } from '$lib/prisma.js';

//Using this, user can go the page saved before.
export const load = (async ({ cookies, url }) => {
    //Get hash telegram id from cookie.
    const hash: any = url.searchParams.get('hash');
    //Using hash telegram id, get user information.
    const user = await prisma.users.findFirst({
        where: {
            telegram_id: `${hash}`
        }
    })
    //If user have already registed in game...
    if (user) {
        //Set cookie hash telegram id
        cookies.set("hash", hash, {
            path: '/',
            maxAge: 60 * 60 * 24 * 30, // 30 days
            httpOnly: false,
            sameSite: 'strict'
        });
        //Set currel url in cookie.
        cookies.set("url", user.url, {
            path: '/',
            maxAge: 60 * 60 * 24 * 30, // 30 days
            httpOnly: false,
            sameSite: 'strict'
        })
        //Go to page before saved.
        return redirect(303, user.url);
    }
    else {
        //If user not found...
        //go to 404 page.
        return redirect(301, '/404');
    }
});