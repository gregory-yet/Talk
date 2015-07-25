/*

	* @author 			Grégory
	* @description			Code JavaScript permettant de générer un lien de chat via tlk.io pour discuter plus rapidement sans s'ajouter sur Skype
	* @copyright 			2015 Aucune modification n'est autorisée sans mon accord
	* @website 			http://wayz.fr/
	* @version 			1.0

*/


var talk = {
	location: {
		pathname: location.pathname.split('/'),
		hash: location.hash
	},
	init: function(){
		if(this.location.pathname[1] == "conversations" && this.location.pathname[2] == "add" && this.location.hash == "#talk"){
			$.getScript("https://gitcdn.xyz/repo/blueimp/JavaScript-MD5/master/js/md5.js");
		}
		if(this.location.pathname[1] == "members"){
			var username = $('.username').eq(0).text().trim();
			$('.infoBlock').eq(1).find('.pairsJustified').append(
				'<dl>' +
					'<dt>Talk:</dt>' +
					'<dd><a href="/conversations/add?to='+username+'" class="OverlayTrigger">'+username+'</a></dd>' +
				'</dl>');
		}
		this.listener();

	},
	listener: function(){

		$(document).on('DOMNodeInserted', function(e) {
			var card = $(e.target);
			if (e.target.className == 'contenuMemberCard') {
				card.find('.userLinks').children().eq(1).after('<a href="/conversations/add?to='+card.find('.username').eq(0).text().trim()+'">Talk</a>');
			}
		});

	}
};

talk.init();
