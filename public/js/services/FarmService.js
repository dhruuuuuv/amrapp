angular.module('FarmService', []).factory('Farm', ['$http', function($http) {

    return {
        //call to get all farms
        get : function() {
            return $http.get('/api/farms');
        },

        // work when API routes defined in NODE side

        //call POST and create new farm
        create : function(farmData) {
            return $http.post('/api/farms', farmData);
        },

        //call to DELETE farm
        delete : function(id) {
            return $http.delete('/api/farms' + id);
        }
    }

}]);
