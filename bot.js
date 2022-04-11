const VkBot = require('node-vk-bot-api');
const token = "81a9c491096977dd53d192c2315133e99f13cc471e2a0cb445ec999b6e4ab191a16733aba3947b40c6d9a"
const bot = new VkBot(token)
const Markup = require('node-vk-bot-api/lib/markup');
const keyWords = ["раз","два","три"]

const helloWorld = "👋 Привет! Рада знакомству Я - Наталия Закхайм💵 Вот уже много лет я долларовый миллионер, инвестор, счастливая женщина и эксперт в сфере личных финансов.Почти за 21 год в браке у нас с мужем Андреем родилось трое детей. Наши активы включают в себя 80 объектов недвижимости в 4-х странах. Однако, так было не всегда.В 19 лет из СССР переехала на Запад. Сделала головокружительную карьеру, но сказочная жизнь, как у Золушки, превратилась в тыкву.📉 Карьера с рождением детей закончилась. Муж – такой же мигрант. Мы погружались в долговую яму. Счёт на кредитных картах был минус 40'000€.📚 Когда узнала об активах и роли недвижимости, мы нашли путь к финансовой свободе.Кризис, который происходит сейчас - далеко не первый в моей жизни. Я прошла уже 6 кризисов. В свой первый кризис 2001 года я всё сделала неправильно и пострадала, но решила наблюдать.Из пяти следующих кризисов сделала уже правильные выводы, и выходя из них - наращивала капитал."
const hellowWorld2 = "Хотите получить бесплатный чек лист 7 вопросов себе для создания капитала или узнать подробнее о курсе Финансовый тетрис Кликните на подходящую кнопку ниже:"
const book  = "Чек лист 7 вопросов себе для создания капиталпоможет вам научиться:- создавать капитал 💰;- получать доход от капитала;- грамотно управлять им;- и защищать капитал.Чтобы его получить, кликните на кнопку ниже 👇"
const tenSec = 20 * 1000;


function greeting(){
bot.command(keyWords, (ctx) => {
  ctx.reply(hellowWorld2, null, Markup
    .keyboard([
      'Получить чек-лист',
      'Узнать о курсе',
    ])
  );
  
})
}
function getCheckList(){
bot.command("Получить чек-лист", (ctx) => {
  ctx.reply(book, null, Markup
    .keyboard([
      Markup.button({
        action: {
          type: 'open_link',
          link:  'https://drive.google.com/file/d/1UbQDHiwee8A2s94zO-61SEtYZdg50iYz/view',
          label: 'Забрать пособие',
          payload:JSON.stringify({
            url: 'https://drive.google.com/file/d/1UbQDHiwee8A2s94zO-61SEtYZdg50iYz/view',
          }),
        },
      })])
      
)})
           
}


function question(){
  bot.on((ctx) => {
    ctx.reply("Ну как? Вы уже изучили чек-лист?", null, Markup
      .keyboard([
        'Да',
        'Нет',
      ])
    );

  })
  }




greeting();
getCheckList();
question();




bot.startPolling((err) => {
  if (err) {
    console.error(err);
  }
});


/*
setInterval(() => {
  getCheckList();
},tenSec)
  
*/
/*
  ctx.reply(helloWorld, null, Markup
    .keyboard([
      Markup.button("Забрать пособие")
       ctx.reply(hellowWorld2, null, Markup
    .keyboard([
      Markup.button({
        action: {
          type: 'open_link',
          link:  'https://drive.google.com/file/d/1UbQDHiwee8A2s94zO-61SEtYZdg50iYz/view',
          label: 'Забрать пособие',
        payload: JSON.stringify({
          url: 'https://drive.google.com/file/d/1UbQDHiwee8A2s94zO-61SEtYZdg50iYz/view',
        }),
        },
      })
      ctx.reply("Hiiii")
    ]));
    ]));

    */