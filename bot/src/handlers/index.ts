import { Bot } from "grammy";
import { startComposer } from "./start";
import { MyApi, MyContext } from "@/types";
import { profilesComposer } from "./profile";
import { errorHandler } from "./error";
import { itemsComposer } from "./items";

export const setupHandlers = (bot: Bot<MyContext, MyApi>) => {
  bot.use(startComposer);
  bot.use(profilesComposer);
  bot.use(itemsComposer);

  bot.catch(errorHandler);
};
