//META{"name":"koviMotes"}*//

function koviMotes(){};

koviMotes.prototype.load = function(){
	//temp fix because discord devs are garbo
	//window.localStorage = window.sessionStorage;
	const waframe = document.createElement('iframe');
	waframe.style.display = 'none';
	document.body.appendChild(waframe);
	window.localStorage = waframe.contentWindow.localStorage;
};

koviMotes.prototype.start = function(){
  var got_script = false;
  var got_json = false;
  var ready = function(){
    if(got_script == true && got_json == true){
      koviMotes.startup();
    }
  }
  var get_js = function(){
    $.getScript('https://kovibear.tv/kovimotes/live/koviMotes.js')
    .done(function(data, status){
        got_script = true;
        ready();
      })
    .fail(function(xhr, settings, exception){
      console.error('could not retrieve koviMotes.js - kovibear.tv may be down');
    });
  };
  var get_json = function(){
    $.getJSON('https://kovibear.tv/kovimotes/live/koviMotes.json')
    .done(function(data){
      koviMotes.json = data;
      got_json = true;
      ready();
    })
    .fail(function(xhr, settings, exception){
      console.error('could not retrieve koviMotes.json - kovibear.tv may be down');
    })
  };
  get_js();
  get_json();
};

koviMotes.prototype.unload = function(){
};

koviMotes.prototype.stop = function(){
};

koviMotes.prototype.getName = function(){
	return "koviMotes";
};

koviMotes.prototype.getDescription = function(){
	return "Adds and auto-updates koviMotes for BetterDiscord";
};

koviMotes.prototype.getVersion = function(){
	return "2017.08.14.2145";
};

koviMotes.prototype.getAuthor = function(){
	return "kovibear";
};

koviMotes.getSettingsPanel = function(){
};