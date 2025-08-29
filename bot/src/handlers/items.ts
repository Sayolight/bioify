import { MyContext } from "@/types";
import { Composer } from "grammy";

export const itemsComposer = new Composer<MyContext>();
const items = itemsComposer.chatType("private");

const getLastPosition = async (ctx: MyContext): Promise<number> => {
  const lastItem = await ctx.db.item.findFirst({
    where: { profileId: ctx.session.currentProfileId },
    orderBy: { position: "desc" },
  });
  return lastItem?.position || 0;
};

const createItem = async (
  ctx: MyContext,
  type: "header" | "text" | "link",
  value: string,
  label?: string
) => {
  const position = (await getLastPosition(ctx)) + 1;
  const data: any = {
    profile: { connect: { id: ctx.session.currentProfileId } },
    position,
  };

  switch (type) {
    case "header":
      data.header = { create: { value } };
      break;
    case "text":
      data.text = { create: { value } };
      break;
    case "link":
      data.link = { create: { value, label } };
      break;
  }

  await ctx.db.item.create({ data });
  await ctx.reply(ctx.t("ITEM_CREATE_SUCCESS", { type }));
};

const deleteItem = async (ctx: MyContext, itemId: number) => {
  await ctx.db.item.delete({
    where: { id: itemId },
  });
  await ctx.reply(ctx.t("ITEM_DELETE_SUCCESS", { itemId }));
};

const swapItems = async (
  ctx: MyContext,
  firstItemId: number,
  secondItemId: number
) => {
  const [firstItem, secondItem] = await Promise.all([
    ctx.db.item.findFirst({
      where: { id: firstItemId, profile: { ownerId: ctx.from!.id } },
    }),
    ctx.db.item.findFirst({
      where: { id: secondItemId, profile: { ownerId: ctx.from!.id } },
    }),
  ]);

  if (!firstItem || !secondItem) {
    await ctx.reply(ctx.t("SWAP_ERROR"));
    return;
  }

  await Promise.all([
    ctx.db.item.update({
      where: { id: firstItemId },
      data: { position: secondItem.position },
    }),
    ctx.db.item.update({
      where: { id: secondItemId },
      data: { position: firstItem.position },
    }),
  ]);

  await ctx.reply(
    ctx.t("SWAP_SUCCESS", {
      firstItemId,
      secondItemId,
    })
  );
};

items.command(["header"], async (ctx: MyContext) => {
  const value = ctx.match?.toString();
  if (!value) {
    await ctx.reply(ctx.t("HEADER_ERROR"));
    return;
  }
  await createItem(ctx, "header", value);
});

items.command(["text"], async (ctx: MyContext) => {
  const value = ctx.match?.toString();
  if (!value) {
    await ctx.reply(ctx.t("TEXT_ERROR"));
    return;
  }
  await createItem(ctx, "text", value);
});

items.command(["link"], async (ctx: MyContext) => {
  const args = ctx.match?.split(" ");
  if (!args || args.length < 2) {
    await ctx.reply(ctx.t("LINK_ERROR"));
    return;
  }

  const [link, ...labelParts] = args;
  const label = labelParts.join(" ");
  await createItem(ctx, "link", link, label);
});

items.command(["rm"], async (ctx: MyContext) => {
  const value = parseInt(ctx.match?.toString() || "");
  if (isNaN(value)) {
    await ctx.reply(ctx.t("RM_ERROR"));
    return;
  }
  await deleteItem(ctx, value);
});

items.command(["mv"], async (ctx: MyContext) => {
  const args = ctx.match?.split(" ");
  if (!args || args.length < 2) {
    await ctx.reply(ctx.t("MV_ERROR"));
    return;
  }

  const [firstItemId, secondItemId] = args.map((id) => parseInt(id));
  if (isNaN(firstItemId) || isNaN(secondItemId)) {
    await ctx.reply(ctx.t("MV_NAN_ERROR"));
    return;
  }

  await swapItems(ctx, firstItemId, secondItemId);
});
