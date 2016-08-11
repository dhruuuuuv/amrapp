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

            farm.create({
                farm_number: $scope.farm_number
            });

            $scope.farm_number = '';
        };
    }
]);

app.controller('FarmsCtrl', [
    '$scope',
    'farms',
    'farm',
    function($scope, farms) {
        $scope.farm = farm;

        $scope.tagline = 'I am a test farm.';
    }
]);
