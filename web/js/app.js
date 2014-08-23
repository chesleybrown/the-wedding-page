'use strict';

angular
	.module('app', [
		'ngRoute',
		'firebase',
		'config.app'
	])
	
	.config(function ($routeProvider, $locationProvider) {
		$locationProvider
			.html5Mode(true)
		;
		
		$routeProvider
			.otherwise({controller: 'AppCtrl', templateUrl: 'app.html'})
		;
	})
	
	.controller('AppCtrl', function ($scope, $firebase, API_URL) {
		var ref;
		ref = new Firebase(API_URL + '/groomsmen');
		var groomsmen = $firebase(ref);
		$scope.groomsmen = groomsmen.$asArray();
		
		ref = new Firebase(API_URL + '/bridesmaid');
		var bridesmaids = $firebase(ref);
		$scope.bridesmaids = bridesmaids.$asArray();
		
		
		// groomsmen.$push({
		// 	firstname: 'Jared',
		// 	lastname: 'Perry',
		// 	accepted: false,
		// });
		// groomsmen.$push({
		// 	firstname: 'Donal',
		// 	lastname: 'Mac An Ri',
		// 	username: 'donalmacanri',
		// 	accepted: false
		// });
		// groomsmen.$push({
		// 	firstname: 'Stephen',
		// 	lasstname: 'Brown',
		// 	username: 'stephenbrown84',
		// 	accepted: false
		// });
		// groomsmen.$push({
		// 	firstname: 'Zachary',
		// 	lastname: 'Brown',
		// 	username: 'Zach.D.Brown',
		// 	accepted: false
		// });
		// groomsmen.$push({
		// 	firstname: 'Randy',
		// 	lasatname: 'Way',
		// 	username: 'Rway6',
		// 	accepted: false
		// });
		// groomsmen.$push({
		// 	fistname: 'Ern',
		// 	lastname: 'Way',
		// 	username: 'ern.way.7',
		// 	accepted: false
		// });
		
		// bridesmaids.$push({
		// 	firstname: 'Deanna',
		// 	lastname: 'Way',
		// 	username: 'deanna.way.5',
		// 	accepted: true
		// });
		// bridesmaids.$push({
		// 	firstname: 'Tamara',
		// 	lastname: 'Way',
		// 	username: 'tamara.macdonald.9',
		// 	accepted: false
		// });
		// bridesmaids.$push({
		// 	firstname: 'Kayla',
		// 	lastname: 'Gould',
		// 	username: 'kayla.white.37454',
		// 	accepted: false
		// });
		// bridesmaids.$push({
		// 	firstname: 'Melissa',
		// 	lastname: 'Beresford',
		// 	username: 'melissakberesford',
		// 	accepted: true
		// });
		// bridesmaids.$push({
		// 	firstname: 'Stacie',
		// 	lastname: 'Wakeham',
		// 	username: 'staciewakeham',
		// 	accepted: true
		// });
		// bridesmaids.$push({
		// 	firstname: 'Emma',
		// 	lastname: 'Brown',
		// 	username: 'emma.brown.7967',
		// 	accepted: true
		// });
	})
;