'use strict';

angular
	.module('app', [
		'ngRoute',
		'firebase',
		'config.app'
	])
	
	.config(function ($routeProvider, $locationProvider) {
		$locationProvider
			.html5Mode(false)
		;
		
		$routeProvider
			.when('/:party/:username', {controller: 'AppCtrl', templateUrl: '/app.html'})
			.otherwise({controller: 'AppCtrl', templateUrl: 'app.html'})
		;
	})
	
	.controller('AppCtrl', function ($scope, $routeParams, $firebase, API_URL) {
		var ref;
		
		$scope.ceremony = {
			name: 'Bernice & Keith White\'s Home',
			location: '17 Crowe\'s Ln Torbay Newfoundland Canada',
			time: 'at 3 in the afternoon'
		};
		$scope.reception = {
			name: 'Bella Vista',
			location: 'Bella Vista Event Room, 24 Torbay Road, St. John\'s, NL A1A 2G3',
			time: 'at half past 7 in the evening',
			link: 'http://bellavista.ca'
		};
		
		var check = function () {
			if ($routeParams.username) {
				if ($routeParams.party === 'groomsmen') {
					$scope.person = _.find($scope.groomsmen, {username: $routeParams.username});
					$scope.groomsman = true;
				}
				else if ($routeParams.party === 'bridesmaids') {
					$scope.person = _.find($scope.bridesmaids, {username: $routeParams.username});
					$scope.bridesmaid = true;
				}
			}
		};
		
		ref = new Firebase(API_URL + '/groomsmen');
		var groomsmen = $firebase(ref);
		$scope.groomsmen = groomsmen.$asArray();
		$scope.groomsmen.$loaded().then(check);
		
		ref = new Firebase(API_URL + '/bridesmaids');
		var bridesmaids = $firebase(ref);
		$scope.bridesmaids = bridesmaids.$asArray();
		$scope.bridesmaids.$loaded().then(check);
		
		
		$scope.accept = function () {
			$scope.person.accepted = true;
			if ($routeParams.party === 'groomsmen') {
				$scope.groomsmen.$save($scope.person);
			}
			else if ($routeParams.party === 'bridesmaids') {
				$scope.bridesmaids.$save($scope.person);
			}
		};
		
		// groomsmen.$push({
		// 	firstname: 'Jared',
		// 	lastname: 'Perry',
		// 	username: 'jared_perry',
		// 	social: 'twitter',
		// 	best: true,
		// 	accepted: true
		// });
		// groomsmen.$push({
		// 	firstname: 'Stephen',
		// 	lastname: 'Brown',
		// 	username: 'stephenbrown84',
		// 	social: 'facebook',
		// 	accepted: true
		// });
		// groomsmen.$push({
		// 	firstname: 'Donal',
		// 	lastname: 'Mac An Ri',
		// 	username: 'donalmacanri',
		// 	social: 'facebook',
		// 	accepted: true
		// });
		// groomsmen.$push({
		// 	firstname: 'Zachary',
		// 	lastname: 'Brown',
		// 	username: 'Zach.D.Brown',
		// 	social: 'facebook',
		// 	accepted: true
		// });
		// groomsmen.$push({
		// 	firstname: 'Randy',
		// 	lastname: 'Way',
		// 	username: 'Rway6',
		// 	social: 'facebook',
		// 	accepted: true
		// });
		// groomsmen.$push({
		// 	firstname: 'Ern',
		// 	lastname: 'Way',
		// 	username: 'ern.way.7',
		// 	social: 'facebook',
		// 	accepted: true
		// });
		// 
		// bridesmaids.$push({
		// 	firstname: 'Deanna',
		// 	lastname: 'Way',
		// 	username: 'deanna.way.5',
		// 	social: 'facebook',
		// 	best: true,
		// 	accepted: true
		// });
		// bridesmaids.$push({
		// 	firstname: 'Kayla',
		// 	lastname: 'Gould',
		// 	username: 'kayla.white.37454',
		// 	social: 'facebook',
		// 	accepted: true
		// });
		// bridesmaids.$push({
		// 	firstname: 'Stacie',
		// 	lastname: 'Wakeham',
		// 	username: 'staciewakeham',
		// 	social: 'facebook',
		// 	accepted: true
		// });
		// bridesmaids.$push({
		// 	firstname: 'Melissa',
		// 	lastname: 'Beresford',
		// 	username: 'melissakberesford',
		// 	social: 'facebook',
		// 	accepted: true
		// });
		// bridesmaids.$push({
		// 	firstname: 'Emma',
		// 	lastname: 'Brown',
		// 	username: 'emma.brown.7967',
		// 	social: 'facebook',
		// 	accepted: true
		// });
		// bridesmaids.$push({
		// 	firstname: 'Laura',
		// 	lastname: 'Williams',
		// 	username: '605080095',
		// 	social: 'facebook',
		// 	accepted: true
		// });
	})
;