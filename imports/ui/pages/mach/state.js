// State machine of match
export var State = {
    change: function (status) {
        switch (status) {
            case 'begin' :
                $('#panelSearch').show();
                $('#viewGame').hide();
                $('#divPlayers').hide();
                $('#divButtons').hide();
                $('#divBtnStarMatch').hide();
                $('#divBtnFirstPlayer').hide();
                $('#divBtnFinishMatch').hide();
                $('#classification').hide();
                $('#divBtnPublish').hide();
                $('#readyPlayers').hide();
                $('#divBtnSaveSchedule').hide();
                $('#divSchedule').hide();
                $('#msgReservationFriend').hide();
                $('#msgReservationSchedule').hide();
                $('#divPlaces').hide();
                $('#imgShareMatch').hide();
                $('#divTimer').hide();
                break;
            case 'game' :
                $('#panelSearch').hide();
                $('#divSchedle').hide();
                $('#viewGame').show();
                $('#divButtons').show();
                break;
            case 'match-now' : 
                $('#divButtons').hide();
                $('#divPlayers').show();
                $('#divBtnStarMatch').show();
                $('#panelSearch').hide();
                $('#divPlaces').show();
                break;
            case 'match-schedule' : 
                $('#divButtons').hide();
                $('#divPlayers').show();
                $('#divBtnSaveSchedule').show();
                $('#divSchedule').show();
                $('#panelSearch').hide();
                $('#msgReservationFriend').show();
                $('#divPlaces').show();
                break;
            case 'start' : 
                $('#divTimer').show();
                $('#divBtnStarMatch').hide();
                $('#divBtnFirstPlayer').show();
                $('#panelSearch').hide();
                $('#divPlayers').hide();
                $('#readyPlayers').show();
                $('#divPlaces').hide();
                $('#subtitleGame').html("Partida em andamento");
                $('#pBtnCountPoints').html('');
                break;
            case 'score' : 
                $('#divPlayers').show();
                $('#readyPlayers').hide();
                $('#subtitleGame').html("Contagem de pontos");
                $('#btnFinishCount').hide();
                $('#divBtnFinishMatch').show();
                $('.tdScoreValues').css('visibility', 'visible');
                break;
            case 'trophy' : 
                $('#panelSearch').hide();
                $('#classification').show();
                $('#divPlayers').hide();
                $('#divBtnFinishMatch').hide();
                $('#divBtnPublish').show();
                break;
            case 'schedule' : 
                $('#divBtnSaveSchedule').hide();
                $('#divPlaces').hide();
                $('#msgReservationFriend').hide();
                $('#divSchedule').hide();
                $('#divPlayers').hide();
                $('#msgReservationSchedule').show();
                break;
        }
    }
}