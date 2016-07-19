// Define Angular application
var app = angular.module('iris', ['ngRoute']);

app.controller('dateCtrl', function($scope) {
	$scope.sDate = moment(new Date()).subtract(1,'day').format("YYYY-MM-DD");
});

app.config(function($routeProvider) {
	$routeProvider
		.when('/', {															// Home page (main route)				
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
		})
}