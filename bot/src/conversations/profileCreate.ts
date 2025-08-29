import { prismaClient } from "@/middlewares/prisma";
import { MyContext } from "@/types";
import { Conversation } from "@grammyjs/conversations";

export async function profileCreateConversation(
  conversation: Conversation<MyContext>,
  ctx: MyContext
) {
  await ctx.reply(ctx.t("PROFILE_CREATE_NAME"));
  const profileName = await conversation.form.text();
  await prismaClient.profile.create({
    data: {
      title: profileName,
      owner: {
        connect: {
          id: ctx.from!.id,
        },
      },
    },
  });

  await ctx.reply(ctx.t("PROFILE_CREATE_SUCCESS"));
}
