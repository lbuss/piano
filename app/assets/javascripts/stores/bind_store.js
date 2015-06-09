(function(root){

  var CHANGE_EVENT = 'change';

    // 'C3': 130.81,
    // 'D3': 146.83,
    // 'E3': 164.81,
    // 'G3': 196.00,
    // 'A3': 220.00,
    // 'B3': 246.94

  var _keyBindings = {};
    _keyBindings[KeyCodes['q']] = Tones['C4'];
    _keyBindings[KeyCodes['w']] = Tones['D4'];
    _keyBindings[KeyCodes['e']] = Tones['E4'];
    _keyBindings[KeyCodes['r']] = Tones['F4'];
    _keyBindings[KeyCodes['t']] = Tones['G4'];
    _keyBindings[KeyCodes['y']] = Tones['A4'];
    _keyBindings[KeyCodes['u']] = Tones['B4'];


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

    resetBinds: function(){
      _keyBindings[KeyCodes['q']] = Tones['C4'];
      _keyBindings[KeyCodes['w']] = Tones['D4'];
      _keyBindings[KeyCodes['e']] = Tones['E4'];
      _keyBindings[KeyCodes['r']] = Tones['F4'];
      _keyBindings[KeyCodes['t']] = Tones['G4'];
      _keyBindings[KeyCodes['y']] = Tones['A4'];
      _keyBindings[KeyCodes['u']] = Tones['B4'];
    },

    dispatchID: AppDispatcher.register(function(payload){
      switch(payload.actionType){
        case ActionTypes.NEW_BIND:
          BindStore.newBind(payload.bind);
          break;
        case ActionTypes.LOAD_TRACK:
          BindStore.newBinds(payload.track.notes)
          break;
        case ActionTypes.NEW_TRACK:
          BindStore.resetBinds();
          break;
      }
    })
  })
})(this);
