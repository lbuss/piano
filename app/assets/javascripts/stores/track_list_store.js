(function(root){

  var _trackList = [];

  var CHANGE_EVENT = 'list_change';

  root.TrackListStore = $.extend({}, EventEmitter.prototype, {
    updateList: function(list){
      _trackList = list;
      TrackListStore.emit(CHANGE_EVENT);
    },

    getList: function(){
      return _trackList;
    },

    addChangeListener: function(callback){
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback){
      this.removeListener(CHANGE_EVENT, callback);
    },

    dispatchID: AppDispatcher.register(function(payload){
      switch(payload.actionType){
        case ActionTypes.LIST_UPDATE:
          TrackListStore.updateList(payload.track_list);
          break;
      }
    })
  })
})(this)
