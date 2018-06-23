'use strict';
var md = new Remarkable(
  {
  html:true,
  linkify:true  
  });
console.info(steem);
var post_array = Array();
var state = get_state();

// Get the modal
var modal = document.getElementById('botModal');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Listen tu URL # change to reload posts & refresh state
window.onhashchange = hash_change;


function hash_change() 
{
  state = get_state();
  refresh(state);
}

steem.api.setOptions({url: 'https://api.steemit.com'});

// put matrix of known bots	
var bots = ["postdoctor", "moneymatchgaming", "slimwhale", "boostbot", "honestbot", "ebargains", "lost-ninja", "estream.studios", "adriatik", "redwhale", "minnowhelper", "mrswhale", "foxyd", "mitsuko", "dailyupvotes", "lovejuice", "steembloggers", "booster", "megabot", "voterunner", "authors.league", "canalcrypto", "whalebuilder", "mercurybot", "msp-bidbot", "promobot", "upmewhale", "redlambo", "lrd", "lightningbolt", "sunrawhale", "upyou", "thebot", "onlyprofitbot", "pushbot", "flymehigh", "nado.bot", "seakraken", "spydo", "childfund", "minnowvotes", "dolphinbot", "upme", "upboater", "proffit", "bluebot", "brupvoter", "oceanwhale", "jerrybanfield", "luckyvotes", "minnowfairy", "estabond", "bodzila", "peace-bot", "appreciator", "discordia", "emperorofnaps", "zapzap", "cryptoempire", "bearwards", "alphaprime", "therising", "buildawhale", "aksdwi", "sleeplesswhale", "isotonic", "noicebot", "upgoater", "dlivepromoter", "upmyvote", "youtake", "smartsteem", "fishbaitbot", "rocky1", "shares", "boomerang", "brandonfrye", "postpromoter", "pushup", "singing.beauty", "edensgarden", "pwrup", "inciter", "chronocrypto", "allaz", "sneaky-ninja"];
render_bots();

// get and render trending tags upon initialization 
steem.api.getTrendingTags("", 10, function(err, result) {
  var tags = [];
  var names = [];
  console.log(result);
  var top_tags = document.querySelector('#top_tags');
  var own_tags = ["deutsch", "life", "photography", "steemit", "bitcoin",  "blog", "cryptocurrency", "funny", "art", "news", "nature", "meme", "travel", "crypto", "story", "food", "steem", "photo", "dtube", "video", "money", "new", "blockchain", "love", "writing", "music", "fun", "health", "technology", "politics"]
  
  for (let i = 1; i < own_tags.length; i++) {
    tags[i] = own_tags[i];
    document.getElementById('tags').add(new Option(tags[i], tags[i]));
    var li = document.createElement("li");
    li.innerHTML = "<a href='#"+tags[i]+"' >" + tags[i] + "</a>";
    top_tags.querySelector('ul').append(
      document.importNode(
        li,
        true
      )
    );
  }
  if(state != '') {
    document.getElementById('tags').value = state;
  }      
  start(document.getElementById('tags').value); // call start function with active tag
});

// adjust tag, if not selected default "all" value	
function start(val) 
{
  if (val == "all") {
    val = "";
    search(val);
  } else {
    search(val); // send the tag to search function
  }
}

//Search trending by tag with optional start index
function search(val, index)
{
  var query = {
    tag: "deutsch",
    limit: 100
  };
  if(index) {
    query.start_author = index.aut;
    query.start_permlink = index.perm
  }
  // get the first 100 trending post 
  steem.api.getDiscussionsByCreated(query, function(err, result) {
    post_array = post_array.concat(result);
    evaluate(post_array, val);
  });
}



// check the voters according to bot array and filter.
function evaluate(result, val) 
{ 
  var activevotes = [];
  var activevoter = []
  var usedtags = [];
  var n_result = [];
  var control = 0;
  
  var i = 0;
  var j = 0;

  for (let i = 0; i < result.length; i++) {
    control = 0;
    activevotes = result[i].active_votes;
    const metadata = JSON.parse(result[i].json_metadata)
    usedtags = metadata.tags
    for (let j = 0; j < activevotes.length; j++) {

      if (bots.includes(activevotes[j].voter)) {
        control = 1;
      }
    }
    if (val != "")
    {
        control = 1;
    }
    //if (let j = 0; j < usedtags.length; j++) {
        if (usedtags.includes(val)) {
            control = 0;
        }
    //}
    if (control == 0) {
      n_result.push(result[i]);
    }
  }

  console.log(n_result);
  create_div(n_result); // send the final result for display
}

// Render bot list on DOM
function render_bots() 
{
  var bot_list = document.querySelector('#bot_list');
  var lis = bot_list.querySelectorAll('li').length;
  console.log(lis);
  if(lis == 0) {
    bots.forEach(function(bot) {
      var li = document.createElement("li");
      li.innerHTML = bot;
      bot_list.querySelector('ul').append(
        document.importNode(
          li,
          true
        )
      );
    });
  }
}

// Show bot list on DOM
function show_bots() 
{  
  bot_list.classList.remove('hide');
  modal.style.display = "block";
}

// add new bots to the array
function add_bot(name)
{
  if(typeof name == 'undefined') {
    var new_bot = document.getElementById('botName').value;
    document.getElementById('botName').value = '';
  } else {
    var new_bot = name;
  }
  if ((new_bot == "") || (new_bot == "botname")) {

    window.alert("Please enter a valid bot name");
  } else if(bots.includes(new_bot))  {
    window.alert("Bot already added");
  }

  else {
    document.querySelector('#refresh').classList.remove('hide');
    bots.push(new_bot);
    var bot_list = document.querySelector('#bot_list');
    var li = document.createElement("li");
    li.innerHTML = new_bot;
    var bot_list_ul = bot_list.querySelector('ul');
    bot_list_ul.insertBefore(li, bot_list_ul.firstChild);
  }
  
}

// Remove Blacklist

function remove_bot(name)
{
  if(typeof name == 'undefined') {
    var elem = event.srcElement;
    name = elem.value;
  }
  if ((name == "") || (name == "botname")) {

    window.alert("Please enter a valid bot name");
  }
  else {
    var index = bots.indexOf(name);
    if (index > -1) {
      bots.splice(index, 1);
      console.log("Removed: " + name);
      // var bot_list = document.querySelector('');
      document.querySelector('#bot_list ul').innerHTML = "";
      render_bots();
    }
  }
}

// Ad new user to bot array
function add_blacklist() 
{ 
  var elem = event.srcElement;
  var name = elem.value;
  add_bot(name);
  elem.innerHTML = 'Remove From BlackList';
  elem.onclick = function() {
    elem.innerHTML = 'Add to BlackList';
    remove_bot();
    elem.onclick = add_blacklist;
  }

}

// Close bot list on DOM
function close_bots()
{
  var bot_list = document.querySelector('#bot_list');
  bot_list.classList.add('hide');
  modal.style.display = "none";
}

// Refresh posts
function refresh(tag) 
{
  close_bots();
  document.getElementById('loader').classList.remove("hide");
  document.querySelector('#refresh').classList.add('hide');
  post_array = Array();
  if(typeof tag == 'undefined') {
    var tag = document.getElementById('tags').value;
  } else {
    document.getElementById('tags').value = tag;
  }
  console.log('refresh');
  window.location.hash = tag;
  document.getElementById("posts").innerHTML = "<h2></h2>";
  start(tag);
}

// Display posts results on DOM
function create_div(result) 
{ 

  var currentTag = document.getElementById('tags').value;
  var tagTitle = document.querySelector('#posts h2');
  var template = document.querySelector('template');
  
  tagTitle.innerHTML = currentTag + ' posts';

  for (let i = 0; i < result.length; i++) { // create divs according to the length of result
  
    var content = template.cloneNode(true).content;
    var author = content.querySelector('.author h5');
    var button = content.querySelector('button');
    var links = content.querySelectorAll('a');
    var image = content.querySelector('.author img');
    var votes = content.querySelector('.author .votes');
    var comments = content.querySelector('.author .comments');
    var post_tags = content.querySelector('.post_tags');
    var post_user = content.querySelector('.post_user');
    var payout = content.querySelector('.author .payout');
    var title = content.querySelector('.post_title');
    var post_content = content.querySelector('.post_content p');

    var textTitle = (result[i].title).substring(0, 60);
    var permLink = "https://steemit.com/@" + result[i].author + "/" + result[i].permlink;
    const metadata = JSON.parse(result[i].json_metadata)
    var thumbnail = metadata.image && metadata.image.length > 0 ? metadata.image.shift() : null

    var text=result[i].body;
    var stripped = text.replace(/\!*\[.*\]\(.+\)/g, '').replace(/(<([^>]+)>)/ig, '');
    // Removes links (including images)
    stripped = removeLInks(stripped).replace(/[^a-zA-Z0-9\!\?\,\.\;\'\"]/g, ' ');
    
    // if no image on metadata search for first img tag on post
    if (thumbnail == null) {
      var markuped = md.render(text);
      var x = document.createElement("x");
      x.innerHTML = markuped;
      var img = (x.querySelector("img"));
      if(img) {
        thumbnail = img.src;
        img.remove();
      }
    }
    
    var imgSrc = "https://steemitimages.com/0x0/"+thumbnail;
    var lin2 = "...read more";
    var showContent = stripped.substring(0, 300) + ".....";

    links.forEach(link => {
      link.href = permLink;
    });
    var authorLink = "https://steemit.com/@" + result[i].author;
    author.innerHTML = result[i].author;
    content.querySelector('.author a').setAttribute("href", authorLink);
    votes.innerHTML = 'Votes: ' + result[i].active_votes.length;
    payout.innerHTML = 'Payout: $' + result[i].pending_payout_value.replace(' SBD', '');
    comments.innerHTML = 'Comments: ' + result[i].children;

    post_tags.innerHTML = 'Tags: ' + metadata.tags.toString();
    var mentioned_user = metadata.users && metadata.users.length > 0 ? metadata.users.toString() : null
    post_user.innerHTML = 'Mentioned user: ' + mentioned_user;
    //for (let j = 0; j < result[i].tags.length; j++) { 
    //    tags.innerHTML = tags.innerHTML + result[i].tags[j]
    //}
    title.innerHTML = textTitle;
    post_content.innerHTML = showContent;
    image.src = imgSrc;
    button.setAttribute('value', result[i].author);

    document.getElementById('loader').classList.add("hide");

    document.querySelector('#posts').append(
      document.importNode(
        content,
        true
      )
    );
    
  }
}

// Function to centralize state management
function get_state() 
{
  return window.location.hash.replace('#', '');
}

// Helper to remove links from steem post body
function removeLInks(inputText) 
{
  //URLs starting with http://, https://, or ftp://
  var replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
  var replacedText = inputText.replace(replacePattern1, '');

  //URLs starting with www. (without // before it, or it'd re-link the ones done above)
  var replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
  var replacedText = replacedText.replace(replacePattern2, '');

  //Change email addresses to mailto:: links
  var replacePattern3 = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;
  var replacedText = replacedText.replace(replacePattern3, '');

  return replacedText
}