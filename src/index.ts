import { runBotWithRetry } from "./bot";
import random from "./random";

// setInterval(async () => {
//   await runBotWithRetry();
// }, 20000);

(function loop() {
  var rand = random(5000, 120000);
  setTimeout(async function () {
    await runBotWithRetry();
    loop();
  }, rand);
})();
