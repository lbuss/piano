(function(root){

  var keyEffects = {};

  var CHANGE_EVENT = 'change';

  root.EffectStore = $.extend({}, EventEmitter.prototype, {
    currentEffects: function(){
      return _keyEffects;
    },

    newBind: function(bind){
      _keyBindings[KeyCodes[bind.key]] = parseInt(bind.freq);
      BindStore.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback){
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback){
      this.removeListener(CHANGE_EVENT, callback);
    },

    dispatchID: AppDispatcher.register(function(payload){
      switch(payload.actionType){
        case ActionTypes.NEW_BIND:
          EffectStore.newKey(payload.bind.key);
          break;
        case ActionTypes.LOAD_TRACK:
          EffectStore.loadEffects(payload.track.effects)
          break;
      }
    })
  })
});
