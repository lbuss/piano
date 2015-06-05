(function(root){

  var _currentTrack = new Track(BindStore.keyBindings());

  var CHANGE_EVENT = 'track_change';

  root.TrackStore = $.extend({}, EventEmitter.prototype, {
    currentTrack: function(){
      return _currentTrack;
    },

    keyDown: function(key){
      _currentTrack.keyDown(key);
      TrackStore.emit(CHANGE_EVENT);
    },

    keyUp: function(key){
      _currentTrack.keyUp(key);
      TrackStore.emit(CHANGE_EVENT);
    },

    newBind: function(bind){
      bind.freq = parseInt(bind.freq);
      _currentTrack.newBind(bind);
      TrackStore.emit(CHANGE_EVENT);
    },

    loadTrack: function(track){
      _currentTrack = new Track({}, track);
      TrackStore.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback){
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback){
      this.removeListener(CHANGE_EVENT, callback);
    },

    dispatchID: AppDispatcher.register(function(payload){
      switch(payload.actionType){
        case ActionTypes.KEY_DOWN:
          TrackStore.keyDown(payload.key);
          break;
        case ActionTypes.KEY_UP:
          TrackStore.keyUp(payload.key);
          break;
        case ActionTypes.NEW_BIND:
          TrackStore.newBind(payload.bind);
          break;
        case ActionTypes.LOAD_TRACK:
          TrackStore.loadTrack(payload.track);
          break;
      }
    })
  })
})(this);
