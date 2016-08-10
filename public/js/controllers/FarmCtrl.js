angular.module('FarmCtrl', []).controller('FarmController', [
    '$scope',
    'farms',
    'farm',
     function($scope, farms) {
        $scope.tagline = 'I am a test farm.';
        $scope.farm = farm;
    }
]);
