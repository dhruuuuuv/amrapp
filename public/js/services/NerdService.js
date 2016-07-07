angular.module('NerdService', []).factory('Nerd', ['$http', function($http) {

    return {
        //call to get all nerds
        get : function() {
            return $http.get('/api/nerds');
        },

        // work when API routes defined in NODE side

        //call POST and create new nerd
        create : function(nerdData) {
            return $http.post('/api/nerds', nerdData);
        },

        //call to DELETE nerd

        delete : function(id) {
            return $http.delete('/api/nerds' + id);
        }
    }

}]);
