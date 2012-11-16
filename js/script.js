/* Author: Nobox | Social Muscle */
var lastfm = new LastFM({
	apiKey    : '950df61da26de819ffa88ba3d1a68031',
	apiSecret : 'fd66f36549f1561868b85680f8a2697b'
	//cache     : cache
});

var lfuser = null;

var FM = {
	init : function(){
    	
    	$('#login_form').submit(function(e){
        	e.preventDefault();
        	FM.loginValidation($(this));
    	});
    	
    	//console.log(lastfm);
    	
    	$('#test').click(function(e){
        	e.preventDefault();
            	lastfm.auth.getMobileSession({username: 'papajuanito', password: 'ss7191987'}, {success: function(data){
        		/* Use data. */
        		lastfm.user.getInfo({username: data.session.name, sk: data.session.key}, {success: function(data){
            		/* Use data. */
            		console.log(data);
            		var overview = $('#user_overview');
            		
            		$('#user_image img').attr('src', data.user.image[3].text);
            		overview.find('.user_name').text(data.user.realname);
            		overview.find('.user_location').text(data.user.country);
            		
            	}, error: function(code, message){
            		/* Show error message. */
            		console.log(message);
            		
            	}});
        	}, error: function(code, message){
        		/* Show error message. */
        	}});
    	})
	},
	
	loginValidation : function(form){
    	var validation = {
            error : false,
            message : ''	
    	};
    	
    	$('.login_error').removeClass('login_error_display');
	
    	form.find('input[type="text"], input[type="password"]').each(function(){
            if($(this).val() == ''){
               validation.error = true;
               validation.message = 'Please fill in all the fields';
            }
    	});
    	
    	if(validation.error){
        	$('.login_error').text(validation.message).addClass('login_error_display');
    	}else{
        	form.find('img').show();
        	lastfm.auth.getMobileSession({username: form.find('#login_username').val(), password: form.find('#login_password').val()}, {success : function(data){
            	lastfm.user.getInfo({username: data.session.name, sk: data.session.key}, {success: function(data){
            		lfuser = data;
            		FM.updateProfile();
            		/*
var overview = $('#user_overview');
            		
            		$('#user_image img').attr('src', data.user.image[3].text);
            		overview.find('.user_name').text(data.user.realname);
            		overview.find('.user_location').text(data.user.country);
*/
            		
            	}, error: function(code, message){
            		/* Show error message. */
            		console.log(message);
            		
            	}});
        	}});
    	}
	},
	
	updateProfile : function(){
    	var overview = $('#user_overview');
		console.log(lfuser);
		$('#user_image img').attr('src', lfuser.user.image[3]['#text']);
		overview.find('.user_name').text(lfuser.user.realname + ', ' + lfuser.user.age);
		overview.find('.user_location').text(lfuser.user.country);
		$('#user_login').hide();
		
		overview.fadeIn();
	}
	
}; //UTIL

$(document).ready(function () { FM.init() });
