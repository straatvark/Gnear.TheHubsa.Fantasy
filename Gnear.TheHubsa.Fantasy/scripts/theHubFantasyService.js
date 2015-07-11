tdfApp.factory('theHubFantasyService', function ($rootScope, $http, $filter, diDataService) {


    // interface
    var theHubFantasyService = {

        // properties
        theHubTeamsUrl: '',
        raceRefreshInterval: 2000, //default 2 seconds, updated from config file
        theHubTeams: null,
        stageTeams: null,
        //potential for GC, points etc teams

        // broadcast messages
        broadcast_Initialized: broadcast_Initialized,
        broadcast_pleaseRefreshDiData: broadcast_pleaseRefreshDiData,
        broadcast_recalculated: broadcast_recalculated,


        //functions
        initialize: initialize,
        recalculate: recalculate,
        recalculateTeamStagePosition: recalculateTeamStagePosition,
        recalculateTeamRiderStagePosition: recalculateTeamRiderStagePosition,

    };

   
    $rootScope.$on('diDataService_initialized', function () {
        theHubFantasyService.broadcast_pleaseRefreshDiData();
    });

    $rootScope.$on('diDataService_raceRefreshed', function () {
        theHubFantasyService.recalculate();
    });

       
    function broadcast_Initialized() {
        $rootScope.$broadcast('theHubFantasyService_initialized');
        $rootScope.$broadcast('please_InitializeDiData');
    };

    function broadcast_pleaseRefreshDiData() {
        $rootScope.$broadcast('please_RefreshDiData');
    };
    
    function broadcast_recalculated() {
        $rootScope.$broadcast('theHubFantasyService_recalculated');
        setTimeout(theHubFantasyService.broadcast_pleaseRefreshDiData, theHubFantasyService.raceRefreshInterval);
    };

    function initialize() {
        $http.get('config/diDataConfigOnline.json').then(function (diDataConfig) {
            theHubFantasyService.theHubTeamsUrl = diDataConfig.data.theHubTeamsUrl;
            theHubFantasyService.raceRefreshInterval = diDataConfig.data.raceRefreshInterval;
            $http.get(theHubFantasyService.theHubTeamsUrl).then(function (res) {
                theHubFantasyService.theHubTeams = res.data;
                theHubFantasyService.broadcast_Initialized();
            });
        });
    };

    function recalculate() {
        angular.forEach(theHubFantasyService.theHubTeams.Teams, function (team) {
            theHubFantasyService.recalculateTeamStagePosition(team);
        });

        var orderedTeams = $filter('orderBy')(theHubFantasyService.theHubTeams.Teams, "stagePosition", false);
        theHubFantasyService.stageTeams = orderedTeams;

        theHubFantasyService.broadcast_recalculated();
    }

    function recalculateTeamStagePosition(team) {

        theHubFantasyService.recalculateTeamRiderStagePosition(team.Riders.Rider1);
        theHubFantasyService.recalculateTeamRiderStagePosition(team.Riders.Rider2);
        theHubFantasyService.recalculateTeamRiderStagePosition(team.Riders.Rider3);
        theHubFantasyService.recalculateTeamRiderStagePosition(team.Riders.Rider4);
        theHubFantasyService.recalculateTeamRiderStagePosition(team.Riders.Rider5);
        theHubFantasyService.recalculateTeamRiderStagePosition(team.Riders.Rider6);
        theHubFantasyService.recalculateTeamRiderStagePosition(team.Riders.Rider7);
        theHubFantasyService.recalculateTeamRiderStagePosition(team.Riders.Rider8);
        theHubFantasyService.recalculateTeamRiderStagePosition(team.Riders.Rider9);

        team.stageTime = 0;
        team.stageTime += team.Riders.Rider1.stageTime;
        team.stageTime += team.Riders.Rider2.stageTime;
        team.stageTime += team.Riders.Rider3.stageTime;
        team.stageTime += team.Riders.Rider4.stageTime;
        team.stageTime += team.Riders.Rider5.stageTime;
        team.stageTime += team.Riders.Rider6.stageTime;
        team.stageTime += team.Riders.Rider7.stageTime;
        team.stageTime += team.Riders.Rider8.stageTime;
        team.stageTime += team.Riders.Rider9.stageTime;

        team.stagePosition = 0;
        team.stagePosition += team.Riders.Rider1.stagePosition;
        team.stagePosition += team.Riders.Rider2.stagePosition;
        team.stagePosition += team.Riders.Rider3.stagePosition;
        team.stagePosition += team.Riders.Rider4.stagePosition;
        team.stagePosition += team.Riders.Rider5.stagePosition;
        team.stagePosition += team.Riders.Rider6.stagePosition;
        team.stagePosition += team.Riders.Rider7.stagePosition;
        team.stagePosition += team.Riders.Rider8.stagePosition;
        team.stagePosition += team.Riders.Rider9.stagePosition;

    }

    function recalculateTeamRiderStagePosition(teamRider) {
        var riderFoundInRace = false;

        // in seconds
        teamRider.stageTime = 0;
        teamRider.stagePosition = 999;

        angular.forEach(diDataService.raceData.Groups, function (group) {
            if (!riderFoundInRace) {
                teamRider.stageTime += group.GapToPreviousGroupT;
                angular.forEach(group.Riders, function (groupRider) {
                    if (!riderFoundInRace && groupRider.Id == teamRider.Id) {
                        teamRider.stageTime += groupRider.GapToFirstRiderGroupT;
                        teamRider.stagePosition = groupRider.PositionInTheRace;
                        riderFoundInRace = true;
                    }
                });
            }
        });

        //return riderTime;
    }

    theHubFantasyService.initialize();
    return theHubFantasyService;
});

