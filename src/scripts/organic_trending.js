 steem.api.setOptions({
      url: 'https://api.steemit.com'
    });
    document.getElementById('tags').disabled = true;
    document.getElementById('addbot').disabled = true;
    document.getElementById('button_div_1').style.display = "none";

 
 	// put patrix of known bots	
    var bots = ["postdoctor", "moneymatchgaming", "slimwhale", "boostbot", "honestbot", "ebargains", "lost-ninja", "estream.studios", "adriatik", "redwhale", "minnowhelper", "mrswhale", "foxyd", "mitsuko", "dailyupvotes", "lovejuice", "steembloggers", "booster", "megabot", "voterunner", "authors.league", "canalcrypto", "whalebuilder", "mercurybot", "msp-bidbot", "promobot", "upmewhale", "redlambo", "lrd", "lightningbolt", "sunrawhale", "upyou", "thebot", "onlyprofitbot", "pushbot", "flymehigh", "nado.bot", "seakraken", "spydo", "childfund", "minnowvotes", "dolphinbot", "upme", "upboater", "proffit", "bluebot", "brupvoter", "oceanwhale", "jerrybanfield", "luckyvotes", "minnowfairy", "estabond", "bodzila", "peace-bot", "appreciator", "discordia", "emperorofnaps", "zapzap", "cryptoempire", "bearwards", "alphaprime", "therising", "buildawhale", "aksdwi", "sleeplesswhale", "isotonic", "noicebot", "upgoater", "dlivepromoter", "upmyvote", "youtake", "smartsteem", "fishbaitbot", "rocky1", "shares", "boomerang", "brandonfrye", "postpromoter", "pushup", "singing.beauty", "edensgarden", "pwrup", "inciter", "chronocrypto", "allaz", "sneaky-ninja"];

    document.getElementById("bots_div").style.display = 'none';

	// get trending tags 
    steem.api.getTrendingTags("", 100, function(err, result) {
      var tags = [];
      var names = [];
      for (let i = 1; i < result.length; i++) {
        tags[i] = result[i].name;
        document.getElementById('tags').add(new Option(tags[i]));
      }      
      start(document.getElementById('tags').value); // call start function with active tag
    });

	// adjust tag, if not selected default "all" value	
    function start(val) {
      document.getElementById('button_div_1').style.display = "none";
      if (val == "all") {
        val = "";
        search(val);
      } else {
        search(val); // send the tag to search function
      }
    }


    function re_start() {
      document.getElementById('tags').disabled = true;
      document.getElementById('addbot').disabled = true;
      document.getElementById('button_div_1').style.display = "none";
      spinner.style.display = "block"
      document.getElementById("container").innerHTML = "";
      start(document.getElementById('tags').value);


    }



    function search(val)

     {
      var query = {
        tag: val,
        limit: 100
      };
      steem.api.getDiscussionsByTrending(query, function(err, result) {  // get the first 100 trending post 

        form_array1(result); // send result to get 2nd 100 results
      });

    }


    function form_array1(result) { // get the second 100 trending post

      var post_array = [];
      post_array = result;


      var aut = result[99].author;
      var perm = result[99].permlink;
      var query = {
        tag: '',
        limit: 100,
        start_author: aut,
        start_permlink: perm
      };
      steem.api.getDiscussionsByTrending(query, function(err, result) {
        post_array = post_array.concat(result);

        form_array2(post_array); // send result to get 3rd 100 post

      });


    }

    function form_array2(result) { // get 200 to 300 trending posts

      var post_array = [];
      post_array = result;


      var aut = result[199].author;
      var perm = result[199].permlink;
      var query = {
        tag: '',
        limit: 100,
        start_author: aut,
        start_permlink: perm
      };
      steem.api.getDiscussionsByTrending(query, function(err, result) {
        post_array = post_array.concat(result);
        evaluate(post_array); // send results for evaluation


      });


    }


    function evaluate(result) { // check the voters according to bot array and filter.

      var activevotes = [];
      var activevoter = []
      var n_result = [];
      var control = 0;
      
      var i = 0;

      for (let i = 0; i < result.length; i++) {
        control = 0;
        activevotes = result[i].active_votes;
        for (let j = 0; j < activevotes.length; j++) {

          if (bots.includes(activevotes[j].voter)) {
            control = 1;
          }
        }
        if (control == 0) {
          n_result.push(result[i]);
        }
      }

      console.log(n_result);
      document.getElementById("spinner").style.display = "none";
      create_div(n_result); // send the final result for display


    }





    function create_div(result) { // display results

      document.getElementById('tags').disabled = false;
      document.getElementById('addbot').disabled = false;
      var container = document.getElementById("container");
      container.innerHtml = "";
      for (let i = 0; i < result.length; i++) { // create divs according to the length of result
		  
        var div = document.createElement("div");
        div.setAttribute("id", "div_" + i);
        div.setAttribute("class", "gwd-div-1eiz");
        div.style.top = (i * 310) + "px";


        var input = document.createElement("input");
        input.setAttribute("id", "input_" + i);
        input.setAttribute("type", "checkbox");
        input.setAttribute("class", "gwd-input-1eoi");
        input.addEventListener('click', masterEventHandler, false);

        var user = document.createElement("p");
        user.setAttribute("id", "p_" + i);
        user.setAttribute("class", "gwd-p-1a09");

        var picture = document.createElement("div");
        picture.setAttribute("id", "pic_" + i);
        picture.setAttribute("class", "gwd-div-b03b gwd-new-class-ulmv gwd-gen-nzw3gwdanimation");

        var head = document.createElement("p");
        head.setAttribute("id", "ph_" + i);
        head.setAttribute("class", "gwd-p-lfng gwd-p-qjuq");

        var bod = document.createElement("p");
        bod.setAttribute("id", "pb_" + i);
        bod.setAttribute("class", "gwd-p-lfng gwd-p-a5eb");

        var qty = document.createElement("p");
        qty.setAttribute("id", "qty_" + i);
        qty.setAttribute("class", "gwd-p-1c86 gwd-p-srlj");

        var sbd = document.createElement("p");
        sbd.setAttribute("id", "sbd_" + i);
        sbd.setAttribute("class", "gwd-p-1c86 gwd-p-kq83 gwd-p-zaj2 gwd-p-1s9i gwd-p-fyf7");

        var sbd_tag = document.createElement("p");
        sbd_tag.setAttribute("class", "gwd-p-1c86 gwd-p-kq83 gwd-p-zaj2 gwd-p-f2dv");
        sbd_tag.innerHTML = "Pay-Out: ";

        var qty_tag = document.createElement("p");
        qty_tag.setAttribute("class", "gwd-p-1c86 gwd-p-kq83 gwd-p-1r98");
        qty_tag.innerHTML = "Votes Qty: ";

        var n_tag = document.createElement("p");
        n_tag.setAttribute("class", "gwd-p-1a09 gwd-p-1vqu");
        n_tag.setAttribute("id", "ntag_" + i);
        n_tag.innerHTML = "I dont't want to see posts upvoted by: ";

        var unwanted = document.createElement("p");
        unwanted.setAttribute("id", "uw_" + i);
        unwanted.setAttribute("class", "gwd-p-1a09 gwd-p-1vqu gwd-p-1j5f");

        
		// append all the child objects to the div

        div.appendChild(input);
        div.appendChild(user);
        div.appendChild(picture);
        div.appendChild(head);
        div.appendChild(bod);
        div.appendChild(qty);
        div.appendChild(sbd);
        div.appendChild(sbd_tag);
        div.appendChild(qty_tag);
        div.appendChild(n_tag);
        div.appendChild(unwanted);

        container.appendChild(div); // Append <button> to <body>
         document.getElementById("p_"+i).style.fontSize = "large";
        document.getElementById("p_"+i).innerHTML =result[i].author;
        document.getElementById("uw_"+i).innerHTML =result[i].author;
        var str = "https://steemit.com/@" + result[i].author + "/" + result[i].permlink;
        var lin = (result[i].title).substring(0, 60);
        
        document.getElementById("ph_"+i).innerHTML = lin.link(str);
        document.getElementById("qty_"+i).innerHTML = result[i].active_votes.length;
        document.getElementById("sbd_"+i).innerHTML = result[i].pending_payout_value;
        
		const metadata = JSON.parse(result[i].json_metadata)
        const thumbnail = metadata.image && metadata.image.length > 0 ? metadata.image.shift() : null

        img = document.createElement('img');
        img.src = "https://steemitimages.com/0x0/"+thumbnail;
        document.getElementById("pic_" + i).appendChild(img); 
    
        
        var text=result[i].body
		 var lin2 = "read more";
        
        var stripped = text.replace(/\!*\[.*\]\(.+\)/g, '').replace(/(<([^>]+)>)/ig, '').replace(/[^a-zA-Z0-9\!\?\,\.\;\'\"]/g, ' ');
        document.getElementById("pb_" + i).innerHTML = stripped.substring(0, 600) + "....." + lin2.link(str);
        
      }


     
      
      
      
      
     
    }



	// event handler for un-wanted voter selection
    function masterEventHandler() {
      var target = event.target.id;
      var index = target.split("_")[1];
      var in_text=document.getElementById("uw_" + index).innerHTML
      console.log("clicked" + event.target.id, index);
      if (document.getElementById(target).checked) {
        document.getElementById('button_div_1').style.display = "block";
        document.getElementById('button_div').enabled = "false";                           
        document.getElementById("p_" + index).innerHTML = in_text.strike();
        bots.push(in_text);

      }
      if (document.getElementById(target).checked != true) {
       var ind=bots.indexOf(in_text);
        bots.splice(ind,1);
        
       document.getElementById("p_" + index).innerHTML = in_text;       
      }

    }

	// add new bots to the array
    function add_bot() {
      document.getElementById("container").innerHTML = "";
      document.getElementById("button_div").style.display = "none";
      document.getElementById("button_div_1").style.display = "none";
      document.getElementById("tags_div").style.display = "none";
      document.getElementById("bots_div").style.display = 'block';
      document.getElementById("name_the_bots").innerHTML = "";
      for (let i = 0; i < bots.length; i++) {
        document.getElementById("name_the_bots").innerHTML = document.getElementById("name_the_bots").innerHTML + bots[i] + "<br />";
      }
    }

	// initialize bot addition screen
    function add_new_bot() {

      var new_bot = document.getElementById("username").value;
      if ((new_bot == "") || (new_bot == "botname")) {

        window.alert("Please enter a valid bot name");
      }

      if ((new_bot != "") && (new_bot != "botname")) {
        bots.push(new_bot);
        var div_in = document.getElementById("name_the_bots").innerHTML
        document.getElementById("name_the_bots").innerHTML = new_bot + "<br />" + div_in;

      }



    }
	// close bot addition screen
    function close_bot() {
      document.getElementById("bots_div").style.display = 'none';
      document.getElementById("button_div").style.display = "block";
      document.getElementById("button_div_1").style.display = "block";
      document.getElementById("tags_div").style.display = "block";
      re_start();
    }