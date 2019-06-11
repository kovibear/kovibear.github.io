// KoviMotes.js
var KoviMotes = {};

KoviMotes.Script = function(){
  console.log("[KoviMotes] initializing..");
  this.version = "2018.07.25.1510";
  this.branch = "dev";
  this.emoteLists = {};
  this.emoteMods = ["flip", "spin", "pulse", "spin2", "spin3", "1spin", "2spin", "3spin", "tr", "bl", "br", "shake", "shake2", "shake3", "flap", "flipflap", "shake4", "64"];
  
  let self = this;
  
  // get css
  let css = function(self){
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://kovibear.tv/kovimotes/stable/kovimotes.css", true);
    xhr.onload = function(e){
      if(xhr.readyState === 4 && xhr.status === 200){
        self.css = document.createElement("style");
        self.css.type = "text/css";
        self.css.innerHTML = xhr.responseText;
        self.css.id = "KoviMotes CSS";
        document.head.appendChild(self.css);
      }
    }
    xhr.send();
  }(self);
  // get custom css if it exists
  let get_ccss = function(){
    if(!self.localStorage) return;
    let raw = self.localStorage.getItem("KoviMotes.customCSS");
    if(!raw || raw == "") return;
    let ccss = atob(raw);
    self.ccss = document.createElement("style");
    self.ccss.type = "text/css";
    self.ccss.innerHTML = ccss;
    self.ccss.id = "KoviMotes CCSS";
    document.head.appendChild(self.ccss);
  }
  
  // get emote lists and update if needed
  this.getEmoteLists = async function(self){
    // proxy localStorage because discord devs are butt
    let localStorage = await new Promise(function(resolve, reject){
      let iframe = document.createElement("iframe");
      iframe.id = "KoviMotes LocalStorage";
      iframe.style.display = "none";
      document.body.appendChild(iframe);
      self.localStorage = window.localStorage = iframe.contentWindow.localStorage;
      get_ccss();
      resolve();
    });
    // get server-side list versions
    let lists = await new Promise(function(resolve, reject){
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "https://kovibear.tv/kovimotes/stable/lists.json", true);
      xhr.onload = function(e){
        if(xhr.readyState === 4 && xhr.status === 200){
          resolve(JSON.parse(xhr.responseText));
        }
      }
      xhr.onerror = function(e){
        resolve();
      }
      xhr.send();
    });
    // version compare function
    let needsUpdated = function(list){
      let local = JSON.parse(self.localStorage.getItem("KoviMotes.emoteLists[\"" + list + "\"]"));
      let remote = lists;
      if(local == null || typeof local == "undefined" || typeof local["version"] == "undefined") return true;
      if(typeof remote[list] != "undefined"){
        let lversion = local["version"].split(".");
        let rversion = remote[list].split(".");
        if(lversion.length != rversion.length) return true;
        for(let a = 0; a < lversion.length; a++){
          if(lversion[a] >= rversion[a]){
            continue;
          }
          else {
            return true;
          }
        }
        return false;
      }
    }
    // update local lists with remote versions as needed
    console.log("[KoviMotes] checking for emoteList updates..");
    for(let list in lists){
      if(!lists.hasOwnProperty(list) || list == "script") continue;
      if(needsUpdated(list)){
        console.log("[KoviMotes] updating emoteList[\"" + list + "\"]..");
        let request = await new Promise(function(resolve, reject){
          let xhr = new XMLHttpRequest();
          xhr.open("GET", "https://kovibear.tv/kovimotes/stable/" + list + ".json", true);
          xhr.onload = function(e){
            if(xhr.readyState === 4 && xhr.status === 200){
              self.emoteLists[list] = JSON.parse(xhr.responseText);
              self.localStorage.setItem("KoviMotes.emoteLists[\"" + list + "\"]", xhr.responseText);
              resolve();
            }
          }
          xhr.send();
        });
      }
      else {
        self.emoteLists[list] = JSON.parse(self.localStorage.getItem("KoviMotes.emoteLists[\"" + list + "\"]"));
      }
    }
    // force an emote injection
    self.injectEmotes(document.body);
    // finished
    console.log("[KoviMotes] version " + self.version + " has successfully started.");
  }(self)
  
  // init observer
  this.observer = new MutationObserver(function(mutations){
    if(typeof mutations.length != "undefined"){
      for(let a = 0; a < mutations.length; a++){
        let mutation = mutations[a];
        if(typeof mutation.addedNodes != "undefined" && typeof mutation.addedNodes.length != "undefined"){
          let added = mutation.addedNodes;
          if(typeof added.length != "undefined"){
            for(let b = 0; b < added.length; b++){
              let node = added[b];
              if(typeof node.childNodes != "undefined"){
                self.injectEmotes(node);
              }
            }
          }
        }
      }
    }
  });
  this.observer.observe(document.body, {childList: true, subtree: true, CharacterData: true});
  
  // emote injector
  this.injectEmotes = async function(node){
    if(typeof node == "undefined" || typeof node.parentNode == "undefined" || typeof node.childNodes == "undefined") return;
    let messages = function(node){
      if(typeof node != "undefined" && typeof node.querySelectorAll != "undefined"){
        let compact = node.querySelectorAll("[class*='containerCompact-'] [class*='messageCompact-'] [class*='contentCompact-'] [class*='markup-']");
        let cozy = node.querySelectorAll("[class*='containerCozy-'] [class*='messageCozy-'] [class*='contentCozy-'] [class*='markup-']");
        if(typeof compact.length != "undefined" && compact.length > 0){
          return compact;
        }
        else if(typeof cozy.length != "undefined" && cozy.length > 0){
          return cozy;
        }
        else {
          return [];
        }
      }
    }(node);
    if(typeof messages != "undefined" && typeof messages.length != "undefined"){
      for(let a = 0; a < messages.length; a++){
        let message = messages[a];
        let children = [].slice.call(message.childNodes);
        if(typeof children != "undefined" && typeof children.length != "undefined"){
          for(let b = 0; b < children.length; b++){
            let child = children[b];
            if(typeof child.nodeType != "undefined" && typeof child.nodeValue != "undefined"){
              if(child.nodeType != 3 || !child.nodeValue) continue;
              children.splice(b, 1);
              let value = child.nodeValue;
              let splice = 0;
              let changes = false;
              let words = value.split(/([^\s]+)([\s]|$)/g).filter(function(e){return e;});
              if(!words || !words.length) continue;
              let text = null;
              for(let c = 0; c < words.length; c++){
                let full = words[c];
                let word = words[c];
                let imgClass = "emote";
                let divClass = "";
                let has_mod = false;
                let emote64 = false;
                let srcList;
                // parse mods
                if(word.indexOf(":") > -1){
                  let mods = word.split(":");
                  // parse mods to apply to previous emoji
                  if(word.indexOf(":") == 0){
                    let prev = children[b - 1];
                    if(typeof prev != "undefined" && typeof prev.classList != "undefined"){
                      let emote;
                      let oldHeight;
                      if(typeof message.parentNode != "undefined"){
                        oldHeight = message.parentNode.offsetHeight;
                      }
                      if(prev.classList.contains("emoji")){
                        emote = prev;
                      }
                      else if(prev.classList.contains("emotewrapper")){
                        emote = prev.childNode[0];
                      }
                      if(typeof emote != "undefined"){
                        if(text != null){
                          children.splice(b + splice++, 0, document.createTextNode(text));
                          text = null;
                        }
                        for(let d = 1; d < mods.length; d++){
                          if(self.emoteMods.indexOf(mods[d]) > -1 && !has_mod){
                            if(typeof emote.tagName != "undefined" && typeof emote.className != "undefined" && typeof emote.alt != "undefined" && typeof emote.title != "undefined"){
                              let tag = emote.tagName;
                              emote.title = emote.alt;
                              if(mods[d] == "64"){
                                if(tag == "IMG"){
                                  emote.className += " " + ("emote" + mods[d]);
                                }
                                else if(tag == "DIV"){
                                  emote.className += " " + ("div" + mods[d]);
                                }
                                emote64 = true;
                                emote.title += ":64";
                              }
                              else {
                                emote.className += " " + ("emote" + mods[d]);
                                emote.title += mods[d];
                              }
                            }
                          } 
                        }
                        changes = true;
                        if(oldHeight){
                          let scroller = message.parentNode.offsetParent.childNodes[0];
                          let newHeight = message.parentNode.offsetHeight;
                          scroller.scrollTop += (newHeight - oldHeight);
                        }
                        continue;
                      }
                    }
                  }
                  // parse mods for current word
                  else {
                    word = mods[0];
                    if(mods[0] !== "" && mods[1] !== ""){
                      for(let d = 1; d < mods.length; d++){
                        if(self.emoteMods.indexOf(mods[d]) > -1 && !has_mod){
                          imgClass += " " + ("emote" + mods[d]);
                          if(mods[d] == "64"){
                            divClass += " " + ("div" + mods[d]);
                            emote64 = true;
                          }
                          else {
                            divClass += " " + ("emote" + mods[d]);
                            has_mod = true;
                          }
                        }
                        if(Object.keys(self.emoteLists).indexOf(mods[d]) > -1){
                          srcList = mods[d];
                        }
                      }
                    }
                  }
                }
                // manual overrides
                if(word === "koviMote"){
                  if(text != null){
                    children.splice(b + splice++, 0, document.createTextNode(text));
                    text = null;
                  }
                  let span = document.createElement("span");
                  span.className = "emotewrapper";
                  let div = document.createElement("div");
                  div.className = divClass;
                  div.title = full + " " + "(kovimotes)";
                  div.innerHTML = "(*´・ｖ・)/`";
                  span.appendChild(div);
                  children.splice(b + splice++, 0, span);
                  changes = true;
                  continue;
                }
                // blacklist
                let blacklist = self.emoteLists["blacklist"];
                if(typeof blacklist != "undefined" && typeof blacklist.emotes != "undefined" && blacklist.emotes.indexOf(word) > -1){
                  if(text == null){
                    text = word;
                  }
                  else {
                    text += "" + word;
                  }
                  if(c === words.length - 1){
                    children.splice(b + splice, 0, document.createTextNode(text));
                  }
                  continue;
                }
                // kovimotes emotes
                let kovimotes = self.emoteLists["kovimotes"];
                if(typeof kovimotes != "undefined" && typeof kovimotes.emotes != "undefined" && typeof kovimotes.emotes[word] != "undefined"  && (typeof srcList == "undefined" || srcList == "kovimotes")){
                  if(text != null){
                    children.splice(b + splice++, 0, document.createTextNode(text));
                    text = null;
                  }
                  let span = document.createElement("span");
                  span.className = "emotewrapper";
                  let img = document.createElement("img");
                  img.src = kovimotes.root + word + "." + kovimotes.emotes[word];
                  img.className = imgClass;
                  img.title = full + " " + "(kovimotes)";
                  img.draggable = false;
                  span.appendChild(img);
                  children.splice(b + splice++, 0, span);
                  changes = true;
                  continue;
                }
                // twitch emotes
                let twitch = self.emoteLists["twitch"];
                if(typeof twitch != "undefined" && typeof twitch.emotes != "undefined" && typeof twitch.emotes[word] != "undefined"  && (typeof srcList == "undefined" || srcList == "twitch")){
                  if(text != null){
                    children.splice(b + splice++, 0, document.createTextNode(text));
                    text = null;
                  }
                  let span = document.createElement("span");
                  span.className = "emotewrapper";
                  let img = document.createElement("img");
                  img.onerror = function(){
                    this.onerror = null;
                    this.src = twitch.root + twitch.emotes[word] + twitch.emote32;
                  }
                  img.src = twitch.root + twitch.emotes[word] + twitch.emote64;
                  img.className = imgClass;
                  img.title = full + " " + "(twitch)";
                  img.draggable = false;
                  span.appendChild(img);
                  children.splice(b + splice++, 0, span);
                  changes = true;
                  continue;
                }
                // ffz emotes
                let ffz = self.emoteLists["ffz"];
                if(typeof ffz != "undefined" && typeof ffz.emotes != "undefined" && typeof ffz.emotes[word] != "undefined"  && (typeof srcList == "undefined" || srcList == "ffz")){
                  if(text != null){
                    children.splice(b + splice++, 0, document.createTextNode(text));
                    text = null;
                  }
                  let span = document.createElement("span");
                  span.className = "emotewrapper";
                  let img = document.createElement("img");
                  img.onerror = function(){
                    this.onerror = null;
                    this.src = ffz.root + ffz.emotes[word] + ffz.emote32;
                  }
                  img.src = ffz.root + ffz.emotes[word] + ffz.emote64;
                  img.className = imgClass;
                  img.title = full + " " + "(ffz)";
                  img.draggable = false;
                  span.appendChild(img);
                  children.splice(b + splice++, 0, span);
                  changes = true;
                  continue;
                }
                // bttv emotes
                let bttv = self.emoteLists["bttv"];
                if(typeof bttv != "undefined" && typeof bttv.emotes != "undefined" && typeof bttv.emotes[word] != "undefined"   && (typeof srcList == "undefined" || srcList == "bttv")){
                  if(text != null){
                    children.splice(b + splice++, 0, document.createTextNode(text));
                    text = null;
                  }
                  let span = document.createElement("span");
                  span.className = "emotewrapper";
                  let img = document.createElement("img");
                  img.onerror = function(){
                    this.onerror = null;
                    this.src = bttv.root + bttv.emotes[word] + bttv.emote32;
                  }
                  img.src = bttv.root + bttv.emotes[word] + bttv.emote64;
                  img.className = imgClass;
                  img.title = full + " " + "(bttv)";
                  img.draggable = false;
                  span.appendChild(img);
                  children.splice(b + splice++, 0, span);
                  changes = true;
                  continue;
                }
                if(text == null){
                  text = word;
                }
                else {
                  text += "" + word;
                }
                if(c === words.length - 1){
                  children.splice(b + splice, 0, document.createTextNode(text));
                } 
              }
              if(changes){
                var oldHeight;
                if(typeof message.parentNode != "undefined"){
                  oldHeight = message.parentNode.offsetHeight;
                }
                message.innerHTML = "";
                for(let c = 0; c < children.length; c++){
                  let child = children[c];
                  message.appendChild(child);
                }
                if(oldHeight){
                  let scroller = message.parentNode.offsetParent.childNodes[0];
                  let newHeight = message.parentNode.offsetHeight;
                  scroller.scrollTop += (newHeight - oldHeight);
                }
              }
            }
          }
        }
      }
    }
  }
  this.removeEmotes = function(){
    let wrappers = [].slice.call(document.querySelectorAll(".emotewrapper"));
    for(let a = 0; a < wrappers.length; a++){
      let wrapper = wrappers[a];
      let parent = wrapper.parentNode;
      let child = wrapper.childNodes[0];
      let text = child.title.split(" ")[0];
      if(typeof parent.childNodes != "undefined"){
        let nodes = [].slice.call(parent.childNodes);
        for(let b = 0; b < nodes.length; b++){
          let node = nodes[b];
          if(node == wrapper){
            nodes.splice(b, 1);
            nodes.splice(b, 0, document.createTextNode(text));
          }
        }
        parent.innerHTML = "";
        for(let b = 0; b < nodes.length; b++){
          let node = nodes[b];
          parent.appendChild(node);
        }
      }
    }
  }
  // updater function
  this.update = async function(){
    let self = this;
    let version = await new Promise(function(resolve, reject){
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "https://kovibear.tv/kovimotes/dev/version.json", true);
      xhr.onload = function(e){
        if(xhr.readyState === 4 && xhr.status === 200){
          resolve(JSON.parse(xhr.responseText));
        }
      }
      xhr.onerror = function(e){
        resolve();
      }
      xhr.send();
    });
    console.log(self.version, version.version);
    if(version['version'].replace(/\./g,'') >= self.version.replace(/\./g,'')){
      console.log('[KoviMotes] updating..');
      this.restart();
    }
    self.updater = setTimeout(function(){
      self.update()
    },3600000)
  }
  // temporary restart function to be called
  this.restart = function(){
    console.log("[KoviMotes] restarting..");
    if(KoviMotes.updater) clearTimeout(KoviMotes.updater);
    if(KoviMotes.observer) KoviMotes.observer.disconnect();
    KoviMotes.removeEmotes();
    let ccss = document.getElementById("KoviMotes CCSS");
    if(ccss) ccss.parentNode.removeChild(ccss);
    let css = document.getElementById("KoviMotes CSS");
    if(css) css.parentNode.removeChild(css);
    let ls = document.getElementById("KoviMotes LocalStorage");
    if(ls) ls.parentNode.removeChild(ls);
    let js = document.getElementById("KoviMotes JS");
    if(js) js.parentNode.removeChild(js);
    (function(){let js = document.createElement("script"); js.id = "KoviMotes JS"; js.type = "text/javascript"; js.src = "https://kovibear.tv/kovimotes/dev/kovimotes.js"; document.head.appendChild(js);})()
  }
}

KoviMotes = new KoviMotes.Script()

// temporary 60m auto-update timeout to deal with likely constant blacklist updates
KoviMotes.updater = setTimeout(function(){
  KoviMotes.update()
},3600000)