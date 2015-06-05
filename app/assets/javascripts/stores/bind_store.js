(function(root){

  var CHANGE_EVENT = 'change';

    // 'C3': 130.81,
    // 'D3': 146.83,
    // 'E3': 164.81,
    // 'G3': 196.00,
    // 'A3': 220.00,
    // 'B3': 246.94

  var _keyBindings = {};
    _keyBindings[KeyCodes['q']] = Tones['C3'];
    _keyBindings[KeyCodes['w']] = Tones['D3'];
    _keyBindings[KeyCodes['e']] = Tones['E3'];
    _keyBindings[KeyCodes['r']] = Tones['G3'];
    _keyBindings[KeyCodes['t']] = Tones['A3'];
    _keyBindings[KeyCodes['y']] = Tones['B3'];


  root.BindStore = $.extend({}, EventEmitter.prototype, {
    keyBindings: function(){
      return _keyBindings;
    },

    newBind: function(bind){
      _keyBindings[KeyCodes[bind.key]] = parseInt(bind.freq);
      BindStore.emit(CHANGE_EVENT);
    },

    newBinds(binds){
      _keyBindings = binds;
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
          BindStore.newBind(payload.bind);
          break;
        case ActionTypes.LOAD_TRACK:
          BindStore.newBinds(payload.track.notes)
          break;
      }
    })
  })
})(this);
