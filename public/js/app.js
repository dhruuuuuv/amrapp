angular.module('sampleApp', ['ngRoute', 'appRoutes', 'MainCtrl', 'FarmCtrl', 'FarmService'])
.controller('db', ['$scope', 'Farm', function($scope, Farm) {
    Farm.get().then(function(farms) {
        $scope.farms = farms;
    });
}]);
