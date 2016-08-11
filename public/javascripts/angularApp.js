var app = angular.module('cowllection', ['ui.router']);

//configuration and routes
app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('home', {
                url: '/home',
                templateUrl: '/home.html',
                controller: 'MainCtrl',
                resolve: {
                    farmPromise: ['farms', function(farms) {
                        return farms.getAll();
                    }]
                }
            })

            .state('farms', {
                url: '/farms/{farm_number}',
                templateUrl: '/farms.html',
                controller: 'FarmsCtrl',
                resolve: {
                    farm: ['$stateParams', 'farms', function($stateParams, farms) {
                        return farms.get($stateParams.farm_number);
                    }]
                }
            });

            $urlRouterProvider.otherwise('home');
    }
]);

//farm service
app.factory('farms', ['$http',
    function($http){
        //service body

        var o = {
            farms: []
        };

        o.getAll = function() {
            return $http.get('/farms').success(function(data){
                angular.copy(data, o.farms);
            });
        };

        o.create = function(farm) {
            return $http.post('/farms', farm).success(function(data){
                o.farms.push(data);
            });
        };

        o.get = function(farm_number) {
            return $http.get('/farms/' + farm_number).then(function(res){
                return res.data;
            });
        };

        o.delete = function(farm_number) {
            return $http.delete('/farms/' + farm_number).success(function(data){
                console.log('deleted farm id ' + data);
            });
        }

        return o;
    }
]);

app.controller('MainCtrl', [
    '$scope',
    'farms',
    function($scope, farms) {
        $scope.test = 'Hello world!';
        $scope.farms = farms.farms;

        $scope.addFarm = function() {
            if (!$scope.farm_number || $scope.farm_number === '' ) {
                return;
            }

            farms.create({
                // farm_number: $scope.farm_number
                farm_number             : $scope.farm_number,
                number_cows             : $scope.number_cows,
                number_samples_tested   : $scope.number_samples_tested,
                isolates_samples        : $scope.isolates_samples,
                esbl_isolates           : $scope.esbl_isolates,
                multidrug_res_isolates  : $scope.multidrug_res_isolates,
                amr_SXT                 : $scope.amr_SXT,
                amr_CAZ                 : $scope.amr_CAZ,
                amr_TE                  : $scope.amr_TE,
                amr_EFT                 : $scope.amr_EFT,
                amr_CIP                 : $scope.amr_CIP,
                amr_CTX                 : $scope.amr_CTX,
                amr_FOX                 : $scope.amr_FOX,
                amr_AML                 : $scope.amr_AML,
                amr_NA                  : $scope.amr_NA,
                amr_IPM                 : $scope.amr_IPM,
                amr_C                   : $scope.amr_C,
                amr_P                   : $scope.amr_P,
                amr_CL                  : $scope.amr_CL,
                amr_AMC                 : $scope.amr_AMC,
                amr_S                   : $scope.amr_S
            });

            // $scope.farm_number = '';
            $scope.farm_number             = '';
            $scope.number_cows             = '';
            $scope.number_samples_tested   = '';
            $scope.isolates_samples        = '';
            $scope.esbl_isolates           = '';
            $scope.multidrug_res_isolates  = '';
            $scope.amr_SXT                 = '';
            $scope.amr_CAZ                 = '';
            $scope.amr_TE                  = '';
            $scope.amr_EFT                 = '';
            $scope.amr_CIP                 = '';
            $scope.amr_CTX                 = '';
            $scope.amr_FOX                 = '';
            $scope.amr_AML                 = '';
            $scope.amr_NA                  = '';
            $scope.amr_IPM                 = '';
            $scope.amr_C                   = '';
            $scope.amr_P                   = '';
            $scope.amr_CL                  = '';
            $scope.amr_AMC                 = '';
            $scope.amr_S                   = '';

        };

        $scope.deleteFarm = function() {

            farms.delete($scope.farm_number);
            $scope.farm_number = '';

        };
    }
]);

app.controller('FarmsCtrl', [
    '$scope',
    'farms',
    'farm',
    function($scope, farms, farm) {
        $scope.farm = farm;

        $scope.tagline = 'I am a test farm.';
    }
]);
