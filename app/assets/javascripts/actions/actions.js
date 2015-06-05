
Actions = {
    keyDown: function(keyCode){
      AppDispatcher.dispatch({
        actionType: ActionTypes.KEY_DOWN,
        key: keyCode
      });
    },

    keyUp: function(keyCode){
      AppDispatcher.dispatch({
        actionType: ActionTypes.KEY_UP,
        key: keyCode
      });
    },

    newBind: function(bind){
      AppDispatcher.dispatch({
        actionType: ActionTypes.NEW_BIND,
        bind: bind
      });
    },

    newTrack: function(){
      AppDispatcher.dispatch({
        actionType: ActionTypes.NEW_TRACK,
      });
    }
};
