(function(root){
  var _keysPressed= {};

  var PLAY_EVENT = 'play';
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


  root.KeyStore = $.extend({}, EventEmitter.prototype, {
    keyBindings: function(){
      return _keyBindings;
    },

    keysPressed: function(){
      return _keysPressed;
    },

    checkPlaying(key){
      return !!_keysPressed[key];
    },

    keyPlay: function(key){
      _keysPressed[key] = true;
      KeyStore.emit(PLAY_EVENT);
    },

    keyStop: function(key){
      _keysPressed[key] = false;
      KeyStore.emit(PLAY_EVENT);
    },

    newBind: function(bind){
      _keyBindings[KeyCodes[bind.key]] = parseInt(bind.freq);
      KeyStore.emit(CHANGE_EVENT);
    },

    newBinds(binds){
      _keyBindings = binds;
      KeyStore.emit(CHANGE_EVENT);
    },

    addPlayListener: function(callback){
      this.on(PLAY_EVENT, callback);
    },

    removePlayListener: function(callback){
      this.removeListener(PLAY_EVENT, callback);
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
          KeyStore.keyPlay(payload.key);
          break;
        case ActionTypes.KEY_UP:
          KeyStore.keyStop(payload.key);
          break;
        case ActionTypes.NEW_BIND:
          KeyStore.newBind(payload.bind);
          break;
        case ActionTypes.LOAD_TRACK:
          KeyStore.newBinds(payload.track.notes)
          break;
      }
    })


  })




})(this);
