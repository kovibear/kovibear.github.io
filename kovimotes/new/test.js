// todo:
// add logging levels
// implement config to toggle modules
// update to using fetch
// javascript emote mod animations
KoviMotes = new (function(){
  // core
  this.Core = new (function(){
    this.log = (message) => {
      console.log('[KoviMotes]', message);
    }
    this.dateToVersion = (date) => {
      var year = date.getFullYear().toString().padStart(4,'0');
      var month = (date.getMonth() + 1).toString().padStart(2,'0');
      var day = date.getDate().toString().padStart(2,'0');
      var time = date.getHours().toString().padStart(2,'0') + date.getMinutes().toString().padStart(2,'0');
      return year + '.' + month + '.' + day + '.' + time;
    }
    this.update = async () => {
      this.log('checking for updates..');
      var versions = await fetch('https://kovibear.tv/kovimotes/stable/kovimotes.css')
        .then((response) => response.headers.get('Last-Modified'))
      console.log(this.dateToVersion(new Date(versions)));
    }
  })();
  // emotemodule
  this.EmoteModule = new (function(){
    this.emoteLists = {};
    this.emoteMods = {};
    
  })();
  // cssmodule
  this.CSSModule = (function(){
    
  })();
  // init and run
  (async () => {
    // startup message
    this.Core.log('starting..\r');
    // proxy localstorage
    this.localStorage = await new Promise((resolve, reject) => {
      var iframe = document.createElement('iframe');
      iframe.id = 'KoviMotes LocalStorage';
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      resolve(iframe.contentWindow.localStorage);
    });
    // check for updates
    this.Core.update();
  })();
})();