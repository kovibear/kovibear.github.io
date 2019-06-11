koviMotes.processMessage = function(node){
	var parent = node.parentNode;
	if(typeof parent != "undefined" && parent != null){
		var html = parent.innerHTML;
		if(typeof html != "undefined"){
			var input = parent.innerHTML.replace(/<(.*?)>/g,"");
			if(typeof input != "undefined"){
				var parsed = input.split(/\s|\(edited\)/g);
				var cleaned = input.split(/\s|\(edited\)/g);
				var output = parent.innerHTML;

				var root = koviMotes.json.root;
				var emotes = koviMotes.json.emotes;

				var changes = false;

				if(typeof html != "undefined" && html.length > 0
				&& typeof input != "undefined" && input.length > 0
				&& typeof parsed != "undefined" && parsed.length > 0
				&& typeof cleaned != "undefined" && cleaned.length > 0
				&& typeof output != "undefined" && output.length > 0
				&& typeof root != "undefined" && root.length > 0
				&& typeof emotes != "undefined" && Object.keys(emotes).length > 0){
					for(var a=0;a<cleaned.length;a++){
						cleaned[a] = cleaned[a].split(/:/)[0];
					};
					for(var a=0;a<cleaned.length;a++){
						for(var b in emotes){
							if(emotes.hasOwnProperty(b)){
								if(b == cleaned[a]){
									var emoteSrc = root+b+"."+emotes[b];
									var emoteClasses = parsed[a].split(/:/)[1]?"emote emote"+parsed[a].split(/:/)[1]:"emote";
									var emoteHTML = '<span class="emotewrapper"><img draggable="false" style="max-height:32px;" class="'+emoteClasses+'" alt="'+b+'" src="'+emoteSrc+'"><input onclick=\'quickEmoteMenu.favorite(\"'+b+'\", \"'+emoteSrc+'\");\' class="fav" title="Favorite!" type="button"></span>';

									output = output.replace(new RegExp(parsed[a]+/(?!\"|\.)/.source,"g"),emoteHTML);
									changes = true;
								};
							};
						};
						if(cleaned[a] == "koviMote"){
							var emoteClasses = parsed[a].split(/:/)[1]?"emote"+parsed[a].split(/:/)[1]:"";
							var emoteHTML = '<span class="emotewrapper"><div style="max-height:32px;" class="'+emoteClasses+'">'+"(*´・ｖ・)/`"+'</div></span>';

							output = output.replace(new RegExp(parsed[a]+/(?=\s|<)/.source,"g"),emoteHTML);
							changes = true;
						}
					};
					if(changes){
						parent.innerHTML = parent.innerHTML.replace(html,output);	
					};
				};
			};
		};
	};
};