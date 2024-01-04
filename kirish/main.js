const TelegramBot = require("node-telegram-bot-api");
const token = "6495887810:AAFvcusUk4tYPLUev5kxpWT7vj1OXOxZ1lU";
const bot = new TelegramBot(token, { polling: true });
const { gameOption, againOptions } = require("./options");
let obj = {};

const gameFunction = (chatId) => {
  bot.sendMessage(chatId, "Komputer 1 dan 10 gacha son o'yladi");
  const randomNumber = Math.floor(Math.random() * 9 + 1);
  obj[chatId] = randomNumber;
  return bot.sendMessage(chatId, "O'sha Sonni Toping", gameOption);
};

function bootstrap() {
  bot.setMyCommands([
    {
      command: "/start",
      description: "Bot Haqida Ma'lumot",
    },
    {
      command: "/info",
      description: "O'zingiz Haqida Ma'lumot",
    },
    {
      command: "/game",
      description: "O'yinlar",
    },
  ]);
  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    let text = msg.text;
    if (text == "/start") {
      await bot.sendMessage(
        chatId,
        `Assalomu alaykum xurmatli ${msg.from?.first_name}`
      );
      await bot.sendSticker(
        chatId,
        "https://sammi.ac/_next/image?url=https%3A%2F%2Futfs.io%2Ff%2Fa8573b7c-95b2-4459-8414-8eacde874b0a-kilwdl.png&w=1920&q=75"
      );
    }

    if (text == "/info") {
      return bot.sendMessage(
        chatId,
        `Sizning uername ${msg.from?.username}, familiyangiz ${msg.from?.first_name}`
      );
    }

    if (text == "/game") {
      return gameFunction(chatId);
    }

    bot.sendMessage(chatId, "Uzur Men Siznig Gapingizga tushunmayapman!");
  });

  bot.on("callback_query", (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if (data == "/again") {
      return gameFunction(chatId);
    }
    if (data == obj[chatId]) {
      return bot.sendMessage(
        chatId,
        `Yutdingiz, Komputer shu sonni o'ylagan edi ${obj[chatId]}`
      );
    } else {
      bot.sendMessage(
        chatId,
        `Yutquzdingiz, Bu Javob Xato ${data}, Komputer shu sonni o'ylagan edi ${obj[chatId]}`,
        againOptions
      );
    }
    bot.sendMessage(chatId, `Siz tanlagan Son ${data}`);
  });
}

bootstrap();
