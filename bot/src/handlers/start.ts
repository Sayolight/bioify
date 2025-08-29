import { MyContext } from "@/types";
import { Composer } from "grammy";

export const startComposer = new Composer<MyContext>();
const start = startComposer.chatType("private");

start.command(["start", "help"], async (ctx: MyContext) => {
  await ctx.db.user.upsert({
    create: {
      id: ctx.from!.id,
      firstName: ctx.from!.first_name,
      lastName: ctx.from!.last_name,
      username: ctx.from!.username,
      language: ctx.from!.language_code,
    },
    update: {
      firstName: ctx.from!.first_name,
      lastName: ctx.from!.last_name,
      username: ctx.from!.username,
      language: ctx.from!.language_code,
    },
    where: {
      id: ctx.from!.id,
    },
  });
  await ctx.reply(ctx.t("START", { name: ctx.from!.first_name }));
});
