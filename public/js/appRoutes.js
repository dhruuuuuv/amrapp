angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        //farms page to use the FarmController
        .when('/farms', {
            templateUrl: 'views/farm.html',
            controller: 'FarmController'
        })

        // homepage
        // .when('/', {
        //     templateUrl: 'views/home.html'
        //     controller: 'MainController'
        // });

    $locationProvider.html5Mode(true);


}]);
