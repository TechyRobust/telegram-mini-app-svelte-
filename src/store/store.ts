import { writable } from "svelte/store";

export const IsMobile = writable(false);

export const IsStart = writable(false);
export const IsFooterLoad = writable(false);

export const IsLoading = writable(true);
export const IsHeader = writable(false);
export const IsFooter = writable(false);
export const HeaderState = writable(1);
export const InviteHistory = writable("")
export const Squirrel_Cost = writable("");
export const SquirrelAvatar = writable([
    {url: "/squirrel/1.png"},
    {url: "/squirrel/2.png"},
    {url: "/squirrel/3.png"},
    {url: "/squirrel/4.png"},
    {url: "/squirrel/5.png"},
    {url: "/squirrel/6.png"},
    {url: "/squirrel/7.png"},
    {url: "/squirrel/8.png"},
    {url: "/squirrel/9.png"},
    {url: "/squirrel/10.png"},
  ]);

export const IsAnimate = writable(false);
export const IsLevelUp = writable(false);
export const LevelUpImg = writable("");


export const WithdrawInfo = writable("");