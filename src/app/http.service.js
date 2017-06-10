(function() {
    'use strict';

    angular.module('BlurAdmin.httpService', [])
        .factory('httpService', httpService);
        /** @ngInject */
    /** @ngInject */
	function httpService($http, commonService, $localStorage, $state, printService, AuthenticationService) {
        var service = {};
		
		service.getConfig = function(config, param, method){
			if(!config){
				config = {};
			}
			if(!config.headers){
				config.headers = {};
			}
			if(!config.headers.Authorization){
				config.headers['Authorization'] = $localStorage.authKey;
				config.headers['Content-Type'] = 'application/json;charset=utf-8';
			}
			
			if(param){
				if(!config.params){
					config.params = {};
				}
				for(var name in param){
					config.params[name] = param[name];
				}
			}
			
			console.log('config is :');
			console.log(config);
			return config;
		};
		
	    service.get = function(url, param, config, callBack){
	    	console.log('http get : ' + url);
	    	var cfg = angular.copy(config);
	    	cfg = this.getConfig(cfg, param, 'get');
		    return $http.get(IG.api + url, cfg).then(function(response){
				console.log('response.status :' + response.status);
				console.log('response.statusText :' + response.statusText);
				console.log('response is :');
				console.log(response);
	    		if(typeof response == "string"){
	          		commonService.showMsg("success", response);
	    		}
	    		
	    		if(response.status==200){
	                if(callBack && typeof callBack != "undefined") {
	                   callBack(response.data);
	                }
	    		}else{
			        commonService.showMsg("error", response.statusText);
	    		}
		    }, function(err){
				console.log('err is :');
				console.log(err);
		        commonService.showMsg("error", err.data);
		        if(err.data && err.data.message && err.data.message==='Your authKey is invalid.'){
		            printService.print('Logout code : signOut');
		            AuthenticationService.setLoggedIn(false);
		            AuthenticationService.signOut();
        			$state.go('signin');
		        }
		    });
	    };

        service.post = function(url, param, config, callBack) {
        	console.log('http post : ' + url);
	    	var cfg = angular.copy(config);
	    	cfg = this.getConfig(cfg, null, 'post');
		    return $http.post(IG.api + url, param, cfg).then(function(response){
				console.log('response.status :' + response.status);
				console.log('response.statusText :' + response.statusText);
				console.log('response is :');
				console.log(response);
	    		if(typeof response == "string"){
	          		commonService.showMsg("success", response);
	    		}
	    		
	    		if(response.status==200){
	                if(callBack && typeof callBack != "undefined") {
	                   callBack(response.data);
	                }
	    		}else{
			        commonService.showMsg("error", response.statusText);
	    		}
		    }, function(err){
				console.log('err is :');
				console.log(err);
		        commonService.showMsg("error", err);
		        if(err.data && err.data.message && err.data.message==='Your authKey is invalid.'){
		            printService.print('Logout code : signOut');
		            AuthenticationService.setLoggedIn(false);
		            AuthenticationService.signOut();
        			$state.go('signin');
		        }
		    });
        };
        
        service.delete = function(url, param, config, callBack){
	    	var cfg = angular.copy(config);
	    	cfg = this.getConfig(cfg, param, 'delete');
		    return $http.delete(IG.api + url, cfg).then(function(response){
				console.log('response.status :' + response.status);
				console.log('response.statusText :' + response.statusText);
				console.log('response is :');
				console.log(response);
	    		if(typeof response == "string"){
	          		commonService.showMsg("success", response);
	    		}
	    		
	    		if(response.status==200){
	                if(callBack && typeof callBack != "undefined") {
	                   callBack(response.data);
	                }
	    		}else{
			        commonService.showMsg("error", response.statusText);
	    		}
		    }, function(err){
				console.log('err is :');
				console.log(err);
		        commonService.showMsg("error", err.data);
		        if(err.data && err.data.message && err.data.message==='Your authKey is invalid.'){
		            printService.print('Logout code : signOut');
		            AuthenticationService.setLoggedIn(false);
		            AuthenticationService.signOut();
        			$state.go('signin');
		        }
		    });
	    };
        return service;
    };
})();
