angular.module('FarmCtrl', []).controller('FarmController', [
    '$scope',
    'farms',
    'farm',
     function($scope, farms) {
        $scope.tagline = 'I am a test farm.';
        $scope.test_farms = [
            'farm_1',
            'farm_2',
            'farm_3',
            'farm_4',
            'farm_5',
            'farm_6',
            'farm_7'
        ];

    }
]);
