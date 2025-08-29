import { BotError, GrammyError, HttpError } from "grammy";
import { MyContext } from "../types";

async function errorHandler(err: BotError<MyContext>): Promise<void> {
  const ctx: MyContext = err.ctx;
  console.error(`> Error: ${err.error}`);

  await ctx.reply(ctx.t("error.unknown"));
}

export { errorHandler };
