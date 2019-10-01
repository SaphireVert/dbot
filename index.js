// Va chercher les secrets dans le fichier secrets.js, dans le cas ou
// on est en local. Comme Heroku n'aime pas charger un module qui n'existe
// pas, il faut attraper l'erreur pour pas que cela plante...
var BoToken = null;
try {
  var s = require("./secrets");
  BoToken = s.BOT_TOKEN;
} catch (e) {
  console.log("Pas de secrets trouvé, on utilise process.env.BOT_TOKEN");
  //console.log(e);
  BoToken = process.env.BOT_TOKEN;
}

// Requière la librairie Discord
const { Client, RichEmbed, Attachment } = require('discord.js');
const getJSON = require('get-json');

// Instancie un nouveau client Discord
const client = new Client();

// Construit un message rich "abonnement" avec le constructeur MessageEmbed
// https://discord.js.org/#/docs/main/stable/class/RichEmbed
const abo = () => {
  return new RichEmbed()
    // Le titre de l'encart
    .setTitle(':arrow_down: Abonne toi à T2006 :arrow_down:')
    // La couleur de l'encart
    .setColor(0xff0000)
    // Le contenu de l'encart
    .setDescription('https://www.youtube.com/channel/UCWC87vcR72VDYM7AGBzuBDQ');
}
// Surveille le status
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.channels.get('628484270632992781').send('Hey! Je suis là!')
});

// Surveille les messages
client.on('message', msg => {

  if (msg.content === 'test3') {     // Si le message dit "^^ping"
    msg.reply('TEST2!!!!!');   // Répond "Pong!"
  }
  if (msg.content === 'test2') {     // Si le message dit "^^ping"
    msg.reply('TEST2!!!!!');   // Répond "Pong!"
  }

  if (msg.content === 'test') {     // Si le message dit "^^ping"
    msg.reply('TEST!!!!!');   // Répond "Pong!"
  }

  if (msg.content === '^^ping') {     // Si le message dit "^^ping"
    msg.reply('Pong! :ping_pong:');   // Répond "Pong!"
  }

  if (msg.content === '^^abo2') {     // Si le message dit "^^abo2"
    msg.reply('Hey! Abonnez-vous à la châine de T2006 → https://www.youtube.com/channel/UCWC87vcR72VDYM7AGBzuBDQ :T2006:');   // Répond "Pong!"
  }

  if (msg.content === '^^salut') {    // Si le message dit "^salut"
    msg.reply('salut salut');
  }

  if (msg.content === 'mew mew') {    // Si le message dit "^salut"
    var ts = new Date().getTime();
    msg.reply("http://thecatapi.com/api/images/get?format=src&type=gif&timestamp="+ts);
  }

  if (msg.content === '1234') {       // un test si le msg dit "1234"
    const embed = new RichEmbed()
      // Set the title of the field
      .setTitle('A slick little embed')
      // Set the color of the embed
      .setColor(0xFF0000)
      // Set the main content of the embed
      .setDescription('Hello, this is a slick embed!');
    // Send the embed to the same channel as the message
    msg.channel.send(embed);
  }

  if (msg.content === '^^abo') {      // si qqn tape "^^abo"
    // Envoie le resultat de la fonction abo()
    msg.channel.send(abo());
  }

  if (msg.content === 'avatar') {     // si "avatar"
    // Retourne l'URL vers l'image de la personne
    msg.reply(msg.author.avatarURL);
  }

  if (msg.content === 'cat') {
    // Utilise http://random.cat pour afficher une image de chat...
    getJSON('http://aws.random.cat/meow', function(error, response){
      if (error) {
        console.log(error);
      } else {
        // On crée l'attachement
        const attachment = new Attachment(response.file);
        // Et on envoie le fichier dans le canal...
        msg.channel.send(attachment);
      }
    });
  }
});

// En cas de nouveaux arrivés...
client.on('guildMemberAdd', member => {
  // On envoie le message à un canal désigné, ici "gere-bot"
  const channel = member.guild.channels.find(ch => ch.name === 'gere-bot');
  // Si on ne trouve pas le canal, on fait rien
  if (!channel) return;
  // Autrement, on envoie le message dans le canal (plouf!)
  channel.send(`Bienvenue ${member}!`);
  channel.send(abo());
});

// Connect le client.
client.login(BoToken);
console.log("Le bot est démarré !");
