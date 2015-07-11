
tdfApp.controller('generalClassificationCtrl', function ($scope, $rootScope, $http, $filter, diDataService, theHubFantasyService) {
    $scope.content = "Need dev here";

    // this event is already triggered - the handling needs work though:
    $rootScope.$on('theHubFantasyService_recalculated', function () {
        // todo: add functionality for a GCPostion, will need added logic in theHubFantasyService - look at rider.GeneralClassificationTimeAllStages in didata service
        // var orderedTeams = $filter('orderBy')(theHubFantasyService.theHubTeams.Teams, "somegcPosition", false);
        // $scope.gcTeams = orderedTeams;
    });
});
