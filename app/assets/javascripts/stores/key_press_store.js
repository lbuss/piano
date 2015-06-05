(function(root){

  var _keysPressed= {};
  var CHANGE_EVENT = 'change';

  root.KeyPressStore = $.extend({}, EventEmitter.prototype, {
    keysPressed: function(){
      return _keysPressed;
    },

    checkPlaying(key){
      return !!_keysPressed[key];
    },

    keyPlay: function(key){
      _keysPressed[key] = true;
      KeyPressStore.emit(CHANGE_EVENT);
    },

    keyStop: function(key){
      _keysPressed[key] = false;
      KeyPressStore.emit(CHANGE_EVENT);
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
          KeyPressStore.keyPlay(payload.key);
          break;
        case ActionTypes.KEY_UP:
          KeyPressStore.keyStop(payload.key);
          break;
      }
    })
  })
})(this);
