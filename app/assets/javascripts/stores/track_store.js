(function(root){

  var _currentTrack = new Track(KeyStore.keyBindings());

  var _trackList = [];

  var TRACK_CHANGE_EVENT = 'track_change';
  var LIST_CHANGE_EVENT = 'list_change';

  root.TrackStore = $.extend({}, EventEmitter.prototype, {

    currentTrack: function(){
      return _currentTrack;
    },

    keyDown: function(key){
      _currentTrack.keyDown(key);
      TrackStore.emit(TRACK_CHANGE_EVENT);
    },

    keyUp: function(key){
      _currentTrack.keyUp(key);
      TrackStore.emit(TRACK_CHANGE_EVENT);
    },

    newBind: function(bind){
      bind.freq = parseInt(bind.freq);
      _currentTrack.newBind(bind)
      TrackStore.emit(TRACK_CHANGE_EVENT);
    },

    loadTrack: function(track){
      _currentTrack = new Track({}, track);
      TrackStore.emit(TRACK_CHANGE_EVENT);
    },

    updateList: function(list){
      _trackList = list;
      TrackStore.emit(LIST_CHANGE_EVENT);
    },

    getList: function(){
      return _trackList;
    },

    addTrackChangeListener: function(callback){
      this.on(TRACK_CHANGE_EVENT, callback);
    },

    removeTrackChangeListener: function(callback){
      this.removeListener(TRACK_CHANGE_EVENT, callback);
    },

    addListChangeListener: function(callback){
      this.on(LIST_CHANGE_EVENT, callback);
    },

    removeListChangeListener: function(callback){
      this.removeListener(LIST_CHANGE_EVENT, callback);
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
        case ActionTypes.LIST_UPDATE:
          TrackStore.updateList(payload.track_list);
          break;
      }
    })
  })
})(this);
