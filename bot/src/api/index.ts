import express from "express";
import { rateLimit } from "express-rate-limit";
import { prismaClient as prisma } from "@/middlewares/prisma";
var cors = require("cors");

export const app = express();

app.use(cors());
app.set('trust proxy', '172.19.0.0/16');

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 50, 
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56,
});

app.use(rateLimiter);
app.get("/", async (req, res) => {
  res.json("bioify api");
});

app.get("/profile/:id", async (req, res) => {
  const { id } = req.params;
  const profile = await prisma.profile.findFirst({
    where: {
      id: parseInt(id),
    },
    include: {
      items: {
        orderBy: {
          position: "asc",
        },
        include: {
          header: true,
          link: true,
          text: true,
        },
      },
    },
  });
  if (!profile) return res.status(404).send({ error: "Profile not found" });

  return res.json({
    id: profile.id,
    ownerId: Number(profile.ownerId),
    title: profile.title,
    items: profile.items.map((item) => ({
      id: item.id,
      position: item.position,
      header: item.header,
      link: item.link,
      text: item.text,
    })),
  });
});
