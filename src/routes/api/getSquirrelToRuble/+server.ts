import { SQUIRREL_COIN_COST } from '$env/static/private';
import type { RequestHandler } from "./$types";
import { json } from "@sveltejs/kit";

//This will be called when user want to get squirrel coin cost.
export const GET: RequestHandler = async ({ request }) => {
    return json({ status: true, cost: SQUIRREL_COIN_COST });
}