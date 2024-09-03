import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import {BOT_TOKEN, SITE_URL} from '$env/static/private'
import { prisma } from "$lib/prisma";
import { AES } from 'crypto-es/lib/aes'
import {Base64} from 'crypto-es/lib/enc-base64'
import { Base, Utf8 } from "crypto-es/lib/core";

//At first, using this, user can login or register in this game.
export const POST: RequestHandler = async ({ request }) => {
    //Get data from request.
    const update = await request.json();
    //If update is enough....
    if (update.message && update.message.text) {
        //Get telegram message.
        const message = update.message.text;
        //Check if user start the game with "/start" command.
        let index = message.search("/start");
        //If not, return failed message.
        if (index == -1) {
            return json({status: "failed"});
        }
        //Get chat id from telegram.
        const chatId = update.message.chat.id;
        try {
            //Convert hash with charId
            let hash : any = AES.encrypt(`${chatId}`, "hashkey").toString();
	    console.log(hash)
            let str = Utf8.parse(hash);
	    console.log(str)
            hash = Base64.stringify(str);
            //Get user info from telegram.
            
            //get telegram user information.
            const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getChat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ chat_id: chatId })
            });
            const jsonResult = await response.json();
            if (!jsonResult.ok) {
                throw new Error('Failed to fetch user jsonResult from Telegram');
            }

            // get user avatar from telegram
            const avatar = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getUserProfilePhotos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_id: chatId,limit:1 })
            });
            const avatarResult  = await avatar.json();
            //Get avatar
            let avatarUrl = null;
            if(avatarResult.ok){
                if(avatarResult.result.photos.length > 0){
                    const fileId = avatarResult.result.photos[0][0].file_id;
                    const fileResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getFile`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ file_id: fileId })
                    });
                    const fileData = await fileResponse.json();
                    if (fileData.ok) {
                        avatarUrl = `https://api.telegram.org/file/bot${BOT_TOKEN}/${fileData.result.file_path}`;
                    }
                }
            }
            //Find user from database
            const user = await prisma.users.findFirst({
                where: {
                    chatId: `${chatId}`
                }
            })

            //Get current time.
            let date = new Date();
            if (avatarUrl == null) avatarUrl = "";
            let userCreate: any;
            if (!user) {
                //Create new user.
                const newUser = {
                    nick_name: jsonResult.result.first_name,
                    avatar_url: avatarUrl,
                    telegram_id: hash,
                    squirrel_coin: 0,
                    tron_coin: 0,
                    boost_coin: 0,
                    level_id: 1,
                    count: 0,
                    last_date: `${date.getTime()}`,
                    url: "/",
                    energy: 1000,
                    accept_bonus_last_date: `${date.getTime()}`,
                    chatId: `${chatId}`
                }
                //save new user in database.
                userCreate = await prisma.users.create({ data: newUser });
                for(let i = 0; i < 9; i ++) {
                    const newTask = {
                        task_user_id: userCreate.id,
                        task_id: 25 + i,
                        task_state: 1, 
                        task_progress: 1
                    }
                    await prisma.task_history.create({
                        data: newTask
                    })
                }
            }
            else {
                hash = user.telegram_id;
            }
            const ref = message.substr(index + 7, 3);
            //Convert hash with charId
            //If user was be signed by somebody
            if (ref == "ref" && (!user)) {
                //Get inviteId..
                let inviteId: any = message.substr(index + 10);
                //Find invite user.
                const inviteUser = await prisma.users.findMany({
                    where: {
                        chatId: inviteId,
                    }
                })
                //if invite user is not empty....
                if (!inviteUser) {
                    //Invite is failed.
                    await prisma.users.delete({
                        where: {
                            chatId: inviteId
                        }
                    })
                    return json({status: "failed"});
                }
                //else....
                //Get inviteBonus..
                const inviteSquirrelCoin = parseInt(inviteUser[0]?.squirrel_coin) +  parseInt(inviteUser[0]?.squirrel_coin) / 100;
                //Update invite user's squirrel coin.
                await prisma.users.update({
                    where: {
                        id: inviteUser[0]?.id
                    },
                    data: {
                        squirrel_coin : inviteSquirrelCoin.toFixed(0),
                    }
                })
                //Create new history with invite
                const inviteBonus = 0;
                const newHistory = {
                    user_id: inviteUser[0].id,
                    invited_user_id: userCreate.id,
                    invite_date: `${date.getTime()}`,
                    invite_bonus: `${inviteBonus}`
                }
                //Save new history in database.
                await prisma.invite_history.create({data: newHistory});
                const findTask = await prisma.task.findFirst({
                    where: {
                        task_type: 2
                    }
                })
                //Find task history with invite user.
                const findTaskHistory = await prisma.task_history.findFirst({
                    where: {
                        task_id: findTask?.id,
                        task_user_id: inviteUser[0].id
                    }
                })
                //If find task history with invite user is not empty....
                if (findTaskHistory) {
                    let len = findTaskHistory.task_progress + 1;
                    let count = 1;
                    while(true) {
                        if (len - 5 * count < 0) break;
                        len -= 5 * count;
                        count ++;
                    }
                    if (len == 0) {
                        len = findTaskHistory.task_state + 1;
                    }
                    else {
                        len = findTaskHistory.task_state;
                    }
                    count - findTaskHistory.task_progress + 1;
                    await prisma.task_history.update({
                        where: {
                            id: findTaskHistory.id
                        },
                        data: {
                            task_state: len,
                            task_progress: count
                        }
                    })
                }
                else {
                    const newTaskHistory = {
                        task_user_id: inviteUser[0].id,
                        task_id: findTask?.id,
                        task_state: 0,
                        task_progress: 1
                    }
                    await prisma.task_history.create({
                        data: newTaskHistory
                    })
                }
            }  
            // Send success message
            await sendTelegramMessage(chatId,hash);

            return json({ status: 'success' });
        } catch (error) {
            console.error('Error processing /start command:', error);
            // return json({ status: 'error', message: 'Internal server error' }, { status: 500 });
        }
    }
    return json({ status: 'failed' });
};

//This function will return url to Telegram.
async function sendTelegramMessage(chatId, hash) {
    let caption = `
🎁 Welcome to visit 🥰Squirrel Coin Game.

<a href='https://${SITE_URL.replace(/[";]/g, '')}/auth/?hash=${hash}'>https://${SITE_URL.replace(/[";]/g, '')}/auth/?hash=${hash}</a>
    `;

    let inlineKeyboard = JSON.stringify({
        inline_keyboard: [
            [
                {
                    text: '🌐 Visit Website',
                    url: `https://${SITE_URL.replace(/[";]/g, '')}/auth/?hash=${hash}`,
                    callback_data: ''
                }
            ],
            [
                {
                    text:'🚀 launch App',
                    web_app: {url: `https://${SITE_URL.replace(/[";]/g, '')}/auth/?hash=${hash}`}                   
                }
            ]
        ]
    });

    let query = {
        chat_id: chatId,
        photo: 'https://s3-alpha-sig.figma.com/img/5456/a6a2/52fdeaa1102981e3846362140e63a2f2?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CwWXJFticmC9JV8U7bYeh8Hh~FF2y4sl~u58bjqVeizExewHVlw6s1Eat6owQ3dQl6eNPuZdkKdhpLB7CILYNEjn-GYPixqdq17dj9jBsQOavQShoPFiJKzA6c41p6DCUQT9rLZ2mKb4u1MlutXP-Qh693mI3f8h6Up7FbVNQkfW9sbcKK5bXI~NYv91qld2-xqe7Q86RWMn8E5tuSpfWsYjywGNqtAZPtCNEZuSZEJPh4QWrVVRn3YXZi0dpO~dGFxN0NEEe-hZvKEabP4Q9UKXeiPjM-sWNN0VIxlnrm4NJStCo6RTFPEfeRbZBPpJnP5H~U0iGRb1H-VRj81pHQ__',
        caption: caption,
        parse_mode: 'HTML',
        reply_markup: inlineKeyboard
    };

    try {

        let send = await fetch(`https://api.telegram.org/bot${BOT_TOKEN.replace(/[";]/g, '')}/sendPhoto`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(query)
        });

        send = await send.json();
    } catch (error) {
        console.error('error:', error);
    }
}