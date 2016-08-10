angular.module('MainCtrl', []).controller('MainController', [
    '$scope',
    'farms',
     function($scope, farms) {
        $scope.tagline = 'I am the main controller!';
        $scope.farms = farms.farms;

        $scope.addFarm = function() {
            if (!$scope.farm_number || $scope.farm_number === '' ) {
                return;
            }

            farms.create({
                farm_number = $scope.farm_number,
            });

            $scope.farm_number = '';
        };
     }

]);
