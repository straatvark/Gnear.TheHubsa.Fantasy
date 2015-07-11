
tdfApp.controller('mountainClassificationCtrl', function ($scope, $rootScope, $http, $filter, diDataService, theHubFantasyService) {
    $scope.content = "Need dev here";

    // todo - trigger a event like this from somewhere
    $rootScope.$on('theHubFantasyService_todo-something reloaded mtb points', function () {
        // todo: add functionality for a mountain postion points on rider
        // var orderedTeams = $filter('orderBy')(theHubFantasyService.theHubTeams.Teams, "stagePosition", false);
        // $scope.mountainTeams = orderedTeams;
    });
});
