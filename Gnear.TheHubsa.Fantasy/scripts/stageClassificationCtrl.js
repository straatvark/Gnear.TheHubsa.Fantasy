
tdfApp.controller('stageClassificationCtrl', function ($scope, $rootScope, $http, $filter, diDataService, theHubFantasyService) {

    $rootScope.$on('theHubFantasyService_recalculated', function () {
        var orderedTeams = $filter('orderBy')(theHubFantasyService.theHubTeams.Teams, "stagePosition", false);
        $scope.stageTeams = orderedTeams;
    });

});
