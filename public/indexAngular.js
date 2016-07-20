var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
		.when('/', {															// Home page (main route)				
			templateUrl: '/webpages/home.html'			
		})
		.when('/home', {
			templateUrl: '/webpages/home.html'
		})
		.when('/chat', {				
			templateUrl: '/webpages/chat.html'
		})
		.when('/about', {
			templateUrl: '/webpages/about.html'
		})
		.when('/contact' {
			templateUrl: '/webpages/contact.html'
		});		
});