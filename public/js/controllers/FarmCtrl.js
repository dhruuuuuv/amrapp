angular.module('FarmCtrl', []).controller('FarmController', [
    '$scope',
    'Farm',
     function($scope, Farm) {
        $scope.tagline = 'I am a test farm.';
        $scope.farm = Farm;
    }
]);
