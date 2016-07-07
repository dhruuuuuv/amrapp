angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

$routeProvider

    //homepage
    .when('/', {
        templateUrl: 'views/home.html'
        controller: 'MainController'
    })

    //nerds page to use NerdController
    .when('/nerds', {
        templateUrl: 'views/nerd.html',
        controller: 'NerdController'
    });

$locationProvider.html5Mode(true);


}]);
