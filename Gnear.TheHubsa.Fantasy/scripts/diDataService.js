
tdfApp.factory('diDataService', function ($rootScope, $http, $filter) {

    // interface
    var diDataService = {

        // properties
        currentStageUrl: '',
        routeUrl: '',
        ridersUrl: '',
        riderClassificationUrl:'',
        raceStatusUrl: '',
        raceDataUrl: '',
        stagesUrl: '',

        currentStage: null,
        route: null,
        riders: null,
        riderClassification: null,
        raceStatus: null,
        raceData: null,
        stages: null,

        // broadcast messages
        broadcast_Initialized: broadcast_Initialized,
        broadcast_RaceRefreshed: broadcast_RaceRefreshed,

        //functions
        initialize: initialize,
        prepareForRacing: prepareForRacing,
        prepareRider: prepareRider,
        refreshRaceData: refreshRaceData,
        copyClassificationValuesToLeader: copyClassificationValuesToLeader,
        timeTextToSeconds: timeTextToSeconds

    };

    $rootScope.$on('please_InitializeDiData', function () {
        diDataService.initialize();
    });

    $rootScope.$on('please_RefreshDiData', function () {
        diDataService.refreshRaceData();
    });

    //diDataService.message = '';

    //diDataService.prepForBroadcast = function (msg) {
    //    this.message = msg;
    //    this.broadcastItem();
    //};


    function broadcast_Initialized() {
        $rootScope.$broadcast('diDataService_initialized');
    };

    function broadcast_RaceRefreshed() {
        $rootScope.$broadcast('diDataService_raceRefreshed');
    };

    function initialize() {

        $http.get('config/diDataConfigOnline.json').then(function (diDataConfig) {
            diDataService.currentStageUrl = diDataConfig.data.currentStageUrl;
            diDataService.routeUrl = diDataConfig.data.routeUrl;
            diDataService.ridersUrl = diDataConfig.data.ridersUrl;

            //todo - programatically change stage number in riderClassificationUrl url
            diDataService.riderClassificationUrl = diDataConfig.data.riderClassificationUrl;
            diDataService.raceStatusUrl = diDataConfig.data.raceStatusUrl;
            diDataService.raceDataUrl = diDataConfig.data.raceDataUrl;
            diDataService.stagesUrl = diDataConfig.data.stagesUrl;

            $http.get(diDataService.stagesUrl).then(function (resstages) {
                diDataService.stages = resstages.data;
                $http.get(diDataService.currentStageUrl).then(function (rescurrent) {
                    diDataService.currentStage = rescurrent.data;
                    $http.get(diDataService.routeUrl).then(function (resroute) {
                        diDataService.route = resroute.data;
                        $http.get(diDataService.ridersUrl).then(function (resriders) {
                            diDataService.riders = resriders.data;
                            $http.get(diDataService.riderClassificationUrl).then(function (resriderclassification) {
                                diDataService.riderClassification = resriderclassification.data;
                                $http.get(diDataService.raceStatusUrl).then(function (resstatus) {
                                    diDataService.raceStatus = resstatus.data;
                                    diDataService.prepareForRacing();
                                    diDataService.broadcast_Initialized();
                                });
                            });
                        });
                    });
                });
            });

        });
    };

    function prepareForRacing() {
        //Set the classification leader's times as when the stage started.
        var currenStageConfigData = $filter('filter')(diDataService.stages, { StageId: diDataService.currentStage.StageId }, true)[0];
        diDataService.currentStage.GeneralClassificationTimeAllStages = currenStageConfigData.GeneralClassificationTimeAllStages;
        diDataService.currentStage.YoungClassificationTimeAllStages = currenStageConfigData.YoungClassificationTimeAllStages;

        angular.forEach(diDataService.riders, function (rider) {
            diDataService.prepareRider(rider);
        });

        var generalLeader = $filter('filter')(diDataService.riderClassification, { Classification: "General" }, true)[0];
        var youthLeader = $filter('filter')(diDataService.riderClassification, { Classification: "Youth" }, true)[0];
        var sprintLeader = $filter('filter')(diDataService.riderClassification, { Classification: "Sprint" }, true)[0];
        var mountainLeader = $filter('filter')(diDataService.riderClassification, { Classification: "Mountain" }, true)[0];

        diDataService.copyClassificationValuesToLeader(generalLeader);
        diDataService.copyClassificationValuesToLeader(youthLeader);
        diDataService.copyClassificationValuesToLeader(sprintLeader);
        diDataService.copyClassificationValuesToLeader(mountainLeader);
    };

    function copyClassificationValuesToLeader(classificationLeader) {
        var rider = $filter('filter')(diDataService.riders, { Id: classificationLeader.Id }, true)[0];

        classificationLeader.GeneralClassificationPosition = rider.GeneralClassificationPosition;
        classificationLeader.GeneralClassificationTime = rider.GeneralClassificationTime;

        classificationLeader.YoungClassificationPosition = rider.YoungClassificationPosition;
        classificationLeader.YoungClassificationTime = rider.YoungClassificationTime;

        classificationLeader.SprintClassificationPosition = rider.SprintClassificationPosition;
        classificationLeader.SprintClassificationTime = rider.SprintClassificationTime;

        classificationLeader.MountainClassificationPosition = rider.MountainClassificationPosition;
        classificationLeader.MountainClassificationTime = rider.MountainClassificationTime;

    };

    function prepareRider(rider) {
        var generalClassificationData = (rider.GeneralClassification) ? rider.GeneralClassification.split(",") : [0, 0]; //"13, 00:01:50" (postion, time)
        var youngClassificationData = (rider.YoungClassification) ? rider.YoungClassification.split(",") : [0, 0]; //"13, 00:01:50" (postion, time)
        var sprintClassificationData = (rider.SprintClassification) ? rider.SprintClassification.split(",") : [0, 0]; //"26, 15" (postion, points)
        var mountainClassificationData = (rider.MountainClassification) ? rider.MountainClassification.split(",") : [0, 0]; //"26, 15" (postion, points)
        
        rider.GeneralClassificationPosition = generalClassificationData[0];
        // we work in seconds
        rider.GeneralClassificationTime = diDataService.timeTextToSeconds(generalClassificationData[1]);
        rider.GeneralClassificationTimeAllStages = rider.GeneralClassificationTime + diDataService.timeTextToSeconds(diDataService.currentStage.GeneralClassificationTimeAllStages);

        rider.YoungClassificationPosition = youngClassificationData[0];
        // we work in seconds
        rider.YoungClassificationTime = diDataService.timeTextToSeconds(youngClassificationData[1]);
        rider.YoungClassificationTimeAllStages = rider.YoungClassificationTime + diDataService.timeTextToSeconds(diDataService.currentStage.YoungClassificationTimeAllStages);

        rider.SprintClassificationPosition = sprintClassificationData[0];
        rider.SprintClassificationTime = sprintClassificationData[1];

        rider.MountainClassificationPosition = mountainClassificationData[0];
        rider.MountainClassificationTime = mountainClassificationData[1];


    };
    
    function refreshRaceData() {
        //
        //'Data/race.json'
        $http.get(diDataService.raceDataUrl).then(function (resrace) {
            diDataService.raceData = resrace.data;
            diDataService.broadcast_RaceRefreshed();
        });
    };

    //function displaySecondsAsTime(seconds) {
    //    secs = Math.round(secs);
    //    var hours = Math.floor(secs / (60 * 60));

    //    var divisor_for_minutes = secs % (60 * 60);
    //    var minutes = Math.floor(divisor_for_minutes / 60);

    //    var divisor_for_seconds = divisor_for_minutes % 60;
    //    var seconds = Math.ceil(divisor_for_seconds);

    //    var obj = {
    //        "h": hours,
    //        "m": minutes,
    //        "s": seconds
    //    };
    //    return obj;
    //}

    // we waork in seconds and not "00:01:50"
    function timeTextToSeconds(timeText) {
        var generalClassificationData = (timeText) ? timeText.split(":") : [0, 0, 0];
        var hours = parseInt(generalClassificationData[0]);
        var minutes = parseInt(generalClassificationData[1]);
        var seconds = parseInt(generalClassificationData[2]);
        return (hours * 3600) + (minutes * 60) + seconds;
    }

    return diDataService;
});

