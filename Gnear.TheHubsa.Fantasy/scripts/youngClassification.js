
tdfApp.controller('youngClassificationCtrl', function ($scope, $rootScope, $http, $filter, diDataService, theHubFantasyService) {
    $scope.content = "Need dev here";

    // this event is already triggered - the handling needs work though:
    $rootScope.$on('theHubFantasyService_recalculated', function () {
        // todo: add functionality for a young Postion, will need added logic in theHubFantasyService - look at rider.YoungClassificationTimeAllStages in didata service
        // var orderedTeams = $filter('orderBy')(theHubFantasyService.theHubTeams.Teams, "youngPosition", false);
        // $scope.youngTeams = orderedTeams;
    });
});
