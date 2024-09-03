import { prisma } from "$lib/prisma";
import type { RequestHandler } from './$types';
import { json } from "@sveltejs/kit";

//In here, will get all card information.
export const POST: RequestHandler = async ({ request, cookies }) => {
    const cards = await prisma.level.findMany();
    return json({cards: JSON.stringify(cards)});
}  