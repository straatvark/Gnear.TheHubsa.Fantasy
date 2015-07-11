
tdfApp.controller('sprintClassificationCtrl', function ($scope, $rootScope, $http, $filter, diDataService, theHubFantasyService) {
    $scope.content = "Need dev here";

    // todo - trigger a event like this from somewhere
    $rootScope.$on('theHubFantasyService_todo-something reloaded sprint points', function () {
        // todo: add functionality for a sprint postion points on rider
        // var orderedTeams = $filter('orderBy')(theHubFantasyService.theHubTeams.Teams, "xxxPosition", false);
        // $scope.sprintTeams = orderedTeams;
    });
});
