var app = angular.module('cowllection', ['ui.router']);

//configuration and routes
app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('home', {
                url: '/home.html',
                templateUrl: '/home.html',
                controller: 'MainCtrl',
                resolve: {
                    farmPromise: ['farms', function(farms) {
                        return farms.getAll();
                    }]
                }
            })

            .state('farms', {
                url: '/farms/{id}',
                templateUrl: 'farms.html',
                controller: 'FarmCtrl',
                resolve: {
                    farm: ['$stateParams', 'farms', function($stateParams, farms) {
                        return farms.get($stateParams.id);
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
            return $http.get('/api/farms').success(function(data){
                angular.copy(data, o.farms);
            });
        };

        o.create = function(farm) {
            return $http.post('/api/farms', farm).success(function(data){
                o.farms.push(data);
            });
        };

        o.get = function(id) {
            return $http.get('/api/farms/' + id).then(function(res){
                return res.data;
            });
        };

        o.delete = function(id) {
            return $http.delete('/api/farms/' + id).success(function(data){
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
        $scope.tagline = 'Hello world!';
        $scope.farms = farms.farms;

        $scope.addFarm = function() {
            if (!$scope.farm_number || $scope.farm_number === '' ) {
                return;
            }

            Farm.create({
                farm_number: $scope.farm_number,
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
        $scope.farms = farm;

        $scope.tagline = 'I am a test farm.';
    }
]);
