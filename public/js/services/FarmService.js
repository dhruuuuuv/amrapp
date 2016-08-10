angular.module('FarmService', []).factory('Farm', ['$http', function($http) {

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
    };

    return o;

    // return {
    //     //call to get all farms
    //     get : function() {
    //         return $http.get('/api/farms');
    //     },
    //
    //     // work when API routes defined in NODE side
    //
    //     //call POST and create new farm
    //     create : function(farmData) {
    //         return $http.post('/api/farms', farmData);
    //     },
    //
    //     //call to DELETE farm
    //     delete : function(id) {
    //         return $http.delete('/api/farms' + id);
    //     }
    // }

}]);
