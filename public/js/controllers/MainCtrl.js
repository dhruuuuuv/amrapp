angular.module('MainCtrl', []).controller('MainController', [
    '$scope',
    'Farm',
     function($scope, Farm) {
        $scope.tagline = 'I am the main controller!';
        $scope.farms = Farm.farms;

        $scope.addFarm = function() {
            if (!$scope.farm_number || $scope.farm_number === '' ) {
                return;
            }

            farms.create({
                farm_number: $scope.farm_number,
            });

            $scope.farm_number = '';
        };
     }

]);
