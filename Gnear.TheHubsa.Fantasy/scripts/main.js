var tdfApp = angular.module('tdfApp', []);

//tdfApp.factory('diDataService', function ($rootScope, $http, $filter) {

//    var aa = new diDataServiceA($rootScope, $http, $filter);

//    $rootScope.$on('theHubFantasyService_initialized', function () {
//        aa.init();
//    });

//    $rootScope.$on('theHubFantasyService_pleaseRefreshDiData', function () {
//        aa.refreshRace();
//    });


//    //this.broadcastInitialized = function () {
//    //    $rootScope.$broadcast('diDataService_initialized');
//    //};

//    //this.broadcastRaceRefreshed = function () {
//    //    $rootScope.$broadcast('diDataService_raceRefreshed');
//    //};

//    return aa;
//});



//tdfApp.controller('myCtrl', function ($scope, $http, $filter) {
//    $scope.firstName = "John";
//    $scope.lastName = "Doe";
//});

//    $http.get('Data/current.json').then(function (res) {
//        $scope.current = res.data;
//    });

//    $http.get('Data/route.json').then(function (res) {
//        $scope.route = res.data;
//    });

//    $http.get('Data/rider.json').then(function (res) {
//        $scope.riders = res.data;
//    });

//    $http.get('Data/theHubTeams.json').then(function (res) {
//        $scope.theHubTeams = res.data;
//    });

//    $http.get('Data/riderclassification.json').then(function (res) {
//        $scope.riderclassification = res.data;
//    });

//    $http.get('Data/status.json').then(function (res) {
//        $scope.status = res.data;
//    });

//    $http.get('Data/race.json').then(function (res) {
//        $scope.race = res.data;
//        $scope.recalcTeams();
//    });



//    $scope.recalcTeams = function () {
//        angular.forEach($scope.theHubTeams.Teams, function (team) {
//            $scope.recalcTeam(team);
//        });
//    }

//    $scope.recalcTeam = function (team) {
//        //angular.forEach($scope.theHubTeams.Teams, function (team) {
//        console.log(team.Owner);
//        console.log(team.Riders.Rider1);


//        $scope.setRiderGeneralClassification(team.Riders.Rider1);

//        var rider1GapToLeader = $scope.calcRiderGapToLeader(team.Riders.Rider1);
//        var rider2GapToLeader = $scope.calcRiderGapToLeader(team.Riders.Rider2);
//        var rider3GapToLeader = $scope.calcRiderGapToLeader(team.Riders.Rider3);
//        var rider4GapToLeader = $scope.calcRiderGapToLeader(team.Riders.Rider4);
//        var rider5GapToLeader = $scope.calcRiderGapToLeader(team.Riders.Rider5);
//        var rider6GapToLeader = $scope.calcRiderGapToLeader(team.Riders.Rider6);
//        var rider7GapToLeader = $scope.calcRiderGapToLeader(team.Riders.Rider7);
//        var rider8GapToLeader = $scope.calcRiderGapToLeader(team.Riders.Rider8);
//        var rider9GapToLeader = $scope.calcRiderGapToLeader(team.Riders.Rider9);


//        var teamGapToLeader = 0;

//        console.log(dd);
//        //});
//    }


//    $scope.setRiderGeneralClassification = function (teamRider) {
//        //var riderFoundInClassification = false;
//        //var riderTime = 0;

//        var d = $filter('filter')($scope.riders, { Id: teamRider }, true);

//        var gcPosition = 0;
//        var gcTime = 0;
//        //"GeneralClassification": "13, 00:01:50",
//        teamRider.GeneralClassification = d.GeneralClassification;



//        //return riderTime;
//    }


//    $scope.calcRiderGapToLeader = function (riderId) {
//        var riderFoundInRace = false;
//        var riderTime = 0;

//        angular.forEach($scope.race.Groups, function (group) {
//            if (!riderFoundInRace) {
//                riderTime += group.GapToPreviousGroupT;
//                angular.forEach(group.Riders, function (groupRider) {
//                    if (!riderFoundInRace && groupRider.Id == riderId) {
//                        riderTime += groupRider.GapToFirstRiderGroupT;
//                        riderFoundInRace = true;
//                    }
//                });
//            }
//        });

//        return riderTime;
//    }


//});