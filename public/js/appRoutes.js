angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

$routeProvider

    //homepage
    .when('/', {
        templateUrl: 'views/home.html'
        controller: 'MainController'
    })

    //farms page to use the FarmController
    .when('/farms', {
        templateUrl: 'views/farm.html',
        controller: 'FarmController'
    });

$locationProvider.html5Mode(true);


}]);
