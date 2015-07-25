/*

	* @author 			Grégory
	* @description			Code JavaScript permettant de générer un lien de chat via tlk.io pour discuter plus rapidement sans s'ajouter sur Skype
	* @copyright 			2015 Aucune modification n'est autorisée sans mon accord
	* @website 			http://wayz.fr/
	* @version 			1.0

*/


var talk = {
	init: function(){

		$.getScript("https://gitcdn.xyz/repo/blueimp/JavaScript-MD5/master/js/md5.js"); 

		talk.api();

	}
	api: function(){

		$(document).on('DOMNodeInserted', function(e) {
			if (e.target.className == 'contenuMemberCard') {
				$(e.target).find('.userLinks').children().eq(1).after('<a href="'+$(e.target).find('.userLinks').children().eq(1).attr('href')+'">Talk</a>');
			}
		});

	}
};

talk.init();
