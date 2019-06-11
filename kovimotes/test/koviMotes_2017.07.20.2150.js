koviMotes = koviMotes;
emoteModule = emoteModule;

koviMotes.version = "2017.07.20.2100";

koviMotes.startup = function(){
	var oldStorage = ["KoviMotes","customEmoteLists","customEmoteToggles","customEmoteSettings"];
	for(var a=0;a<oldStorage.length;a++){
		if(typeof localStorage.getItem(oldStorage[a]) != "undefined"){
			localStorage.removeItem(oldStorage[a]);
		};
	};

	var classes = document.createElement("style");
	classes.id = "koviMotesCSS";
	classes.innerHTML = ".emoji {max-height: 32px; height: auto !important; width: auto !important;} .emote64 {max-height: 64px !important; font-size: 200% !important;} .emoteflipflap {transform: scaleX(-1) scaleY(-1);} .emoteflip, .emotespinflip {transform: scaleX(-1)} .emotespin {animation: 1s emote-spin infinite linear} .emote1spin {animation: 1s emote-spin-reverse infinite linear} .emotespin2 {animation: 0.5s emote-spin infinite linear} .emote2spin {animation: 0.5s emote-spin-reverse infinite linear} .emotespin3 {animation: 0.2s emote-spin infinite linear} .emote3spin {animation: 0.2s emote-spin-reverse infinite linear} .emotepulse {animation: 1s emote-pulse infinite linear} .emotetr {transform: translateX(-3px)} .emotebl {transform: translateY(-3px)} .emotebr {transform: translate(-3px, -3px)} .emoteshake {animation: 1s emote-shake infinite linear} .emoteflap {transform: scaleY(-1) !important} .emoteshake2 {animation: emote-shake2 0.3s linear infinite} .emoteshake3 {animation: emote-shake3 0.1s linear infinite} .emoteshake4 {animation: emote-shake4 0.08s linear infinite} @-webkit-keyframes \"emote-shake2\" {25% {transform: translate(-1px, -1px);} 50% {transform: translate(-1px, 1px);} 75% {transform: translate(1px, 1px);} 75% {transform: translate(1px, -1px);}} @-webkit-keyframes \"emote-shake3\" {25% {transform: translate(-1px, -1px);} 50% {transform: translate(-1px, 1px);} 75% {transform: translate(1px, 1px);} 75% {transform: translate(1px, -1px);}} @-webkit-keyframes \"emote-spin\" {from {transform: rotate(0deg);} to {transform: rotate(360deg);}} @-webkit-keyframes \"emote-spin-reverse\" {from {transform: rotate(0deg);} to {transform: rotate(-360deg);}} @-webkit-keyframes \"emote-pulse\" {0% {-webkit-transform: scale(1, 1);} 50% {-webkit-transform: scale(1.2, 1.2);} 100% {-webkit-transform: scale(1, 1);}} @-webkit-keyframes \"emote-shake\" {10%, 90% {transform: translate3d(-1px, 0, 0);} 20%, 80% {transform: translate3d(2px, 0, 0);} 30%, 50%, 70% {transform: translate3d(-4px, 0, 0);} 40%, 60% {transform: translate3d(4px, 0, 0);}} @-webkit-keyframes \"emote-shake4\" {25% {transform: translate(-4px, 2px);} 50% {transform: translate(4px, -2px);} 75% {transform: translate(-4px, -2px);} 75% {transform: translate(4px, 2px);}}";
	document.head.appendChild(classes);

	if(typeof koviMotes.version != "undefined" && typeof koviMotes.json.version != "undefined" && emoteModule != 'undefined'){
		console.log("koviMotes.js","v"+koviMotes.version,"is running and using koviMotes.json v"+koviMotes.json.version);
    var wrappers = document.getElementsByClassName('messages-wrapper');
    if(typeof wrappers != 'undefined' && wrappers.length > 0){
      for(var a=0; a < wrappers.length; a++){
        var wrapper = wrappers[a];
        var messages = emoteModule.getNodes(wrapper);
        if(typeof messages != 'undefined' && messages.length > 0){
          for(var b = 0; b < messages.length; b++){
            var message = messages[b];
            setTimeout(emoteModule.injectEmote, 100, message);
          }
        }
      }
    }
  }
	else {
		console.log("koviMotes was unable to start.");
		return;
	};
};

emoteModule.mods = ["flip", "spin", "pulse", "spin2", "spin3", "1spin", "2spin", "3spin", "tr", "bl", "br", "shake", "shake2", "shake3", "flap", "flipflap", "shake4", "64"];

emoteModule.injectEmote = function(node) {
  var self = emoteModule;
  if (!node.parentElement) return;
  var parent = $(node).parent();
  if (!parent.hasClass("markup") && !parent.hasClass("message-content")) return;

  function inject() {
    var contents = parent.contents();
    contents.each(function(i) {
      if (contents[i] == undefined) return;
      var isEmoji = false;
      if(contents[i].className && contents[i].className == 'emoji'){
        isEmoji = true;
      }
      var nodeValue = contents[i].nodeValue;
      if (nodeValue == null && !isEmoji) return;
      if (contents[i].nodeType == 8) return;
      contents.splice(i, 1);
      if(nodeValue != 'undefined'){
        var words = nodeValue.split(/([^\s]+)([\s]|$)/g).filter(function(e) {
          return e;
        });
      }
      var splice = 0;
      var doInject = false;
      var text = null;
      words.forEach(function(w, index, a) {
        if (w.indexOf("[!s]") > -1) {
          w = w.replace("[!s]", "");
          parent.data("spoilered", false);
          parent.addClass("spoiler");
        }
        var allowedClasses = self.mods;
        var useEmoteClass = false;
        var emoteClass = "";
        var skiptwitch = false;
        var skipffz = false;
        var skipbttv = false;
        var bigemote = false;
        var sw = w;
        if (w.indexOf(":") > -1) {
          var split = w.split(":");
          if (split[0] != "" && split[1] != "") {
            sw = split[0];
            for(i = 1; i < split.length; i++){
              if(allowedClasses.indexOf(split[i]) > -1){
                emoteClass = settingsCookie["bda-es-8"] ? emoteClass + "emote" + split[i] + " " : "";
              }
              if(split[i] == 'bttv'){
                skipffz = true;
              }
              if(split[i] == 'koviMotes'){
                skiptwitch = true;
                skipffz = true;
                skipbttv = true;
              }
              if(split[i] == '64'){
                bigemote = true;
              }
            }
          }
        }
        if ($.inArray(sw, bemotes) == -1) {
          if (typeof emotesTwitch !== 'undefined' && settingsCookie["bda-es-7"] && !skiptwitch) {
            if (emotesTwitch.emotes.hasOwnProperty(sw) && sw.length >= 4) {
              if (text != null) {
                contents.splice(i + splice++, 0, document.createTextNode(text));
                text = null;
              }
              var size = bigemote ? "/4.0" : twitchEmoteUrlEnd;
              var url = twitchEmoteUrlStart + emotesTwitch.emotes[sw].image_id + size;
              contents.splice(i + splice++, 0, self.createEmoteElement(sw, url, emoteClass));
              doInject = true;
              return;
            }
          }
          if (typeof subEmotesTwitch !== 'undefined' && settingsCookie["bda-es-7"] && !skiptwitch) {
            if (subEmotesTwitch.hasOwnProperty(sw) && sw.length >= 4) {
              if (text != null) {
                contents.splice(i + splice++, 0, document.createTextNode(text));
                text = null;
              }
              var size = bigemote ? "/4.0" : twitchEmoteUrlEnd;
              var url = twitchEmoteUrlStart + subEmotesTwitch[sw] + size;
              contents.splice(i + splice++, 0, self.createEmoteElement(sw, url, emoteClass));
              doInject = true;
              return;
            }
          }
          if (typeof emotesBTTV !== 'undefined' && settingsCookie["bda-es-2"] && !skipbttv) {
            if (emotesBTTV.hasOwnProperty(sw) && sw.length >= 4) {
              if (text != null) {
                contents.splice(i + splice++, 0, document.createTextNode(text));
                text = null;
              }
              var url = bigemote ? emotesBTTV[sw].replace(/\/1x/, '/3x') : emotesBTTV[sw];
              contents.splice(i + splice++, 0, self.createEmoteElement(sw, url, emoteClass));
              doInject = true;
              return;
            }
          }
          if ((typeof emotesFfz !== 'undefined' && settingsCookie["bda-es-1"]) && (!skipffz || !emotesBTTV2.hasOwnProperty(sw))) {
            if (emotesFfz.hasOwnProperty(sw) && sw.length >= 4) {
              if (text != null) {
                contents.splice(i + splice++, 0, document.createTextNode(text));
                text = null;
              }
              var size = bigemote ? "/4" : ffzEmoteUrlEnd;
              var url = ffzEmoteUrlStart + emotesFfz[sw] + size;
              contents.splice(i + splice++, 0, self.createEmoteElement(sw, url, emoteClass));
              doInject = true;
              return;
            }
          }
          if (typeof emotesBTTV2 !== 'undefined' && settingsCookie["bda-es-2"] && !skipbttv) {
            if (emotesBTTV2.hasOwnProperty(sw) && sw.length >= 4) {
              if (text != null) {
                contents.splice(i + splice++, 0, document.createTextNode(text));
                text = null;
              }
              var size = bigemote ? "/3x" : bttvEmoteUrlEnd;
              var url = bttvEmoteUrlStart + emotesBTTV2[sw] + size;
              if (skipffz && emotesFfz.hasOwnProperty(sw)) sw = sw + ":bttv";
              contents.splice(i + splice++, 0, self.createEmoteElement(sw, url, emoteClass));
              doInject = true;
              return;
            }
          }
          if(typeof koviMotes.json !== 'undefined'){
            if(koviMotes.json.emotes.hasOwnProperty(sw)){
              if(text != null){
                contents.splice(i + splice++, 0, document.createTextNode(text));
                text = null;
              }
              var url = koviMotes.json.root + sw + '.' + koviMotes.json.emotes[sw];
              if(skiptwitch && skipbttv && skipffz){
                if(emotesTwitch.hasOwnProperty(sw) || subEmotesTwitch.hasOwnProperty(sw) || emotesBTTV.hasOwnProperty(sw) || emotesFfz.hasOwnProperty(sw) || emotesBTTV2.hasOwnProperty(sw)){
                  sw = sw + ":koviMotes";
                }
              }
              contents.splice(i + splice++, 0, self.createEmoteElement(sw, url, emoteClass));
              doInject = true;
              return;
            }
          }
          if(sw == 'koviMote'){
            contents.splice(i + splice++, 0, self.createEmoteDiv(sw, emoteClass));
            doInject = true;
            return;
          }
        }
        if (text == null) {
          text = w;
        } else {
          text += "" + w;
        }
        if (index === a.length - 1) {
          contents.splice(i + splice, 0, document.createTextNode(text));
        }
      });
      if (doInject) {
        var oldHeight = $(parent).parent().parent().parent().outerHeight();
        var scrollPane = $(".scroller.messages")[0];
        parent.html(contents);
        setTimeout(function(){
          var newHeight = $(parent).parent().parent().parent().outerHeight();
          scrollPane.scrollTop = scrollPane.scrollTop + (newHeight - oldHeight);
        }, 25, parent, oldHeight, scrollPane);
      }
    });
  }
  inject();
  if (parent.children().hasClass("edited")) {
    setTimeout(inject, 250);
  }
};

emoteModule.createEmoteDiv = function(word, mod) {
  if(word == 'koviMote'){
    word = "(*´・ｖ・)/`";
  }
  var html = '<span class="emotewrapper"><div style="max-height:32px;" class="' + mod + '">' + word + '</div></span>';
  return $.parseHTML(html.replace(new RegExp("\uFDD9","g"), ""))[0];
}