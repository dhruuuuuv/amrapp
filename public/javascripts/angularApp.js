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
                    farmPromise: ['superfarms', function(superfarms) {
                        return superfarms.getAllFarms();
                    }]
                }
            })

            .state('superfarms', {
                url: '/superfarms/{farm_number}',
                templateUrl: '/superfarms.html',
                controller: 'SuperfarmsCtrl',
                resolve: {
                    superfarm: ['$stateParams', 'superfarms', function($stateParams, superfarms) {
                        return superfarms.getFarm($stateParams.farm_number);
                    }]
                }
            })

            .state('cows', {
                parent: 'superfarms',
                url: '/{animal_id}',
                templateUrl: '/superfarms/cows.html',
                controller: 'CowsCtrl',
                resolve: {
                    superfarm: ['$stateParams', 'superfarms', function($stateParams, superfarms) {
                        // console.log($stateParams);
                        return superfarms.getCow($stateParams.farm_number, $stateParams.animal_id);

                    }]
                }
            })

            .state('isolates', {
                parent: 'cows',
                url: '/{isolate_number}',
                templateUrl: '/superfarms/cows/isolates.html',
                controller: 'IsolatesCtrl',
                resolve: {
                    superfarm: ['$stateParams', 'superfarms', function($stateParams, superfarms) {
                        // console.log(superfarms.getIsolate($stateParams.farm_number, $stateParams.animal_id));
                        return superfarms.getIsolate($stateParams.farm_number, $stateParams.animal_id, $stateParams.isolate_number);

                    }]
                }
            });

            $urlRouterProvider.otherwise('home');
    }
]);

//farm service
app.factory('superfarms', ['$http',
    function($http){
        //service body

        var o = {
            superfarms: [],
            // isolate_number: 0
        };

        o.getAllFarms = function() {
            return $http.get('/superfarms').success(function(data){
                angular.copy(data, o.superfarms);
            });
        };

        o.createFarm = function(superfarm) {
            return $http.post('/superfarms', superfarm).success(function(data){
                o.superfarms.push(data);
            });
        };

        o.getFarm = function(farm_number) {
            return $http.get('/superfarms/' + farm_number).then(function(res){
                return res.data;
            });
        };

        o.getCow = function(farm_number, animal_id) {
            return $http.get('/superfarms/' + farm_number + '/' + animal_id).then(function(res){
                return res.data;
            });
        };

        o.getIsolate = function(farm_number, animal_id, isolate_number) {
            return $http.get('/superfarms/' + farm_number + '/' + animal_id + '/' + isolate_number).then(function(res){
                // o.isolate_number = isolate_number;
                return res.data;
            });
        };

        o.deleteFarm = function(farm_number) {
            return $http.delete('/superfarms/' + farm_number).success(function(data){
                console.log('deleted superfarm id ' + data);
            });
        }

        return o;
    }
]);

app.controller('MainCtrl', [
    '$scope',
    'superfarms',
    function($scope, superfarms) {
        $scope.test = 'Hello world!';
        $scope.superfarms = superfarms.superfarms;


        $scope.addSuperfarm = function() {

            var i = 0;

            if (!$scope.farm_number || $scope.farm_number === ''
            ) {
                return;
            }

            for (i; i < $scope.superfarms.length; i++) {
                if ($scope.superfarms[i].farm_number == $scope.farm_number ) {
                    return 0;
                    console.log("duplicate");
                }
            }

            superfarms.create({
                // farm_number: $scope.farm_number
                farm_number             : $scope.farm_number,
                // number_cows             : $scope.number_cows,
                // number_samples_tested   : $scope.number_samples_tested,
                // isolates_samples        : $scope.isolates_samples,
                // esbl_isolates           : $scope.esbl_isolates,
                // multidrug_res_isolates  : $scope.multidrug_res_isolates,
                // amr_SXT                 : $scope.amr_SXT,
                // amr_CAZ                 : $scope.amr_CAZ,
                // amr_TE                  : $scope.amr_TE,
                // amr_EFT                 : $scope.amr_EFT,
                // amr_CIP                 : $scope.amr_CIP,
                // amr_CTX                 : $scope.amr_CTX,
                // amr_FOX                 : $scope.amr_FOX,
                // amr_AML                 : $scope.amr_AML,
                // amr_NA                  : $scope.amr_NA,
                // amr_IPM                 : $scope.amr_IPM,
                // amr_C                   : $scope.amr_C,
                // amr_P                   : $scope.amr_P,
                // amr_CL                  : $scope.amr_CL,
                // amr_AMC                 : $scope.amr_AMC,
                // amr_S                   : $scope.amr_S
            });

            // $scope.farm_number = '';
            $scope.farm_number             = '';
            // $scope.number_cows             = '';
            // $scope.number_samples_tested   = '';
            // $scope.isolates_samples        = '';
            // $scope.esbl_isolates           = '';
            // $scope.multidrug_res_isolates  = '';
            // $scope.amr_SXT                 = '';
            // $scope.amr_CAZ                 = '';
            // $scope.amr_TE                  = '';
            // $scope.amr_EFT                 = '';
            // $scope.amr_CIP                 = '';
            // $scope.amr_CTX                 = '';
            // $scope.amr_FOX                 = '';
            // $scope.amr_AML                 = '';
            // $scope.amr_NA                  = '';
            // $scope.amr_IPM                 = '';
            // $scope.amr_C                   = '';
            // $scope.amr_P                   = '';
            // $scope.amr_CL                  = '';
            // $scope.amr_AMC                 = '';
            // $scope.amr_S                   = '';

        };

        $scope.deleteSuperfarm = function() {

            superfarms.delete($scope.farm_number);

            var index, i = 0;

            for (i; i < $scope.superfarms.length; i++) {
                if ($scope.superfarms[i].farm_number == $scope.farm_number ) {
                    index = i;
                    break;
                }
            }

            $scope.superfarms.splice(index, 1);

            $scope.farm_number = '';
        };
    }
]);

app.controller('SuperfarmsCtrl', [
    '$scope',
    'superfarms',
    'superfarm',
    function($scope, superfarms, superfarm) {
        $scope.superfarm = superfarm;
        // console.log(superfarm);
        $scope.cows      = superfarm.cows;

        // $scope.$on('$viewContentLoaded', function () {
        //     window.scrollTo(0, 0);
        // });
    }
]);

app.controller('CowsCtrl', [
    '$scope',
    'superfarms',
    'superfarm',
    function($scope, superfarms, superfarm) {
        // console.log(superfarm);
        $scope.superfarm = superfarm;
        $scope.cow = superfarm.cows[0];


        $scope.filterCow = function(items) {
            var result = {};
            angular.forEach(items, function(value, key) {
                if (key != "isolates") {
                    result[key] = value;
                }
            });
            return result;
        }
        //
        // $scope.$on('$viewContentLoaded', function () {
        //     window.scrollTo(50, 50);
        // });

    }
]);

app.controller('IsolatesCtrl', [
    '$scope',
    'superfarms',
    // 'isolate_number',
    'superfarm',
    function($scope, superfarms, superfarm) {
        $scope.superfarm = superfarm;
        // console.log($scope.superfarm);
        // $scope.cow = superfarm.cows[0];

        $scope.isolate = $scope.superfarm[0].isolates;

        $scope.filterIsolate = function(items) {
            var result = {};
            angular.forEach(items, function(value, key) {
                if (key != "antimicrobials") {
                    result[key] = value;
                }
            });
            return result;
        }

    }
]);
