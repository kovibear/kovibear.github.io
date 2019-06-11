// KoviMotes.js
var KoviMotes = {};

KoviMotes.Script = function(){
  console.log("[KoviMotes] initializing..");
  this.version = "2018.05.08.1602";
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
  
  // get emote lists and update if needed
  this.getEmoteLists = async function(self){
    // proxy localStorage because discord devs are butt
    let localStorage = await new Promise(function(resolve, reject){
      let iframe = document.createElement("iframe");
      iframe.style.display = "none";
      document.body.appendChild(iframe);
      self.localStorage = window.localStorage = iframe.contentWindow.localStorage;
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
      if(!lists.hasOwnProperty(list)) continue;
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
        let compact = node.querySelectorAll(".message-group .comment .message .markup .message-content");
        let cozy = node.querySelectorAll(".message-group .comment .message .body .message-text .markup");
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
                let word = words[c];
                let imgClass = "emote";
                let divClass = "";
                let has_mod = false;
                let emote64 = false;
                if(word.indexOf(":") > -1){
                  let mods = word.split(":");
                  word = mods[0];
                  if(mods[0] !== "" && mods[1] !== ""){
                    for(let d = 1; d < mods.length; d++){
                      if(self.emoteMods.indexOf(mods[d]) > -1 && !has_mod){
                        imgClass += " " + ("emote" + mods[d]);
                        divClass += " " + ("emote" + mods[d]);
                        if(mods[d] === "64"){
                          divClass.replace("emote64", "div64");
                          emote64 = true;
                        }
                        else {
                          has_mod = true;
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
                if(typeof kovimotes != "undefined" && typeof kovimotes.emotes != "undefined" && typeof kovimotes.emotes[word] != "undefined"){
                  if(text != null){
                    children.splice(b + splice++, 0, document.createTextNode(text));
                    text = null;
                  }
                  let span = document.createElement("span");
                  span.className = "emotewrapper";
                  let img = document.createElement("img");
                  img.src = kovimotes.root + word + "." + kovimotes.emotes[word];
                  img.className = imgClass;
                  img.alt = word;
                  span.appendChild(img);
                  children.splice(b + splice++, 0, span);
                  changes = true;
                  continue;
                }
                // twitch emotes
                let twitch = self.emoteLists["twitch"];
                if(typeof twitch != "undefined" && typeof twitch.emotes != "undefined" && typeof twitch.emotes[word] != "undefined"){
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
                  img.alt = word;
                  span.appendChild(img);
                  children.splice(b + splice++, 0, span);
                  changes = true;
                  continue;
                }
                // ffz emotes
                let ffz = self.emoteLists["ffz"];
                if(typeof ffz != "undefined" && typeof ffz.emotes != "undefined" && typeof ffz.emotes[word] != "undefined"){
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
                  img.alt = word;
                  span.appendChild(img);
                  children.splice(b + splice++, 0, span);
                  changes = true;
                  continue;
                }
                // bttv emotes
                let bttv = self.emoteLists["bttv"];
                if(typeof bttv != "undefined" && typeof bttv.emotes != "undefined" && typeof bttv.emotes[word] != "undefined"){
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
                  img.alt = word;
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
      let text = function(){
        if(typeof child.alt != "undefined"){
          return child.alt;
        }
        else {
          return "koviMote";
        }
      }();
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
}

KoviMotes = new KoviMotes.Script()

// temporary 15m auto-update interval to deal with likely constant blacklist updates
setInterval(function(){
  console.log("[KoviMotes] restarting..");
  KoviMotes.observer.disconnect();
  KoviMotes.removeEmotes();
  let css = document.getElementById("KoviMotes CSS");
  css.parentNode.removeChild(css);
  let js = document.getElementById("KoviMotes JS");
  js.parentNode.removeChild(js);
  (function(){let js = document.createElement("script"); js.id = "KoviMotes JS"; js.type = "text/javascript"; js.src = "https://kovibear.tv/kovimotes/stable/kovimotes.js"; document.head.appendChild(js);})()
},900000)
