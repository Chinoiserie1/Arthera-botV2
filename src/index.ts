import { bot } from "./bot";

setInterval(async () => {
  await bot();
}, 10000);
