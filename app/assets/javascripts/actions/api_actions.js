ApiActions = {
  getTracks: function(){
    $.ajax(
      {url:'api/tracks',
      type: 'GET',
      success: function(resp){
        AppDispatcher.dispatch({
          actionType: ActionTypes.LIST_UPDATE,
          track_list: resp
        });
      }}
    )
  },

  saveTrack: function(track){
    $.ajax(
      {url:'/api/tracks',
      type: 'POST',
      data: {track: track},
      success: function(resp){
        AppDispatcher.dispatch({
          actionType: ActionTypes.LIST_UPDATE,
          track_list: resp
        });
      }}
    )
  },

  loadTrack: function(id){
    $.ajax(
      {url:'/api/tracks/'+id,
      type: 'GET',
      success: function(resp){
        AppDispatcher.dispatch({
          actionType: ActionTypes.LOAD_TRACK,
          track: resp
        });
      }}
    )
  },
}
