(function () {
  'use strict';

  angular.module('BlurAdmin.theme')
    .filter('truncate', truncate);

  /** @ngInject */
  function truncate() {
        return function (text, num, end) {
            if (isNaN(num))
                num = 5;

            if (end === undefined)
                end = "...";

            if(text && text.length>num){
            	text = text.substring(0,num)+end;
              }
              return text;  
        };
  }
})();