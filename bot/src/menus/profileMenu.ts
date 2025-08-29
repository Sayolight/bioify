import { MyContext } from "@/types";
import { Menu, MenuRange } from "@grammyjs/menu";

export const profilesListMenu = new Menu<MyContext>("profilesListMenu")
  .dynamic(async (ctx) => {
    const profiles = await ctx.db.profile.findMany({
      where: { owner: { id: ctx.from!.id } },
    });

    const range = new MenuRange<MyContext>();

    profiles.forEach((profile) => {
      range
        .text(profile.title, async (ctx) => {
          await handleProfileSelection(ctx, profile);
        })
        .row();
    });

    return range;
  })
  .text("Create a new profile", async (ctx) => {
    await ctx.conversation.enter("profileCreateConversation");
  });

async function handleProfileSelection(ctx: MyContext, profile: any) {
  ctx.session.currentProfileId = profile.id;
  const items = await ctx.db.item.findMany({
    where: { profileId: profile.id },
    include: { header: true, link: true, text: true },
    orderBy: { position: "asc" },
  });

  const text = items.map((item) => formatItem(item)).join("\n");

  await ctx.reply(
    ctx.t("PROFILE_ITEMS", {
      profile: profile.title,
      items: text,
      webapp: "https://t.me/bioify_bot/bio?startapp=profile" + profile.id,
    }),
    { link_preview_options: { is_disabled: true } }
  );
}

function formatItem(item: any): string {
  if (item.header) {
    return `💡 [${item.id}] ${item.header.value}`;
  } else if (item.text) {
    return `📝 [${item.id}] ${item.text.value}`;
  } else if (item.link) {
    return `🔗 [${item.id}] ${item.link.value} - ${item.link.label}`;
  }
  return "";
}
