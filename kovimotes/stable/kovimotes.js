// KoviMotes.js
var KoviMotes = {};

KoviMotes.Script = function(){
  console.log("[KoviMotes] initializing..");
  this.version = "2018.01.31.1927";
  this.branch = "stable";
  this.emoteLists = {};
  this.emoteMods = ["flip", "spin", "pulse", "spin2", "spin3", "1spin", "2spin", "3spin", "tr", "bl", "br", "shake", "shake2", "shake3", "flap", "flipflap", "shake4", "64"];
  
  let self = this;
  
  // lzstring
  this.LZString=function(){function o(o,r){if(!t[o]){t[o]={};for(var n=0;n<o.length;n++)t[o][o.charAt(n)]=n}return t[o][r]}var r=String.fromCharCode,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",t={},i={compressToBase64:function(o){if(null==o)return"";var r=i._compress(o,6,function(o){return n.charAt(o)});switch(r.length%4){default:case 0:return r;case 1:return r+"===";case 2:return r+"==";case 3:return r+"="}},decompressFromBase64:function(r){return null==r?"":""==r?null:i._decompress(r.length,32,function(e){return o(n,r.charAt(e))})},compressToUTF16:function(o){return null==o?"":i._compress(o,15,function(o){return r(o+32)})+" "},decompressFromUTF16:function(o){return null==o?"":""==o?null:i._decompress(o.length,16384,function(r){return o.charCodeAt(r)-32})},compressToUint8Array:function(o){for(var r=i.compress(o),n=new Uint8Array(2*r.length),e=0,t=r.length;t>e;e++){var s=r.charCodeAt(e);n[2*e]=s>>>8,n[2*e+1]=s%256}return n},decompressFromUint8Array:function(o){if(null===o||void 0===o)return i.decompress(o);for(var n=new Array(o.length/2),e=0,t=n.length;t>e;e++)n[e]=256*o[2*e]+o[2*e+1];var s=[];return n.forEach(function(o){s.push(r(o))}),i.decompress(s.join(""))},compressToEncodedURIComponent:function(o){return null==o?"":i._compress(o,6,function(o){return e.charAt(o)})},decompressFromEncodedURIComponent:function(r){return null==r?"":""==r?null:(r=r.replace(/ /g,"+"),i._decompress(r.length,32,function(n){return o(e,r.charAt(n))}))},compress:function(o){return i._compress(o,16,function(o){return r(o)})},_compress:function(o,r,n){if(null==o)return"";var e,t,i,s={},p={},u="",c="",a="",l=2,f=3,h=2,d=[],m=0,v=0;for(i=0;i<o.length;i+=1)if(u=o.charAt(i),Object.prototype.hasOwnProperty.call(s,u)||(s[u]=f++,p[u]=!0),c=a+u,Object.prototype.hasOwnProperty.call(s,c))a=c;else{if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a]}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++),s[c]=f++,a=String(u)}if(""!==a){if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a]}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++)}for(t=2,e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;for(;;){if(m<<=1,v==r-1){d.push(n(m));break}v++}return d.join("")},decompress:function(o){return null==o?"":""==o?null:i._decompress(o.length,32768,function(r){return o.charCodeAt(r)})},_decompress:function(o,n,e){var t,i,s,p,u,c,a,l,f=[],h=4,d=4,m=3,v="",w=[],A={val:e(0),position:n,index:1};for(i=0;3>i;i+=1)f[i]=i;for(p=0,c=Math.pow(2,2),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(t=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 2:return""}for(f[3]=l,s=l,w.push(l);;){if(A.index>o)return"";for(p=0,c=Math.pow(2,m),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(l=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 2:return w.join("")}if(0==h&&(h=Math.pow(2,m),m++),f[l])v=f[l];else{if(l!==d)return null;v=s+s.charAt(0)}w.push(v),f[d++]=s+v.charAt(0),h--,s=v,0==h&&(h=Math.pow(2,m),m++)}}};return i}();"function"==typeof define&&define.amd?define(function(){return LZString}):"undefined"!=typeof module&&null!=module&&(module.exports=this.LZString);
  
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
    // remove old single twitch list
    if(self.localStorage.getItem("KoviMotes.emoteLists[\"twitch\"]")){
      self.localStorage.removeItem("KoviMotes.emoteLists[\"twitch\"]");
    }
    // version compare function
    let needsUpdated = function(list){
      let local = self.localStorage.getItem("KoviMotes.emoteLists[\"" + list + "\"]");
      let decompressed = self.LZString.decompress(local);
      if(decompressed === null){
        return true;
      }
      try{
        local = JSON.parse(decompressed);
      }
      catch(err){
        local = {};
      }
      if(!local || !local['version'] || !lists || !lists[list] || !lists[list] || (lists[list] > local['version'])){
        return true;
      }
      else{
        return false;
      };
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
              let compressed = self.LZString.compress(xhr.responseText);
              self.localStorage.removeItem("KoviMotes.emoteLists[\"" + list + "\"]");
              self.localStorage.setItem("KoviMotes.emoteLists[\"" + list + "\"]", compressed);
              resolve();
            }
          }
          xhr.send();
        });
      }
      else {
        let local = self.localStorage.getItem("KoviMotes.emoteLists[\"" + list + "\"]");
        let decompressed = self.LZString.decompress(local);
        self.emoteLists[list] = JSON.parse(decompressed);
      }
    }
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
                let twitch = self.emoteLists["twitch1"];
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
                twitch = self.emoteLists["twitch2"];
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
  // force an emote injection
  this.injectEmotes(document.body);
  // finished
  console.log("[KoviMotes] version " + self.version + " has successfully started.");
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
    console.log('[KoviMotes] checking for updates..');
    let self = this;
    let version = await new Promise(function(resolve, reject){
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "https://kovibear.tv/kovimotes/stable/version.json", true);
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
    if((typeof version['version'] != "undefined" ? version['version'].replace(/\./g,'') : "9999.99.99.9999".replace(/\./g,'')) > self.version.replace(/\./g,'')){
      console.log('[KoviMotes] updating..');
      this.restart();
    }
    else{
      if(typeof self.updater != "undefined"){
        clearTimeout(self.updater);
      }
      self.updater = setTimeout(function(){
        self.update();
      },3600000)
    }
    return true;
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
    (function(){let js = document.createElement("script"); js.id = "KoviMotes JS"; js.type = "text/javascript"; js.src = "https://kovibear.tv/kovimotes/stable/kovimotes.js"; document.head.appendChild(js);})()
    return true;
  }
}

KoviMotes = new KoviMotes.Script()

// temporary 60m auto-update timeout to deal with likely constant blacklist updates
KoviMotes.updater = setTimeout(function(){
  KoviMotes.update();
},43200000)