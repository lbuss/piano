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
    console.log('/api/tracks'+(!!track.id ? "/"+track.id : ''))
    console.log(track.id)
    $.ajax(
      {url:'/api/tracks'+(!!track.id ? "/"+track.id : ''),
      type: (!!track.id ? "PATCH" : "POST"),
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
