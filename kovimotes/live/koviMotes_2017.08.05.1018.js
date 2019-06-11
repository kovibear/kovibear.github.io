koviMotes = koviMotes;
emoteModule = emoteModule;

koviMotes.version = "2017.08.05.1018";

koviMotes.startup = function(){
	var oldStorage = ["KoviMotes","customEmoteLists","customEmoteToggles","customEmoteSettings"];
	for(var a=0;a<oldStorage.length;a++){
		if(typeof localStorage.getItem(oldStorage[a]) != "undefined"){
			localStorage.removeItem(oldStorage[a]);
		};
	};

	var classes = document.createElement("style");
	classes.id = "koviMotesCSS";
	classes.innerHTML = ".emoji {max-height: 32px; height: 32px !important; width: 32px !important;} .reaction .emoji {height: 24px !important; width: 24px !important;} .emote64 {max-height: 64px !important; font-size: 200% !important;} .emoteflipflap {transform: scaleX(-1) scaleY(-1);} .emoteflip, .emotespinflip {transform: scaleX(-1)} .emotespin {animation: 1s emote-spin infinite linear} .emote1spin {animation: 1s emote-spin-reverse infinite linear} .emotespin2 {animation: 0.5s emote-spin infinite linear} .emote2spin {animation: 0.5s emote-spin-reverse infinite linear} .emotespin3 {animation: 0.2s emote-spin infinite linear} .emote3spin {animation: 0.2s emote-spin-reverse infinite linear} .emotepulse {animation: 1s emote-pulse infinite linear} .emotetr {transform: translateX(-3px)} .emotebl {transform: translateY(-3px)} .emotebr {transform: translate(-3px, -3px)} .emoteshake {animation: 1s emote-shake infinite linear} .emoteflap {transform: scaleY(-1) !important} .emoteshake2 {animation: emote-shake2 0.3s linear infinite} .emoteshake3 {animation: emote-shake3 0.1s linear infinite} .emoteshake4 {animation: emote-shake4 0.08s linear infinite} @-webkit-keyframes \"emote-shake2\" {25% {transform: translate(-1px, -1px);} 50% {transform: translate(-1px, 1px);} 75% {transform: translate(1px, 1px);} 75% {transform: translate(1px, -1px);}} @-webkit-keyframes \"emote-shake3\" {25% {transform: translate(-1px, -1px);} 50% {transform: translate(-1px, 1px);} 75% {transform: translate(1px, 1px);} 75% {transform: translate(1px, -1px);}} @-webkit-keyframes \"emote-spin\" {from {transform: rotate(0deg);} to {transform: rotate(360deg);}} @-webkit-keyframes \"emote-spin-reverse\" {from {transform: rotate(0deg);} to {transform: rotate(-360deg);}} @-webkit-keyframes \"emote-pulse\" {0% {-webkit-transform: scale(1, 1);} 50% {-webkit-transform: scale(1.2, 1.2);} 100% {-webkit-transform: scale(1, 1);}} @-webkit-keyframes \"emote-shake\" {10%, 90% {transform: translate3d(-1px, 0, 0);} 20%, 80% {transform: translate3d(2px, 0, 0);} 30%, 50%, 70% {transform: translate3d(-4px, 0, 0);} 40%, 60% {transform: translate3d(4px, 0, 0);}} @-webkit-keyframes \"emote-shake4\" {25% {transform: translate(-4px, 2px);} 50% {transform: translate(4px, -2px);} 75% {transform: translate(-4px, -2px);} 75% {transform: translate(4px, 2px);}}";
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
  if ($(node).hasClass('edited')) return;
  var parent = $(node).parent();
  if (!parent.hasClass("markup") && !parent.hasClass("message-content")) return;

  function inject() {
    var contents = parent.contents();
    contents.each(function(i) {
      if (contents[i] == undefined) return;
      var nodeValue = contents[i].nodeValue;
      if (nodeValue == null) return;
      if (contents[i].nodeType == 8 || contents[i].nodeType == 1) return;
      contents.splice(i, 1);
      var words = nodeValue.split(/([^\s]+)([\s]|$)/g).filter(function(e) {
        return e;
      });
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
        var has_mod = false;
        var skiptwitch = false;
        var skipbttv = false;
        var skipffz = false;
        var skipkovimotes = false;
        var bigemote = false;
        var sw = w;
        if (w.indexOf(":") > -1) {
          var split = w.split(":");
          if (split[0] != "" && split[1] != "") {
            sw = split[0];
            for(i = 1; i < split.length; i++){
              if(allowedClasses.indexOf(split[i]) > -1 && !has_mod){
                emoteClass = settingsCookie["bda-es-8"] ? emoteClass + "emote" + split[i] + " " : "";
                if(split[i] == '64'){
                  bigemote = true;
                }
                else {
                  has_mod = true;
                }
              }
              if(split[i] == 'bttv'){
                skiptwitch = true;
                skipffz = true;
                skipkovimotes = true;
              }
              if(split[i] == 'ffz'){
                skiptwitch = true;
                skipbttv = true;
                skipkovimotes = true;
              }
              if(split[i] == 'koviMotes'){
                skiptwitch = true;
                skipbttv = true;
                skipffz = true;
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
              if(bigemote){
                var url = twitchEmoteUrlStart + emotesTwitch.emotes[sw].image_id + '/4.0';
                var url_fb = twitchEmoteUrlStart + emotesTwitch.emotes[sw].image_id + twitchEmoteUrlEnd;
              }
              else {
                var url = twitchEmoteUrlStart + emotesTwitch.emotes[sw].image_id + twitchEmoteUrlEnd;
                var url_fb = null;
              }
              contents.splice(i + splice++, 0, self.createEmoteElement(sw, url, emoteClass, url_fb));
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
              if(bigemote){
                var url = twitchEmoteUrlStart + subEmotesTwitch[sw] + '/4.0';
                var url_fb = twitchEmoteUrlStart + subEmotesTwitch[sw] + twitchEmoteUrlEnd;
              }
              else {
                var url = twitchEmoteUrlStart + subEmotesTwitch[sw] + twitchEmoteUrlEnd;
                var url_fb = null;
              }
              contents.splice(i + splice++, 0, self.createEmoteElement(sw, url, emoteClass, url_fb));
              doInject = true;
              return;
            }
          }
          if(typeof koviMotes.json !== 'undefined' && !skipkovimotes){
            if(koviMotes.json.emotes.hasOwnProperty(sw)){
              if(text != null){
                contents.splice(i + splice++, 0, document.createTextNode(text));
                text = null;
              }
              var url = koviMotes.json.root + sw + '.' + koviMotes.json.emotes[sw];
              if(skiptwitch && skipbttv && skipffz){
                if(emotesTwitch.emotes.hasOwnProperty(sw) || subEmotesTwitch.hasOwnProperty(sw) || emotesBTTV.hasOwnProperty(sw) || emotesFfz.hasOwnProperty(sw) || emotesBTTV2.hasOwnProperty(sw)){
                  sw = sw + ":koviMotes";
                }
              }
              contents.splice(i + splice++, 0, self.createEmoteElement(sw, url, emoteClass));
              doInject = true;
              return;
            }
          }
          if(sw == 'koviMote' && !skipkovimotes){
            if (text != null) {
              contents.splice(i + splice++, 0, document.createTextNode(text));
              text = null;
            }
            contents.splice(i + splice++, 0, self.createEmoteDiv(sw, emoteClass));
            doInject = true;
            return;
          }
          if ((typeof emotesFfz !== 'undefined' && settingsCookie["bda-es-1"]) && !skipffz) {
            if (emotesFfz.hasOwnProperty(sw) && sw.length >= 4) {
              if (text != null) {
                contents.splice(i + splice++, 0, document.createTextNode(text));
                text = null;
              }
              if(bigemote){
                var url = ffzEmoteUrlStart + emotesFfz[sw] + '/4';
                var url_fb = ffzEmoteUrlStart + emotesFfz[sw] + ffzEmoteUrlEnd;
              }
              else {
                var url = ffzEmoteUrlStart + emotesFfz[sw] + ffzEmoteUrlEnd;
                var url_fb = null;
              }
              if(skiptwitch && skipbttv && skipkovimotes){
                if(emotesTwitch.emotes.hasOwnProperty(sw) || subEmotesTwitch.hasOwnProperty(sw) || emotesBTTV.hasOwnProperty(sw) || emotesBTTV2.hasOwnProperty(sw) || koviMotes.json.emotes.hasOwnProperty(sw)){
                  sw = sw + ":ffz";
                }
              }
              contents.splice(i + splice++, 0, self.createEmoteElement(sw, url, emoteClass, url_fb));
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
              if(bigemote){
                var url = emotesBTTV[sw].replace(/\/1x/, '/3x');
                var url_fb = emotesBTTV[sw];
              }
              else {
                var url = emotesBTTV[sw];
                var url_fb = null;
              }
              // var url = bigemote ? emotesBTTV[sw].replace(/\/1x/, '/3x') : emotesBTTV[sw];
              if(skiptwitch && skipffz && skipkovimotes){
                if(emotesTwitch.emotes.hasOwnProperty(sw) || subEmotesTwitch.hasOwnProperty(sw) || emotesFfz.hasOwnProperty(sw) || koviMotes.json.emotes.hasOwnProperty(sw)){
                  sw = sw + ":bttv";
                }
              }
              contents.splice(i + splice++, 0, self.createEmoteElement(sw, url, emoteClass, url_fb));
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
              if(bigemote){
                var url = bttvEmoteUrlStart + emotesBTTV2[sw] + '/3x';
                var url_fb = bttvEmoteUrlStart + emotesBTTV2[sw] + bttvEmoteUrlEnd;
              }
              else {
                var url = bttvEmoteUrlStart + emotesBTTV2[sw] + bttvEmoteUrlEnd;
                var url_fb = null;
              }
              if(skiptwitch && skipffz && skipkovimotes){
                if(emotesTwitch.emotes.hasOwnProperty(sw) || subEmotesTwitch.hasOwnProperty(sw) || emotesFfz.hasOwnProperty(sw) || koviMotes.json.emotes.hasOwnProperty(sw)){
                  sw = sw + ":bttv";
                }
              }
              contents.splice(i + splice++, 0, self.createEmoteElement(sw, url, emoteClass, url_fb));
              doInject = true;
              return;
            }
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
  if (parent.children().hasClass("edited")) {
    setTimeout(inject, 100);
  }
  else {
    inject();
  }
};

emoteModule.createEmoteElement = function(word, url, mod, url_fb) {
  var len = Math.round(word.length / 4);
  var name = word.substr(0, len) + "\uFDD9" + word.substr(len, len) + "\uFDD9" + word.substr(len * 2, len) + "\uFDD9" + word.substr(len * 3);
  var url_fb = url_fb || null;
  var onerr = url_fb ? 'this.onerror=null; this.src=\''+ url_fb + '\';' : '';
  var html = '<span class="emotewrapper"><img draggable="false" style="max-height:32px;" class="emote ' + mod + '" alt="' + name + '" src="' + url + '"' + (onerr != '' ? 'onerror="' + onerr + '"' : '') + '/><input onclick=\'quickEmoteMenu.favorite(\"' + name + '\", \"' + url + '\");\' class="fav" title="Favorite!" type="button"></span>';
  return $.parseHTML(html.replace(new RegExp("\uFDD9","g"), ""))[0];
};

emoteModule.createEmoteDiv = function(word, mod) {
  if(word == 'koviMote'){
    word = "(*´・ｖ・)/`";
  }
  var len = Math.round(word.length / 4);
  var name = word.substr(0, len) + "\uFDD9" + word.substr(len, len) + "\uFDD9" + word.substr(len * 2, len) + "\uFDD9" + word.substr(len * 3);
  var html = '<span class="emotewrapper"><div style="max-height:32px;" class="' + mod + '">' + name + '</div></span>';
  return $.parseHTML(html.replace(new RegExp("\uFDD9","g"), ""))[0];
}

/* temporary fix for broken emote picker */

quickEmoteMenu = quickEmoteMenu;
if(typeof(quickEmoteMenu != 'undefined')){
  quickEmoteMenu.switchQem = function(id){
    var twitch = $("#bda-qem-twitch");
    var fav = $("#bda-qem-favourite");
    var emojis = $("#bda-qem-emojis");
    twitch.removeClass("active");
    fav.removeClass("active");
    emojis.removeClass("active");
    $(".emoji-picker").hide();
    $("#bda-qem-favourite-container").hide();
    $("#bda-qem-twitch-container").hide();
    switch (id) {
    case "bda-qem-twitch":
        twitch.addClass("active");
        $("#bda-qem-twitch-container").show();
        break;
    case "bda-qem-favourite":
        fav.addClass("active");
        $("#bda-qem-favourite-container").show();
        break;
    case "bda-qem-emojis":
        emojis.addClass("active");
        $(".emoji-picker").show();
        break;
    }
    this.lastTab = id;
    var emoteIcon = $(".emote-icon");
    emoteIcon.off();
    emoteIcon.on("click", function() {
        var emote = $(this).attr("title");
        var ta = $(".channel-text-area-default textarea");
        ta.val(ta.val().slice(-1) == " " ? ta.val() + emote : ta.val() + " " + emote);
    });
  };
};

/* manual emote additions (non-kovimotes) */
var manual_emotes = {};
/* twitch sub */
subEmotesTwitch = subEmotesTwitch || {};
manual_emotes['sub'] = {
  'sheriffDANCE': 319928,
  'sheriffDANCE2': 332315,
  'sheriffDANCE3': 332316,
  'finkoneLUL': 325297,
};
for(var k in manual_emotes['sub']){
  if(typeof(subEmotesTwitch[k]) == 'undefined'){
    subEmotesTwitch[k] = manual_emotes['sub'][k];
  };
};