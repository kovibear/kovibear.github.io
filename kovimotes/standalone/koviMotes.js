var koviMotes = koviMotes || {};

koviMotes.version = "2018.05.04";

koviMotes.css = document.createElement("style");
koviMotes.css.id = "koviMotes.css";
koviMotes.css.innerHTML = "\
  .message-group.compact .message .message-text .markup {text-indent: 0px; padding-left: 0px;}\
  .emotewrapper {display: inline-block; position: relative;}\
  .emote {max-height: 32px !important; height: 32px !important;}\
  .message-group .message .emoji {height: 32px !important; width: auto !important;}\
  .message-group .message .reaction.emoji {height: 24px; width: 24px;}\
  .message-group .message .emote64 {max-height: 64px !important; height: 64px !important; width: auto !important;}\
  .div64 {font-size: 200% !important;}\
  .emoteflipflap {transform: scaleX(-1) scaleY(-1);}\
  .emoteflip, .emotespinflip {transform: scaleX(-1)}\
  .emoteflap {transform: scaleY(-1)}\
  .emotespin {animation: 1.0s emote-spin infinite linear}\
  .emote1spin {animation: 1.0s emote-spin-reverse infinite linear}\
  .emotespin2 {animation: 0.5s emote-spin infinite linear}\
  .emote2spin {animation: 0.5s emote-spin-reverse infinite linear}\
  .emotespin3 {animation: 0.2s emote-spin infinite linear}\
  .emote3spin {animation: 0.2s emote-spin-reverse infinite linear}\
  .emotepulse {animation: 1.0s emote-pulse infinite linear}\
  .emotetr {transform: translateX(-3px)}\
  .emotebl {transform: translateY(-3px)}\
  .emotebr {transform: translate(-3px,-3px)}\
  .emoteshake {animation: 1.0s emote-shake infinite linear}\
  .emoteshake2 {animation: 0.2s emote-shake2 linear infinite}\
  .emoteshake3 {animation: 0.1s emote-shake3 linear infinite}\
  .emoteshake4 {animation: 0.08s emote-shake4 linear infinite}\
  @-webkit-keyframes \"emote-spin\" {from {transform: rotate(0deg);} to {transform: rotate(360deg);}}\
  @-webkit-keyframes \"emote-spin-reverse\" {from {transform: rotate(0deg);} to {transform: rotate(-360deg);}}\
  @-webkit-keyframes \"emote-pulse\" {0% {-webkit-transform: scale(1,1);} 50% {-webkit-transform: scale(1.2,1.2);} 100% {-webkit-transform: scale(1,1);}}\
  @-webkit-keyframes \"emote-shake\" {10%, 90% {transform: translate3d(-1px,0,0);} 20%, 80% {transform: translate3d(2px,0,0);} 30%, 50%, 70% {transform: translate3d(-4px,0,0);} 40%, 60% {transform:translate3d(4px,0,0);}}\
  @-webkit-keyframes \"emote-shake2\" {25% {transform: translate(-1px,-1px);} 50% {transform: translate(-1px,1px);} 75% {transform: translate(1px,1px);} 100% {transform: translate(1px,-1px);}}\
  @-webkit-keyframes \"emote-shake3\" {25% {transform: translate(-1px,-1px);} 50% {transform: translate(-1px,1px);} 75% {transform: translate(1px,1px);} 100% {transform: translate(1px,-1px);}}\
  @-webkit-keyframes \"emote-shake4\" {25% {transform: translate(-4px,2px);} 50% {transform: translate(4px,-2px);} 75% {transform: translate(-4px,-2px);} 100%{transform:translate(4px,2px);}}\
  ";
document.head.appendChild(koviMotes.css);

koviMotes.emotes = {
  'twitch': {},
  'bettertwichtv': {},
  'frankerfacez': {},
  'kovimotes': {}
};

koviMotes.getJSON = async function(){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://kovibear.tv/kovimotes/live/koviMotes.json");
  xhr.onload = function(e){
    if(xhr.readyState === 4 && xhr.status === 200){
      var json = JSON.parse(xhr.responseText);
      koviMotes.emotes['kovimotes'] = json;
    } else {
      console.error(xhr.statusText);
    }
  }
  xhr.onerror = function(e){
    console.error(xhr.statusText);
  }
  xhr.send(null);
}

koviMotes.getJSON();

koviMotes.messageObserver = new MutationObserver((mutations) => {
  for(var a = 0; a < mutations.length; a++){
    var mutation = mutations[a];
    if(typeof mutation.addedNodes != "undefined" && mutation.addedNodes.length > 0){
      var added = mutation.addedNodes;
      for(var b = 0; b < added.length; b++){
        var node = added[b];
        if(typeof node.childNodes != "undefined" && node.childNodes.length > 0){
          var messages = koviMotes.getMessages(node);
          if(typeof messages != "undefined" && messages.length > 0){
            for(var c = 0; c < messages.length; c++){
              var message = messages[c];
              koviMotes.processMessage(message);
            }
          }
        }
      }
    }
  }
})

koviMotes.messageObserver.observe(document.body, {childList: true, subtree: true, CharacterData: true});

koviMotes.getMessages = function(node){
  var messages = [];
  var compact = node.querySelectorAll(".message-group .comment .message .markup .message-content");
  var cozy = node.querySelectorAll(".message-group .comment .message .body .message-text .markup");
  if(compact.length > 0){
    messages = compact;
  } else if(cozy.length > 0){
    messages = cozy;
  }
  if(messages.length > 0){
    return messages;
  }
}

koviMotes.emoteMods = ['flip', 'spin', 'pulse', 'spin2', 'spin3', '1spin', '2spin', '3spin', 'tr', 'bl', 'br', 'shake', 'shake2', 'shake3', 'flap', 'flipflap', 'shake4', '64'];

koviMotes.processMessage = function(node){
  if(!node) return;
  if(!node.parentNode) return;
  if(!node.childNodes) return;
  var childNodes = node.childNodes;
  var children = [];
  for(var a = 0; a < childNodes.length; a++){
    children[a] = childNodes[a];
  }
  if(!children || !children.length) return;
  for(var a = 0; a < children.length; a++){
    var child = children[a];
    if(!child || (child.nodeType && child.nodeType != 3)) continue;
    if(!child.nodeValue) continue;
    children.splice(a, 1);
    var value = child.nodeValue;
    var splice = 0;
    var changes = false;
    var words = value.split(/([^\s]+)([\s]|$)/g).filter(function(e){return e;});
    if(!words || !words.length) continue;
    var text = null;
    for(var b = 0; b < words.length; b++){
      var word = words[b];
      var mod = "";
      var has_mod = false;
      var big_mod = false;
      // parse emote modifiers
      if(word.indexOf(":") > -1){
        var mods = word.split(":");
        word = mods[0];
        if(mods[0] != "" && mods[1] != ""){
          for(var c = 1; c < mods.length; c++){
            if(koviMotes.emoteMods.indexOf(mods[c]) > -1 && !has_mod){
              mod += "emote" + mods[c] + " ";
              if(mods[c] === "64"){
                big_mod = true;
              }
              else {
                has_mod = true;
              }
            }
          }
        }
      }
      if(koviMotes.emotes["kovimotes"].emotes && Object.keys(koviMotes.emotes["kovimotes"].emotes).length > 0){
        if(koviMotes.emotes["kovimotes"].emotes[word]){
          if(text){
            children.splice(a + splice++, 0, document.createTextNode(text));
            text = null;
          }
          if(!koviMotes.emotes["kovimotes"].root) continue;
          var url = koviMotes.emotes["kovimotes"].root + word + "." + koviMotes.emotes["kovimotes"].emotes[word];
          var url_fb = null;
          children.splice(a + splice++, 0, koviMotes.createEmoteElement(word, mod, url, url_fb));
          changes = true;
          continue;
        }
        else if(word == "koviMote"){
          if(text){
            children.splice(a + splice++, 0, document.createTextNode(text));
            text = null;
          }
          var url = null;
          var url_fb = null;
          children.splice(a + splice++, 0, koviMotes.createEmoteElement(word, mod, url, url_fb));
          changes = true;
          continue;
        }
      }
      if(!text){
        text = word;
      }
      else{
        text += "" + word;
      }
      if(b === words.length - 1){
        children.splice(a + splice, 0, document.createTextNode(text));
      }
    }
    if(changes){
      if(!children.length || children.length <= 0) return;
      if(!node.innerHTML) return;
      console.log(children);
      node.innerHTML = "";
      for(var a = 0; a < children.length; a++){
        node.appendChild(children[a]);
      }
    }
  }
}

// koviMotes.createEmoteElement = function(word, mod, url, url_fb){
  // if(typeof word == "undefined") return;
  // var html = "";
  // if(word == "koviMote"){
    // word = "(*´・ｖ・)/`";
    // if(typeof(mod) != "undefined" && mod.indexOf("emote64") > -1){
      // mod = mod.replace("emote64", "div64");
    // }
    // var html = "<span class=\"emotewrapper\"><div class=\"" + mod + "\">" + word + "</div></span>";
  // } else {
    // var url_fb = url_fb || null;
    // var onerr = url_fb ? 'this.onerror=null; this.src=\''+ url_fb + '\';' : '';
    // var html = '<span class="emotewrapper"><img draggable="false" class="emote ' + mod + '" alt="' + word + '" src="' + url + '"' + (onerr != '' ? 'onerror="' + onerr + '"' : '') + '/><input onclick=\'quickEmoteMenu.favorite(\"' + word + '\", \"' + url + '\");\' class="fav" title="Favorite!" type="button"></span>';
  // }
  // var element = document.createElement("SPAN");
  // element.outerHTML = html;
  // return element;
// }

koviMotes.createEmoteElement = function(word, mod = "", url, url_fb){
  if(!word) return;
  var span = document.createElement("span");
  span.className = "emotewrapper";
  if(word == "koviMote"){
    word = "(*´・ｖ・)/`";
    var div = document.createElement("div");
    div.className = mod;
    div.innerHTML = word;
    span.appendChild(div);
  } else {
    var img = document.createElement("img");
    img.className = "emote " + mod;
    img.src = url;
    img.onerror = url_fb ? "this.onerror = null; this.src = \"" + url_fb + "\";" : "";
    img.draggable = false;
    span.appendChild(img);
  }
  return span;
}



