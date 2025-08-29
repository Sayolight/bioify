import bot from "./bot";
import { parseMode } from "@grammyjs/parse-mode";
import { setupHandlers } from "./handlers";
import { setupMiddlewares } from "./middlewares";
import { app } from "./api";

bot.api.config.use(parseMode("HTML"));

setupMiddlewares(bot);
setupHandlers(bot);

bot.start();
app.listen(3000);
