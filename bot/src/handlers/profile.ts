import { profilesListMenu } from "@/menus/profileMenu";
import { MyContext } from "@/types";
import { Composer } from "grammy";

export const profilesComposer = new Composer<MyContext>();
const profiles = profilesComposer.chatType("private");

profiles.use(profilesListMenu);
profiles.command(["profiles", "profile"], async (ctx) => {
  await ctx.reply(ctx.t("PROFILE_LIST"), { reply_markup: profilesListMenu });
});
