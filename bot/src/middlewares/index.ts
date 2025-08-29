import { MyContext, MyApi } from "@/types";
import { Bot } from "grammy";
import { i18n } from "./i18n";
import { prisma } from "./prisma";
import { session } from "./session";
import { conversations, createConversation } from "@grammyjs/conversations";
import { profileCreateConversation } from "@/conversations/profileCreate";

export const setupMiddlewares = (bot: Bot<MyContext, MyApi>) => {
  bot.use(i18n);
  bot.use(prisma);
  bot.use(session);

  bot.use(conversations());
  bot.use(createConversation(profileCreateConversation))
};
