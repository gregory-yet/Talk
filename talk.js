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
			$.getScript("https://gitcdn.xyz/repo/blueimp/JavaScript-MD5/master/js/md5.js", function(){
				talk.message();
			});
		}
		else if(this.location.pathname[1] == "conversations"){
			this.link();
		}
		else if(this.location.pathname[1] == "members"){
			var username = $('.username').eq(0).text().trim();
			$('.infoBlock').eq(0).find('.pairsJustified').append(
				'<dl>' +
					'<dt>Talk:</dt>' +
					'<dd><a href="/conversations/add?to='+username+'#talk" class="OverlayTrigger">'+username+'</a></dd>' +
				'</dl>');
		}
		this.listener();

	},
	listener: function(){

		$(document).on('DOMNodeInserted', function(e) {
			var card = $(e.target);
			if (e.target.className == 'contenuMemberCard') {
				card.find('.userLinks').children().eq(1).after('<a href="/conversations/add?to='+card.find('.username').eq(0).text().trim()+'#talk">Talk</a>');
			}
		});

	},
	message: function(){
		$('#ctrl_title').val('Rejoins moi sur une shoutbox privée !');
		$('iframe.redactor_textCtrl').contents().find('body').html("Salut !<br><br>" +
			"Je t'invite à me rejoindre sur une shoutbox privée pour que l'on puisse parler en toute sécurité via " +
			"<a href='http://tlk.io/"+this.generate()+"'>ce lien</a><br><br>" +
			"À bientôt ;)");
		$('iframe.redactor_textCtrl').contents().find('body').select();
		$('iframe.redactor_textCtrl').contents().find('body').focus();
	},
	generate: function(){
		if(typeof md5 == "function"){
			return md5(new Date().getTime()).substr(0, 16);
		}
		else {
			console.error("Talk.js - md5.js manquant");
		}
	},
	link: function(){
		var link = $('.messageContent .messageText').find('a');
		for(var i in link){
			if(this.parseUrl(link.eq(i).attr('href')).hostname == "tlk.io"){
				$('.messageContent .messageText').parent().css('height', '600px');
				$('.messageContent .messageText').append('<div style="margin-bottom: 60px;"></div><div id="tlkio" data-channel="'+this.parseUrl(link.eq(i).attr('href')).pathname.substr(1)+'" style="width:100%;height:400px;"></div><script async src="https://tlk.io/embed.js" type="text/javascript"></script>');
			}
		}
	},
	parseUrl: function(url){
		var a = document.createElement('a');
		a.href = url;
		return a;
	}
};

talk.init();