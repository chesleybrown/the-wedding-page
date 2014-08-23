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
		// 	name: 'Jared Perry',
		// 	accepted: false,
		// }).then(function(ref) {
		// 	var groomsman = $firebase(ref);
		// 	groomsman.$priority = 6;
		// 	groomsman.$save();
		// });
		// groomsmen.$push({
		// 	name: 'Donal Mac An Ri',
		// 	username: 'donalmacanri',
		// 	accepted: false
		// }).then(function(ref) {
		// 	var groomsman = $firebase(ref);
		// 	groomsman.$priority = 5;
		// 	groomsman.$save();
		// });
		// groomsmen.$push({
		// 	name: 'Stephen Brown',
		// 	username: 'stephenbrown84',
		// 	accepted: false
		// }).then(function(ref) {
		// 	var groomsman = $firebase(ref);
		// 	groomsman.$priority = 4;
		// 	groomsman.$save();
		// });
		// groomsmen.$push({
		// 	name: 'Zachary Brown',
		// 	username: 'Zach.D.Brown',
		// 	accepted: false
		// }).then(function(ref) {
		// 	var groomsman = $firebase(ref);
		// 	groomsman.$priority = 3;
		// 	groomsman.$save();
		// });
		// groomsmen.$push({
		// 	name: 'Randy Way',
		// 	username: 'Rway6',
		// 	accepted: false
		// }).then(function(ref) {
		// 	var groomsman = $firebase(ref);
		// 	groomsman.$priority = 2;
		// 	groomsman.$save();
		// });
		// groomsmen.$push({
		// 	name: 'Ern Way',
		// 	username: 'ern.way.7',
		// 	accepted: false
		// }).then(function(ref) {
		// 	var groomsman = $firebase(ref);
		// 	groomsman.$priority = 1;
		// 	groomsman.$save();
		// });
		
		// bridesmaids.$push({
		// 	name: 'Deanna Way',
		// 	username: 'deanna.way.5',
		// 	accepted: true
		// }).then(function(ref) {
		// 	var bridesmaid = $firebase(ref);
		// 	bridesmaid.$priority = 6;
		// 	bridesmaid.$save();
		// });
		// bridesmaids.$push({
		// 	name: 'Tamara Way',
		// 	username: 'tamara.macdonald.9',
		// 	accepted: false
		// }).then(function(ref) {
		// 	var bridesmaid = $firebase(ref);
		// 	bridesmaid.$priority = 5;
		// 	bridesmaid.$save();
		// });
		// bridesmaids.$push({
		// 	name: 'Kayla Gould',
		// 	username: 'kayla.white.37454',
		// 	accepted: false
		// }).then(function(ref) {
		// 	var bridesmaid = $firebase(ref);
		// 	bridesmaid.$priority = 4;
		// 	bridesmaid.$save();
		// });
		// bridesmaids.$push({
		// 	name: 'Melissa Beresford',
		// 	username: 'melissakberesford',
		// 	accepted: true
		// }).then(function(ref) {
		// 	var bridesmaid = $firebase(ref);
		// 	bridesmaid.$priority = 3;
		// 	bridesmaid.$save();
		// });
		// bridesmaids.$push({
		// 	name: 'Stacie Wakeham',
		// 	username: 'staciewakeham',
		// 	accepted: true
		// }).then(function(ref) {
		// 	var bridesmaid = $firebase(ref);
		// 	bridesmaid.$priority = 2;
		// 	bridesmaid.$save();
		// });
		// bridesmaids.$push({
		// 	name: 'Emma Brown',
		// 	username: 'emma.brown.7967',
		// 	accepted: true
		// }).then(function(ref) {
		// 	var bridesmaid = $firebase(ref);
		// 	bridesmaid.$priority = 1;
		// 	bridesmaid.$save();
		// });
	})
;