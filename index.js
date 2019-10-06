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

let Parser = require('rss-parser');
let parser = new Parser();

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

async function yt(msg){
  let feed = await parser.parseURL('https://www.youtube.com/feeds/videos.xml?channel_id=UCN25q81_zmzVMMRGxMvEf4w');
  console.log(feed.title, feed.feedUrl, feed.link);
  for (i=0; i<3; i++) {
    console.log(feed.items[i])
    msg.channel.send(feed.items[i].title + " " + feed.items[i].link)
  }
  msg.channel.send("Youtuber " + feed.title);
  return "youtube"
}
async function th(msg){
  let feed = await parser.parseURL('https://www.tomshardware.fr/feed/');
  msg.channel.send("Dernières actu de " + feed.title);
  console.log(feed.title, feed.feedUrl, feed.link);
  for (i=0; i<3; i++) {
    console.log(feed.items[i])
    msg.channel.send("---\n\n:triangular_flag_on_post: "
                    + feed.items[i].title + " (" + feed.items[i].link + ")")
  }
  return "nothing"
}

// Ecrire du code pour que la commande /ajoute XYZ:
// 1- Vérifie que le fichier de stockage existe, et le crée si il n'existe pas
// 2- Ajoute le XYZ à la fin du fichier.
// Ecrire la commande /lit qui retourne dans le channel discord le contenu total du fichier.

var fs = require('fs');
const DATAFILE = 'data.txt';
let oldContent = ''

// Surveille les messages
client.on('message', msg => {

  if (msg.content.substring(0, 8) === '/ajoute ') {      // si qqn tape "/lit"
    // Envoie le resultat de la fonction abo()
    let newContent = msg.content.substring(8)
    console.log(newContent);
    try {
      oldContent = fs.readFileSync(DATAFILE, 'utf8')
    } catch (e) {
      console.log(e)
    }
    fs.writeFile(DATAFILE, oldContent + "\n" + newContent, function(err) {
      // If an error occurred, show it and return
      if(err) return console.error(err);
      // Successfully wrote binary contents to the file!
    });
  }
  if (msg.content === '/lit') {      // si qqn tape "/lit"
    // Envoie le resultat de la fonction abo()
    msg.channel.send('Lit qqch');
    msg.channel.send(fs.readFileSync(DATAFILE, 'utf8'));
  }

  if (msg.content === 'yt') {      // si qqn tape "yt"
    // Envoie le resultat de la fonction abo()
    yt(msg)
    msg.channel.send('Voila');
  }

  if (msg.content === 'th') {      // si qqn tape "th"
    // Envoie le resultat de la fonction abo()
    th(msg)
    msg.channel.send('Voila');
  }

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
