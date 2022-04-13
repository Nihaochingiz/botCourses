const VkBot = require('node-vk-bot-api');
const token = "81a9c491096977dd53d192c2315133e99f13cc471e2a0cb445ec999b6e4ab191a16733aba3947b40c6d9a"
const bot = new VkBot(token)
const Markup = require('node-vk-bot-api/lib/markup');
const keyWords = ["раз","два","три"]

const helloWorld = "Хотите получить бесплатный чек лист 7 вопросов себе для создания капитала или узнать подробнее о курсе Финансовый тетрис Кликните на подходящую кнопку ниже:"
const book  = "Чек лист 7 вопросов себе для создания капиталпоможет вам научиться:- создавать капитал 💰;- получать доход от капитала;- грамотно управлять им;- и защищать капитал.Чтобы его получить, кликните на кнопку ниже 👇"
const message = "Наверняка после прочтения у вас в мыслях уже начинает потихоньку зарождаться личный инвестиционный план.Чтобы выстроить свою правильную финансовую модель и обеспечить комфортную жизнь себе и своим потомкам, нужно погрузиться в эту тему с головой. 👨‍💻📝Об этом максимально подробно и попунктам мы рассказываем на курсеФинансовый тетрис- находим дополнительные источники дохода;- выбираем стратегии финансового роста;- создаём систему планомерных накоплений- выстраиваем щит от потерь.Хотите получить бесплатнуюконсультацию от эксперта?"
const refuseMessage = "Хорошо, нажмите кнопку ниже, как только прочитаете его 👇Я дам вам еще немного информации в дополнение к нему."
const areYouSureMessage = "Вы уверены?";
const byeMessage = "Хорошо. Уверена, что на моем аккаунте вы найдете еще много полезной информации 😉"
const beginQuiz= "Ответьте на 4 вопроса ниже и эксперт, работающий по технологии «Финансовый тетрис» проконсультирует вас 👇"
const firstQuestion = "Выберите ответы, которые подходят вам:"
const firstAnswer = {
  1: "Есть план финансового развития на 5 лет",  
  2: "Я не планирую долгосрочно", 
  3: "Моих ресурсов хватает только на месяц", 
  4: "Действую по обстоятельствам", 
}

const secondQuestion = "Укажите то, что лучше всего вас описывает:";
const secondAnswer = {
  1: " Я легко принимаю важные решения",  
  2: "Мои решения зачастую зависят от чужого мнения", 
  3: "Не умею говорить “нет”, поэтому накапливается внутренний негатив", 
  4: "Мне сложно найти решение, пугают перемены", 
}

const thirdQuestion = "Укажите то, что лучше всего вас описывает:";
const thirdAnswer = {
  1: " У меня всегда есть подушка безопасности",  
  2: "Я живу от зарплаты до зарплаты", 
  3: "Мои расходы превышают доходы", 
  4: "За последний год у меня накопились долги", 
}

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




function areYouSure(userAnswerSure) {
  if (userAnswerSure === "Нет") {
    bot.command(userAnswerSure, (ctx) => {
      ctx.reply(refuseMessage , null, Markup
        .keyboard([
         'Да, я прочитал'
        ])
      );
      
    } 
    )}
    if (userAnswerSure === "Да") {
      bot.command(userAnswerSure, (ctx) => {
        ctx.reply(message , null, Markup
          .keyboard([
            'Yes',
            'No',
          ])
        );
        
      })
      
    }}





greeting();
getCheckList();
sendMessage("Да");
sendMessage("Нет");
areYouSure("Yes");
areYouSure("No");




bot.startPolling((err) => {
  if (err) {
    console.error(err);
  }
});

