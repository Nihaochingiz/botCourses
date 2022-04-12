const VkBot = require('node-vk-bot-api');
const token = "81a9c491096977dd53d192c2315133e99f13cc471e2a0cb445ec999b6e4ab191a16733aba3947b40c6d9a"
const bot = new VkBot(token)
const Markup = require('node-vk-bot-api/lib/markup');
const keyWords = ["раз","два","три"]

const helloWorld = "Хотите получить бесплатный чек лист 7 вопросов себе для создания капитала или узнать подробнее о курсе Финансовый тетрис Кликните на подходящую кнопку ниже:"
const book  = "Чек лист 7 вопросов себе для создания капиталпоможет вам научиться:- создавать капитал 💰;- получать доход от капитала;- грамотно управлять им;- и защищать капитал.Чтобы его получить, кликните на кнопку ниже 👇"
const message = "Наверняка после прочтения у вас в мыслях уже начинает потихоньку зарождаться личный инвестиционный план.Чтобы выстроить свою правильную финансовую модель и обеспечить комфортную жизнь себе и своим потомкам, нужно погрузиться в эту тему с головой. 👨‍💻📝Об этом максимально подробно и попунктам мы рассказываем на курсеФинансовый тетрис- находим дополнительные источники дохода;- выбираем стратегии финансового роста;- создаём систему планомерных накоплений- выстраиваем щит от потерь.Хотите получить бесплатнуюконсультацию от эксперта?"
const refuseMessage = "Хорошо, нажмите кнопку ниже, кактолько прочитаете его 👇Я дам вам еще немного информации в дополнение к нему."
let userId;



function greeting(){
bot.command(keyWords, (ctx) => {

     userId = ctx.message.from_id || ctx.message.user_id;
     console.log(userId)

  ctx.reply(helloWorld , null, Markup
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
setTimeout(question,20000);         
}

function question(){
    bot.sendMessage(userId,"Ну как? Вы уже изучили чек-лист?", null, Markup
      .keyboard([
        'Да',
        'Нет',
      ])
    );
  }

  
/*
function sendMessage() {
    bot.command("Да", (ctx) => {
      ctx.reply(message , null, Markup
        .keyboard([
          'Да',
          'Нет',
        ])
      );
      
    })
    
    
}

*/

function sendMessage(userAnswer) {
  if (userAnswer === "Нет") {
  bot.command(userAnswer, (ctx) => {
    ctx.reply(refuseMessage , null, Markup
      .keyboard([
       'Да, я прочитал'
      ])
    );
    
  } 
  )}
  if (userAnswer === "Да") {
    bot.command(userAnswer, (ctx) => {
      ctx.reply(message , null, Markup
        .keyboard([
          'Да',
          'Нет',
        ])
      );
      
    })
    
  }
  
}

greeting();
getCheckList();
sendMessage("Да");
sendMessage("Нет");






bot.startPolling((err) => {
  if (err) {
    console.error(err);
  }
});


/*
setInterval(() => {
  getCheckList();
},tenSec)
  

function question2(){
  bot.on((ctx) => {
    ctx.sendMessage(myId,"Ну как? Вы уже изучили чек-лист?", null, Markup
      .keyboard([
        'Да',
        'Нет',
      ])
    );
  })
  }

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


function last(){
  bot.sendMessage(myId , 'Hello!', 'photo1_1');
}
    */