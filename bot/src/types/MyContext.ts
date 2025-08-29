import { Context, SessionFlavor } from "grammy";
import { I18nFlavor } from "@grammyjs/i18n";
import { prismaClient } from "@/middlewares/prisma";
import { MenuFlavor } from "@grammyjs/menu";
import { ConversationFlavor } from "@grammyjs/conversations";

interface PrismaFlavor {
  db: typeof prismaClient;
}

interface S {
  currentProfileId: number;
}

export type MyContext = I18nFlavor &
  PrismaFlavor &
  MenuFlavor &
  ConversationFlavor &
  SessionFlavor<S> &
  Context;
