const VkBot = require('node-vk-bot-api');
const token = "81a9c491096977dd53d192c2315133e99f13cc471e2a0cb445ec999b6e4ab191a16733aba3947b40c6d9a"
const Markup = require('node-vk-bot-api/lib/markup');
const Scene = require('node-vk-bot-api/lib/scene');
const Session = require('node-vk-bot-api/lib/session');
const Stage = require('node-vk-bot-api/lib/stage');
const bot = new VkBot(token);
const keyWords = ["раз","два","три"];
const axios = require('C:/доки/чат_боты_работа/node_modules/axios');
let step = 0;

const hello = "Хотите получить бесплатный чек лист 7 вопросов себе для создания капитала или узнать подробнее о курсе Финансовый тетрис Кликните на подходящую кнопку ниже:"
const book  = "Чек лист 7 вопросов себе для создания капитала поможет вам научиться:- создавать капитал 💰;- получать доход от капитала;- грамотно управлять им;- и защищать капитал.Чтобы его получить, кликните на кнопку ниже 👇"
const message = "Наверняка после прочтения у вас в мыслях уже начинает потихоньку зарождаться личный инвестиционный план.Чтобы выстроить свою правильную финансовую модель и обеспечить комфортную жизнь себе и своим потомкам, нужно погрузиться в эту тему с головой. 👨‍💻📝Об этом максимально подробно и попунктам мы рассказываем на курсеФинансовый тетрис- находим дополнительные источники дохода;- выбираем стратегии финансового роста;- создаём систему планомерных накоплений- выстраиваем щит от потерь.Хотите получить бесплатнуюконсультацию от эксперта?"
const refuseMessage = "Хорошо, нажмите кнопку ниже, как только прочитаете его 👇Я дам вам еще немного информации в дополнение к нему."
const areYouSureMessage = "Вы уверены?";
const byeMessage = "Хорошо. Уверена, что на моем аккаунте вы найдете еще много полезной информации 😉"
const beginQuiz= "Ответьте на 3 вопроса ниже и эксперт, работающий по технологии «Финансовый тетрис» проконсультирует вас 👇"
const firstQuestion = "Выберите ответы, которые подходят вам:"
const firstAnswer =  [ "Есть план финансового развития на 5 лет",  
"Я не планирую долгосрочно", 
"Моих ресурсов хватает только на месяц", 
"Действую по обстоятельствам", 
]
const secondQuestion = "Укажите то, что лучше всего вас описывает:";
const secondAnswer = [
   "принимаю  решения",  
  "завишу от чужого мнения", 
   "не говорю нет,  внутренний негатив", 
   "пугают перемены", 
]

const thirdQuestion = "Укажите то, что вам подходит";
const thirdAnswer = [
   "есть подушка безопасности", 
   "от зарплаты до зарплаты", 
   "расходы превышают доходы", 
   "За год накопились долги", 
]


const lidMessage = 'С вами свяжется мой помощник и расскажет все о курсе. Напишите ваш номер телефона'

let userId;





function greeting(){
  bot.command(keyWords, (ctx) => {
  
       userId = ctx.message.from_id || ctx.message.user_id;
       console.log(userId)
  
    ctx.reply(hello , null, Markup
      .keyboard([
        'Получить чек-лист',
        'Узнать о курсе',
      ])
      .inline(),);
    setTimeout(question,10000);
  })

  function question(){
    bot.sendMessage(userId,"Ну как? Вы уже изучили чек-лист?", null, Markup
      .keyboard([
        'Да',
        'Нет',
      ])
      .inline(),);

  }
  bot.on((ctx) => {
    if (step === 0 && ctx.message.text === "Получить чек-лист"){
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
        .inline(),);
      step++;
    } else if(step === 1 && ctx.message.text === "Да"){
        ctx.reply(message, null, Markup
          .keyboard([
            "Да",
            "Нет",
          ])
          .inline());
          step++
      }else if(step === 1 && ctx.message.text === "Нет"){
        ctx.reply(refuseMessage, null, Markup
          .keyboard([
           'Да, я прочитал'
          ])
          .inline(),);
          step++
      }
      else if(step === 2 && ctx.message.text === "Да"){
        ctx.reply(beginQuiz, null, Markup
          .keyboard([
           'Начать'
          ])
          .inline(),);
          step++
      }

      else if(step === 3 && ctx.message.text === "Начать"){
        ctx.reply(firstQuestion, null, Markup
          .keyboard([
            firstAnswer[0] ,  
            firstAnswer[1] , 
            firstAnswer[2] , 
            firstAnswer[3] , 
          ],{ columns: 1 })
          .inline(),);
          step++
      }

      else if (step === 4 && ctx.message.text === firstAnswer[0] || firstAnswer[1] ||firstAnswer[2] ||firstAnswer[3]) {
        ctx.reply(secondQuestion, null, Markup
          .keyboard([
              secondAnswer[0],  
              secondAnswer[1], 
              secondAnswer[2], 
              secondAnswer[3], 
          ],{ columns: 1 })
          .inline(),);
      }

   

    });

  
  }
  const scene = new Scene('meet',
  (ctx) => {
    ctx.scene.next();
    ctx.reply(lidMessage);
  },
  (ctx) => {
  
    

 if (/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(ctx.message.text) === false) {
      ctx.reply('Напишите номер в формате 8(XXX)-XXX-XX-XX')
      ctx.session.userPhone = +ctx.message.text;
  }
  
  else if (/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(ctx.message.text) === true) {
    ctx.session.userPhone = +ctx.message.text;
    ctx.scene.next();
    ctx.reply('Как вас зовут?');
}

  },
  (ctx) => {
    ctx.session.userName = ctx.message.text;
    ctx.scene.leave();
    ctx.reply(`Здравствуйте, ваше имя ${ctx.session.userName} и ваш номер ${ctx.session.userPhone}`);
    console.log([ctx.session.userName,ctx.session.userPhone])
      
  const {google} = require('googleapis');
  const keys = require('./keys.json');
  
  
  
  const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
  );
  
  client.authorize(function(err,tokens) {
  
      if(err) {
        console.log(err);
        return;
      } else {
        console.log('Connected!');
        gsrun(client) 
      }
  
  });
  
  async function gsrun(cl) {
  
    const gsapi = google.sheets({version: 'v4', auth: cl});
  
  
    const opt = {
        spreadsheetId: '1XGtu4pbTz75uhgivzU5Udne6Nnm5RcnHKy0TxU8JbeI',
        range: 'Data!B10'
    };
    
    
  const newDataArray = {values: ctx.session.userName}
  const anotherDataArray = {
    values:ctx.session.userPhone
  }
   let data = await gsapi.spreadsheets.values.get(opt);
   console.log(data.data.values);
  
   const updateOptions = {
    spreadsheetId: '1XGtu4pbTz75uhgivzU5Udne6Nnm5RcnHKy0TxU8JbeI',
    range: 'Data!A2:B2',
    valueInputOption: 'USER_ENTERED',
    resource: { values: newDataArray,
    values:anotherDataArray}
   
    
  };
  
  let res  = await gsapi.spreadsheets.values.update(updateOptions);
  
  console.log(res)
  }
  
  

  },
  
);
const session = new Session();
const stage = new Stage(scene);

bot.use(session.middleware());
bot.use(stage.middleware());

bot.command([  /*"принимаю  решения",  
"завишу от чужого мнения", 
 "не говорю нет,  внутренний негатив", 
 "пугают перемены","Узнать о курсе"*/ '/meet', ], (ctx) => {
  ctx.scene.enter('meet');
});

  greeting();




  bot.startPolling((err) => {
    if (err) {
      console.error(err);
    }
  });
  













