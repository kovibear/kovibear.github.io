koviMotes = koviMotes;
emoteModule = emoteModule;

koviMotes.version = '2018.04.19.1135';

koviMotes.setup = function(){
	var oldStorage = ['KoviMotes', 'customEmoteLists', 'customEmoteToggles', 'customEmoteSettings'];
	for(var a = 0; a < oldStorage.length; a++){
		if(typeof localStorage.getItem(oldStorage[a]) != 'undefined'){
			localStorage.removeItem(oldStorage[a]);
		};
	};

	var emotecss = document.createElement('style');
	emotecss.id = 'koviMotes.EmoteCSS';
	emotecss.innerHTML = '\
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
  @-webkit-keyframes "emote-spin" {from {transform: rotate(0deg);} to {transform: rotate(360deg);}}\
  @-webkit-keyframes "emote-spin-reverse" {from {transform: rotate(0deg);} to {transform: rotate(-360deg);}}\
  @-webkit-keyframes "emote-pulse" {0% {-webkit-transform: scale(1,1);} 50% {-webkit-transform: scale(1.2,1.2);} 100% {-webkit-transform: scale(1,1);}}\
  @-webkit-keyframes "emote-shake" {10%, 90% {transform: translate3d(-1px,0,0);} 20%, 80% {transform: translate3d(2px,0,0);} 30%, 50%, 70% {transform: translate3d(-4px,0,0);} 40%, 60% {transform:translate3d(4px,0,0);}}\
  @-webkit-keyframes "emote-shake2" {25% {transform: translate(-1px,-1px);} 50% {transform: translate(-1px,1px);} 75% {transform: translate(1px,1px);} 100% {transform: translate(1px,-1px);}}\
  @-webkit-keyframes "emote-shake3" {25% {transform: translate(-1px,-1px);} 50% {transform: translate(-1px,1px);} 75% {transform: translate(1px,1px);} 100% {transform: translate(1px,-1px);}}\
  @-webkit-keyframes "emote-shake4" {25% {transform: translate(-4px,2px);} 50% {transform: translate(4px,-2px);} 75% {transform: translate(-4px,-2px);} 100%{transform:translate(4px,2px);}}\
  ';
	document.head.appendChild(emotecss);
  
  var emojipickercss = document.createElement('style');
  emojipickercss.id = 'koviMotes.EmojiPickerCSS';
  emojipickercss.innerHTML = '\
  [class*="emojiPicker"] {box-shadow: none; border-top: none; border-radius: 0 0 5px 5px;}\
  .bda-dark [class*="emojiPicker"] {background-color: #353535;}\
  .bda-dark [class*="emojiPicker"] .category {background-color: #353535;}\
  .bda-dark [class*="emojiPicker"] [class*="header"] {background-color: #2B2B2B;}\
  .bda-dark [class*="emojiPicker"] [class*="header"] .search-bar {background-color: #2B2B2B;}\
  .bda-dark [class*="emojiPicker"] .search-bar input {color: #FFF;}\
  .bda-dark [class*="emojiPicker"] .search-bar input::-webkit-input-placeholder {color: #FFF;}\
  .bda-dark [class*="emojiPicker"] [class*="scroller"] [class*="stickyHeader"] {background-color: #353535;}\
  .bda-dark [class*="emojiPicker"] [class*="scroller"] [class*="emojiItem"][class*="selected"] {background: rgba(123, 123, 123, 0.37); background-size: contain; background-repeat: no-repeat; background-position: 50%;}\
  .bda-dark [class*="emojiPicker"] [class*="dimmer"][class*="visible"] {background-color: rgba(62, 62, 62, 0.65);}\
  .bda-dark [class*="emojiPicker"] [class*="header"] [class*="diversitySelector"] [class*="popout"] {background: #353535; border-color: #202020; z-index: 2; width: 99%; height: 91%;}\
  .bda-dark [class*="emojiPicker"] [class*="premiumPromo"] {background-color: #353535;}\
  .bda-dark [class*="emojiPicker"] [class*="scroller"]::-webkit-scrollbar, .bda-dark [class*="emojiPicker"] [class*="scroller"]::-webkit-scrollbar-track, .bda-dark [class*="emojiPicker"] [class*="scroller"]::-webkit-scrollbar-track-piece {background-color: #303030 !important; border-color: #303030 !important;}\
  .bda-dark #bda-qem-twitch-container [class*="scroller"]::-webkit-scrollbar-thumb, .bda-dark #bda-qem-favourite-container [class*="scroller"]::-webkit-scrollbar-thumb, .bda-dark [class*="emojiPicker"] [class*="scroller"]::-webkit-scrollbar-thumb, .bda-dark #pubs-container [class*="scroller"]::-webkit-scrollbar-thumb {border-color: #202020 !important; background-color: #202020 !important}\
  ';
  document.head.appendChild(emojipickercss);
  
  console.log('[koviMotes] Started downloading emote lists.');
  
  twitchEmoteUrlStart = "https://static-cdn.jtvnw.net/emoticons/v1/";
  twitchEmoteUrlEnd = "/1.0";
  ffzEmoteUrlStart = "https://cdn.frankerfacez.com/emoticon/";
  ffzEmoteUrlEnd = "/1";
  bttvEmoteUrlStart = "https://cdn.betterttv.net/emote/";
  bttvEmoteUrlEnd = "/1x";
  
  bdEmotes = {}
  bdEmotes['Twitch'] = {};
  if(typeof(emotesTwitch) != "undefined"){
    for(var emote in emotesTwitch){
      if(typeof(bdEmotes['Twitch'][emote]) == "undefined"){
        bdEmotes['Twitch'][emote] = emotesTwitch[emote]['id'];
      }
    }
  }
  if(typeof(subEmotesTwitch) != "undefined"){
    for(var emote in subEmotesTwitch){
      if(typeof(bdEmotes['Twitch'][emote]) == "undefined"){
        bdEmotes['Twitch'][emote] = subEmotesTwitch[emote];
      }
    }
  }
  $.getJSON('https://raw.githubusercontent.com/rauenzi/BetterDiscordApp/master/data/emotedata_twitch_subscriber.json')
    .done(function(data){
      if(typeof(data) != 'undefined'){
        for(var emote in data){
          if(typeof(bdEmotes['Twitch'][emote]) == "undefined"){
            bdEmotes['Twitch'][emote] = data[emote];
          }
        }
      }
      else {
        return false;
      }
    })
    .fail(function(xhr, settings, exception){
      console.log('[koviMotes] could not retrieve Twitch emote list.');
    })
  bdEmotes['FrankerFaceZ'] = {}
  if(typeof(emotesFfz) != "undefined"){
    for(var emote in emotesFfz){
      if(typeof(bdEmotes['FrankerFaceZ'][emote]) == "undefined"){
        bdEmotes['FrankerFaceZ'][emote] = emotesFfz[emote];
      }
    }
  }
  $.getJSON('https://raw.githubusercontent.com/rauenzi/BetterDiscordApp/master/data/emotedata_ffz.json')
    .done(function(data){
      if(typeof(data) != 'undefined'){
        for(var emote in data){
          if(typeof(bdEmotes['FrankerFaceZ'][emote]) == 'undefined'){
            bdEmotes['FrankerFaceZ'][emote] = data[emote];
          }
        }
      }
      else {
        return false;
      }
    })
    .fail(function(xhr, settings, exception){
      console.log('[koviMotes] could not retrieve FrankerFaceZ emote list.');
    })
  bdEmotes['BTTV'] = {};
  if(typeof(emotesBTTV) != "undefined"){
    for(var emote in emotesBTTV){
      if(typeof(bdEmotes['BTTV'][emote]) == "undefined"){
        bdEmotes['BTTV'][emote] = emotesBTTV[emote].match(/\/emote\/(\w*)\/1x/)[1];
      }
    }
  }
  if(typeof(emotesBTTV2) != "undefined"){
    for(var emote in emotesBTTV2){
      if(typeof(bdEmotes['BTTV'][emote]) == "undefined"){
        bdEmotes['BTTV'][emote] = emotesBTTV2[emote];
      }
    }
  }
  $.getJSON('https://raw.githubusercontent.com/rauenzi/BetterDiscordApp/master/data/emotedata_bttv.json')
    .done(function(data){
      if(typeof(data) != 'undefined'){
        for(var emote in data){
          if(typeof(bdEmotes['BTTV'][emote]) == 'undefined'){
            bdEmotes['BTTV'][emote] = data[emote];
          }
        }
      }
      else {
        return false;
      }
    })
    .fail(function(xhr, settings, exception){
      console.log('[koviMotes] could not retrieve BetterTwitchTV emote list.');
    })
  bemotes = bemotes || [];
  $.getJSON('https://raw.githubusercontent.com/rauenzi/BetterDiscordApp/master/data/emotefilter.json')
    .done(function(data){
      if(typeof(data) != 'undefined' && typeof(data['blacklist']) != 'undefined'){
        for(var i; i < data['blacklist'].length; i++){
          if(bemotes.indexOf(data['blacklist'][i]) == -1){
            bemotes.push(data['blacklist'][i]);
          }
        }
      }
    })
    .fail(function(xhr, settings, exception){
      console.log('[koviMotes] could not retrieve Blacklisted emote list.');
    })
  
  console.log('[koviMotes] Finished downloading emote lists.');

  koviMotes.addEmotes();
}

koviMotes.startup = function(){
  console.log('[koviMotes] is starting..');
	koviMotes.setup();

	if(typeof koviMotes.version != 'undefined' && typeof koviMotes.json.version != 'undefined' && emoteModule != 'undefined'){
		console.log('[koviMotes]','v'+koviMotes.version,'is running and using json','v'+koviMotes.json.version);
    var wrappers = document.getElementsByClassName('messages-wrapper');
    if(typeof wrappers != 'undefined' && wrappers.length > 0){
      for(var a = 0; a < wrappers.length; a++){
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
		console.log('[koviMotes] encountered an error on startup and is unable to run.');
		return;
	};
};

koviMotes.update = function(){
}

koviMotes.addEmotes = function(){
  var emotes_twitch = {
    'tpZedd': 158843,
    'tpYGOyugiboy': 535289,
    'tpYGOyugi': 535264,
    'tpYGOtrapcard': 535287,
    'tpYGOpuzzle': 535263,
    'tpYGOpotofgreed': 535337,
    'tpYGOobliterated': 535286,
    'tpYGOkuriboh': 535285,
    'tpYGOddduel': 535265,
    'tpYGOcreepy': 535284,
    'tpYellow': 155669,
    'tpWhite': 156910,
    'tpSquatt': 158842,
    'tpShirome': 606808,
    'tpRWBYyang': 508670,
    'tpRWBYweiss': 508669,
    'tpRWBYruby': 508667,
    'tpRWBYren': 508665,
    'tpRWBYpyrrha': 508664,
    'tpRWBYnora': 508663,
    'tpRWBYjaune': 508661,
    'tpRWBYblake': 508658,
    'tpRed': 155668,
    'tpPink': 155667,
    'tpNasus': 158840,
    'tpMagao': 606805,
    'tpLokar': 158841,
    'tpKyawawa': 606797,
    'tpKtkr': 606807,
    'tpKaibasurp': 535280,
    'tpKaibarules': 535262,
    'tpKaibalolz': 535277,
    'tpJoeyglare': 535261,
    'tpHimev': 352049,
    'tpHimestars': 347531,
    'tpHimefrown': 347528,
    'tpHimeburger': 352047,
    'tpHeresTommy': 156377,
    'tpGreen': 156382,
    'tpGG': 156906,
    'tpFX1': 156905,
    'tpFufun': 508653,
    'tpFree': 155671,
    'tpExodialegR': 535274,
    'tpExodialegL': 535275,
    'tpExodiaface': 535272,
    'tpExodiaarmR': 535268,
    'tpExodiaarmL': 535269,
    'tpDonBiki': 508656,
    'tpBulk': 158838,
    'tpBlue': 155666,
    'tpBLBLBL': 156907,
    'tpBlack': 155665,
    'tpBaboo': 158837,
    'tpAIYIYI': 156904,
    'rooNya': 925343
  }
  bdEmotes = bdEmotes || {};
  bdEmotes['Twitch'] = bdEmotes['Twitch'] || {};
  for(var emote in emotes_twitch){
    bdEmotes['Twitch'][emote] = emotes_twitch[emote]
  }
}

emoteModule.mods = ['flip', 'spin', 'pulse', 'spin2', 'spin3', '1spin', '2spin', '3spin', 'tr', 'bl', 'br', 'shake', 'shake2', 'shake3', 'flap', 'flipflap', 'shake4', '64'];
koviMotes.poopmotes = ['twerkDAB'];

emoteModule.injectEmote = function(node) {
  var self = emoteModule;
  if (!node.parentElement) return;
  if ($(node).hasClass('edited')) return;
  var parent = $(node).parent();
  if (!parent.hasClass('markup') && !parent.hasClass('message-content')) return;

  function inject() {
    var contents = parent.contents();
    for(a = 0; a < contents.length; a++){
      if(typeof(contents[a]) == 'undefined' || contents[a].nodeType != 3) continue;
      var curr_node = contents[a];
      var nodeValue = contents[a].nodeValue;
      if(nodeValue == null) continue;
      contents.splice(a, 1);
      var words = nodeValue.split(/([^\s]+)([\s]|$)/g).filter(function(e) {
        return e;
      });
      var splice = 0;
      var doInject = false;
      var text = null;
      var allowedClasses = self.mods;
      for(b = 0; b < words.length; b++){
        var w = words[b];
        if (w.indexOf('[!s]') > -1) {
          w = w.replace('[!s]', '');
          parent.data('spoilered', false);
          parent.addClass('spoiler');
        }
        var emoteClass = '';
        var has_mod = false;
        var skiptwitch = false;
        var skipbttv = false;
        var skipffz = false;
        var skipkovimotes = false;
        var bigemote = false;
        var sw = w;
        if(w.indexOf(':') > -1) {
          var split = w.split(':');
          if(split[0] != '' && split[1] != '') {
            sw = split[0];
            for(var c = 1; c < split.length; c++){
              if(allowedClasses.indexOf(split[c]) > -1 && !has_mod){
                emoteClass = settingsCookie['bda-es-8'] ? emoteClass + 'emote' + split[c] + ' ' : '';
                if(split[c] == '64'){
                  bigemote = true;
                }
                else {
                  has_mod = true;
                }
              }
              if(split[c] == 'twitch'){
                skipbttv = true;
                skipffz = true;
                skipkovimotes = true;
              }
              if(split[c] == 'bttv'){
                skiptwitch = true;
                skipffz = true;
                skipkovimotes = true;
              }
              if(split[c] == 'ffz'){
                skiptwitch = true;
                skipbttv = true;
                skipkovimotes = true;
              }
              if(split[c] == 'koviMotes'){
                skiptwitch = true;
                skipbttv = true;
                skipffz = true;
              }
            }
          }
          if(w.indexOf(':') == 0){
            if(typeof $(curr_node).prev() !== 'undefined' && $(curr_node).prev().hasClass('emoji')){
              for(var c = 1; c < split.length; c++){
                if(allowedClasses.indexOf(split[c]) > -1 && !has_mod){
                  emoteClass = settingsCookie['bda-es-8'] ? emoteClass + 'emote' + split[c] + ' ' : '';
                  if(split[c] == '64'){
                    bigemote = true;
                  }
                  else {
                    has_mod = true;
                  }
                }
              }
              $(curr_node).prev().addClass(emoteClass);
              w = '';
              sw = '';
              doInject = true;
              continue;
            }
          }
        }
        if ($.inArray(sw, bemotes) == -1) {
          if (typeof bdEmotes['Twitch'] !== 'undefined' && settingsCookie['bda-es-7'] && !skiptwitch) {
            if (bdEmotes['Twitch'].hasOwnProperty(sw) && sw.length >= 4) {
              if (text != null) {
                contents.splice(a + splice++, 0, document.createTextNode(text));
                text = null;
              }
              if(bigemote){
                var url = twitchEmoteUrlStart + bdEmotes['Twitch'][sw] + twitchEmoteUrlEnd.replace(/\/1\.0$/, '/4.0');
                var url_fb = twitchEmoteUrlStart + bdEmotes['Twitch'][sw] + twitchEmoteUrlEnd;
              }
              else {
                var url = twitchEmoteUrlStart + bdEmotes['Twitch'][sw] + twitchEmoteUrlEnd;
                var url_fb = null;
              }
              if(skipbttv && skipffz && skipkovimotes){
                if(koviMotes.json.emotes.hasOwnProperty(sw) || bdEmotes['FrankerFaceZ'].hasOwnProperty(sw) || bdEmotes['BTTV'].hasOwnProperty(sw)){
                  sw = sw + ":twitch";
                }
              }
              contents.splice(a + splice++, 0, self.createEmoteElement(sw, emoteClass, url, url_fb));
              doInject = true;
              continue;
            }
          }
          if(typeof koviMotes.json !== 'undefined' && !skipkovimotes){
            if(koviMotes.json.emotes.hasOwnProperty(sw)){
              if(text != null){
                contents.splice(a + splice++, 0, document.createTextNode(text));
                text = null;
              }
              var url = koviMotes.json.root + sw + '.' + koviMotes.json.emotes[sw];
              if(skiptwitch && skipbttv && skipffz){
                if(bdEmotes['Twitch'].hasOwnProperty(sw) || bdEmotes['FrankerFaceZ'].hasOwnProperty(sw) || bdEmotes['BTTV'].hasOwnProperty(sw)){
                  sw = sw + ":koviMotes";
                }
              }
              contents.splice(a + splice++, 0, self.createEmoteElement(sw, emoteClass, url));
              doInject = true;
              continue;
            }
            if(sw == 'koviMote'){
              if(text != null){
                contents.splice(a + splice++, 0, document.createTextNode(text));
                text = null;
              }
              contents.splice(a + splice++, 0, self.createEmoteElement(sw, emoteClass));
              doInject = true;
              continue;
            }
          }
          if ((typeof bdEmotes['FrankerFaceZ'] !== 'undefined' && settingsCookie["bda-es-1"]) && !skipffz) {
            if (bdEmotes['FrankerFaceZ'].hasOwnProperty(sw) && sw.length >= 4) {
              if (text != null) {
                contents.splice(a + splice++, 0, document.createTextNode(text));
                text = null;
              }
              if(bigemote){
                var url = ffzEmoteUrlStart + bdEmotes['FrankerFaceZ'][sw] + ffzEmoteUrlEnd.replace(/\/1$/, '/4');
                var url_fb = ffzEmoteUrlStart + bdEmotes['FrankerFaceZ'][sw] + ffzEmoteUrlEnd;
              }
              else {
                var url = ffzEmoteUrlStart + bdEmotes['FrankerFaceZ'][sw] + ffzEmoteUrlEnd;
                var url_fb = null;
              }
              if(skiptwitch && skipbttv && skipkovimotes){
                if(bdEmotes['Twitch'].hasOwnProperty(sw) || koviMotes.json.emotes.hasOwnProperty(sw) || bdEmotes['BTTV'].hasOwnProperty(sw)){
                  sw = sw + ":ffz";
                }
              }
              contents.splice(a + splice++, 0, self.createEmoteElement(sw, emoteClass, url, url_fb));
              doInject = true;
              continue;
            }
          }
          if (typeof bdEmotes['BTTV'] !== 'undefined' && settingsCookie["bda-es-2"] && !skipbttv) {
            if (bdEmotes['BTTV'].hasOwnProperty(sw) && sw.length >= 4) {
              if (text != null) {
                contents.splice(a + splice++, 0, document.createTextNode(text));
                text = null;
              }
              if(bigemote){
                var url = bttvEmoteUrlStart + bdEmotes['BTTV'][sw] + bttvEmoteUrlEnd.replace(/\/1x$/, '/3x');
                var url_fb = bttvEmoteUrlStart + bdEmotes['BTTV'][sw] + bttvEmoteUrlEnd;
              }
              else {
                var url = bttvEmoteUrlStart + bdEmotes['BTTV'][sw] + bttvEmoteUrlEnd;
                var url_fb = null;
              }
              if(skiptwitch && skipffz && skipkovimotes){
                if(bdEmotes['Twitch'].hasOwnProperty(sw) || koviMotes.json.emotes.hasOwnProperty(sw) || bdEmotes['FrankerFaceZ'].hasOwnProperty(sw)){
                  sw = sw + ":bttv";
                }
              }
              contents.splice(a + splice++, 0, self.createEmoteElement(sw, emoteClass, url, url_fb));
              doInject = true;
              continue;
            }
          }
        }
        if (text == null) {
          text = w;
        } else {
          text += '' + w;
        }
        if (b === words.length - 1) {
          contents.splice(a + splice, 0, document.createTextNode(text));
        }
      }
      if(doInject) {
        var oldHeight = $(parent).parent().parent().parent().outerHeight();
        var scrollPane = $(".scroller.messages")[0];
        parent.html(contents);
        setTimeout(function(){
          var newHeight = $(parent).parent().parent().parent().outerHeight();
          scrollPane.scrollTop = scrollPane.scrollTop + (newHeight - oldHeight);
        }, 50, parent, oldHeight, scrollPane);
      }
    }
  }
  if (parent.children().hasClass("edited")) {
    setTimeout(inject, 250);
  }
  else {
    inject();
  }
};

emoteModule.createEmoteElement = function(word, mod, url, url_fb) {
  if(typeof(word) == 'undefined') return;
  if(word == 'koviMote'){
    word = "(*´・ｖ・)/`";
    if(typeof(mod) != 'undefined' && mod.indexOf('emote64') > -1){
      mod = mod.replace('emote64', 'div64');
    }
    var html = '<span class="emotewrapper"><div class="' + mod + '">' + word + '</div></span>';
  } else {
	for(var a = 0; a < koviMotes.poopmotes.length; a++){
	  if(word == koviMotes.poopmotes[a]){
		url = 'https://discordapp.com/assets/ced0c08553c2ade6cbeee29a40f4ac8c.svg';
		url_fb = null;
	  }
	}
    var url_fb = url_fb || null;
    var onerr = url_fb ? 'this.onerror=null; this.src=\''+ url_fb + '\';' : '';
    var html = '<span class="emotewrapper"><img draggable="false" class="emote ' + mod + '" alt="' + word + '" src="' + url + '"' + (onerr != '' ? 'onerror="' + onerr + '"' : '') + '/><input onclick=\'quickEmoteMenu.favorite(\"' + word + '\", \"' + url + '\");\' class="fav" title="Favorite!" type="button"></span>';
  }
  return $.parseHTML(html)[0];
};

// Temporary overrides because Jiiks is lazy garbo

var Core = Core;
var QuickEmoteMenu = QuickEmoteMenu;

if(typeof Core != 'undefined' && typeof emoteModule != 'undefined' && typeof quickEmoteMenu != 'undefined'){
  Core.prototype.initObserver = function() {
    mainObserver = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (settingsPanel !== undefined)
          settingsPanel.inject(mutation);
        if ($(mutation.target).find("[class*='emojiPicker']").length) {
          var fc = mutation.target.firstChild;
          if (fc.classList.contains("popout")) {
            quickEmoteMenu.obsCallback($(fc));
          }
        }
        if (typeof pluginModule !== "undefined")
          pluginModule.rawObserver(mutation);
        if (mutation.target.getAttribute('class') != null) {
          if (mutation.target.classList.contains('title-wrap') || mutation.target.classList.contains('chat')) {
              voiceMode.obsCallback();
              if (typeof pluginModule !== "undefined")
                  pluginModule.channelSwitch();
          }
          if (mutation.target.getAttribute('class').indexOf('scroller messages') != -1) {
              if (typeof pluginModule !== "undefined")
                  pluginModule.newMessage();
          }
          if (settingsCookie["bda-gs-6"]) {
            $(".timestamp").not("[data-24]").each(function() {
              var t = $(this);
              t.attr("data-24", true);
              var text = t.text();
              var matches = /(.*)?at\s+(\d{1,2}):(\d{1,2})\s+(.*)/.exec(text);
              if (matches == null)
                  return true;
              if (matches.length < 5)
                  return true;
              var h = parseInt(matches[2]);
              if (matches[4] == "AM") {
                  if (h == 12)
                      h -= 12;
              } else if (matches[4] == "PM") {
                  if (h < 12)
                      h += 12;
              }
              matches[2] = ('0' + h).slice(-2);
              t.text(matches[1] + " at " + matches[2] + ":" + matches[3]);
            });
          }
          if (settingsCookie["bda-gs-7"]) {
            $(".user-name").not("[data-colour]").each(function() {
              var t = $(this);
              var color = t.css("color");
              if (color == "rgb(255, 255, 255)")
                return true;
              t.closest(".message-group").find(".markup").not("[data-colour]").each(function() {
                $(this).attr("data-colour", true);
                $(this).css("color", color);
              });
            });
          }
        }
        emoteModule.obsCallback(mutation);
      });
    });
    mainObserver.observe(document, {
      childList: true,
      subtree: true
    });
  };
  Core.prototype.initObserver();
  
  quickEmoteMenu.switchQem = function(id){
    var react_event = "";
    Object.keys($('[class^=textAreaEnabled]')[0]).forEach(function(key){if(key.indexOf('__reactEventHandlers') > -1){react_event = key;};})
    var twitch = $("#bda-qem-twitch");
    var fav = $("#bda-qem-favourite");
    var emojis = $("#bda-qem-emojis");
    twitch.removeClass("active");
    fav.removeClass("active");
    emojis.removeClass("active");
    $("[class*='emojiPicker']").hide();
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
      $("[class*='emojiPicker']").show();
      break;
    }
    this.lastTab = id;
    var emoteIcon = $('.emote-icon');
    emoteIcon.off();
    emoteIcon.on("click", function() {
      var emote = $(this).attr("title");
      // var ta = $(".channel-text-area-default textarea");
      var ta = $("[class*='textAreaEnabled']");
      // ta.val(ta.val().slice(-1) == " " ? ta.val() + emote : ta.val() + " " + emote);
      ta.val(ta.val().slice(-1) == " " ? ta.val() + emote : ta.val() + (ta.val()[0] != undefined ? " " : "") + emote);
      ta.prop(react_event).value = ta.val();
    });
  };
};