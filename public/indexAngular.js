(function() {
	var app = angular.module('myApp', ['ngRoute']);
	
	app.config(function($routeProvider) {
		$routeProvider
		.when('/', {				templateUrl: '/webpages/home.html'	})
		.when('/home', {			templateUrl: '/webpages/home.html'	})
		.when('/java', {			templateUrl: '/webpages/java.html'	})
		.when('/engineering', {		templateUrl: '/webpages/engineering.html'	})
		.when('/cpp',	{			templateUrl: '/webpages/data-structures.html'	})
		.when('/web',	{			templateUrl: '/webpages/web-development.html'	})
		.when('/work-experience', {	templateUrl: '/webpages/work-experience.html'	})
		.otherwise({				templateUrl: '/webpages/status/error404.html'	});
	});
	
	app.controller('repoCtrl', ['$scope', '$http', function($scope, $http) {
		  $scope.myData = '';
		  var updateData = function() {
			  $http.get('/api/get-repos').then(function(response) {
			  		$scope.myData = response.data;
			  });
		  };
		  
		  updateData();
	}]);
})();