KoviMotes = (function(){
  this.Utils = new (function(){
    this.Log = function(...messages){
      console.log('[KoviMotes]', ...messages);
    };
    this.DateToVersion = function(date){
      var year = date.getFullYear().toString().padStart(4,'0');
      var month = (date.getMonth() + 1).toString().padStart(2,'0');
      var day = date.getDate().toString().padStart(2,'0');
      var time = date.getHours().toString().padStart(2,'0') + date.getMinutes().toString().padStart(2,'0');
      return year + '.' + month + '.' + day + '.' + time;
    };
  })();
  this.Core = new (function(){
    // init
    Init = function(){};
    // updater
    this.Update = function(){};
    // full restart
    this.Restart = function(){};
  })();
  this.EmoteModule = new (function(){})();
  this.CSSModule = new(function(){})();
})();