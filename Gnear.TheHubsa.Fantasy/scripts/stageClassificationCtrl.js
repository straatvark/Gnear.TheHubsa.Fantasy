
tdfApp.controller('stageClassificationCtrl', function ($scope, $rootScope, $http, $filter, diDataService, theHubFantasyService) {
    //$scope.firstName = "John";
    //$scope.lastName = "Doe";


    $rootScope.$on('theHubFantasyService_recalculated', function () {
        $scope.stageTeams = theHubFantasyService.stageTeams;
    });
});
