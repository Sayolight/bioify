import { MyContext } from "@/types";
import { PrismaClient } from "@prisma/client";
import { NextFunction } from "grammy";

export const prismaClient = new PrismaClient();
export const prisma = (ctx: MyContext, next: NextFunction) => {
  ctx.db = prismaClient;
  return next();
};
