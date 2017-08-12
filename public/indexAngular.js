(function() {
	var app = angular.module('myApp', ['ngRoute']);
	
	app.config(function($routeProvider) {
		$routeProvider
		.when('/', {	templateUrl: '/webpages/home.html'	})	
		.when('/home', {	templateUrl: '/webpages/home.html'	})
		.when('/bio', {		templateUrl: '/webpages/about-me.html'	})
		.when('/java', {	templateUrl: '/webpages/java.html'	})
		.when('/engineering', {	templateUrl: '/webpages/engineering.html'	})
		.when('/data-structures', {	templateUrl: '/webpages/data-structures.html'	})
		.when('/error', {	templateUrl: '/webpages/status/error404.html'	});
	});
})();