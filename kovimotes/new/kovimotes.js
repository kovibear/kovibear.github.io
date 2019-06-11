// kovimotes.js
KoviMotes = async function(){
  // init/load localstorage
  this.LocalStorage = await new Promise((resolve, reject) => {
    if(iframe = document.getElementById('KoviMotes LocalStorage')){
      resolve(iframe.contentWindow.localStorage);
    } 
    iframe = document.createElement('iframe');
    iframe.id = 'KoviMotes LocalStorage';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    resolve(iframe.contentWindow.localStorage);
  });
  
  // init/load settings
  
  // init/load updater
  
  // init observer
  this.Observer = new MutationObserver(function(mutations){
    
  }).observe(document, {childList: true, subtree: true});
  
  this.Utils = function(self){
    this.Log = function(message){}
      console.log('[KoviMotes]', message);
  };
  
  this.Core = function(self){
    // init
    
    // load/create settings
    
    // updater
    
    // observer
    this.defers = [];
    this.observer = new MutationObserver(function(mutations){
      
    });
  };
  
  this.StyleModule = function(self){}(self);
  
  this.EmoteModule = function(self){}(self);
  
  this.Utils = function(self){}(self);
}();

KoviMotes.Core = function(){
  // updater
  
  // observer
  this.observer = new MutationObserver(function(mutations){
    // call functions from list
    
  });
  this.observer_calls = {
    'test': function(){
  };
    
}

KoviMotes.StyleModule = function(){
  // todo: add toggle functionality
  
  // get css if enabled
}

KoviMotes.UserStyleModule = function(){
  // todo: add toggle functionality
}

KoviMotes.EmoteModule = function(){
  // todo: add toggle functionality
  
  // init
    // lists
    // mods
  
  // emote list updater
    // check for local versions
    // check remote versions and update if needed
    // force emote inject
  
  // 
}

KoviMotes.Utils = function(){
  // logger
  this.Log = function(message){
    console.log('[KoviMotes]', message);
  };
}