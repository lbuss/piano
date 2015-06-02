(function(root){

  _time = 0;
  _interval = null;
  _recording = false;
  _playHash = {};
  _stopHash = {};
  _notes = {};

  root.Track = function(boundKeys, loadTrack){
    if(loadTrack){
      _playHash = loadTrack.playHash;
      _stopHash = loadTrack.stopHash;
      _notes = loadTrack.notes;
      this.name = loadTrack.name;
    }else{
      this.trackName = 'New Track';
      Object.keys(boundKeys).forEach(function(key){
        _notes[key] = boundKeys[key];
      })
    }
  }

  root.Track.prototype = {
    play: function(){
      _interval = setInterval(this.step.bind(this), 5);
    },

    stop: function(){
      this.reset();
    },

    startRecording: function(){
      _recording = true;
      _time = 0;
      _interval = setInterval(this.step.bind(this), 5);
    },

    stopRecording: function(){
      this.reset();
    },

    keyDown: function(key){
      if(_recording && _notes[key]){
        if(_playHash[_time]){
          _playHash[_time].push(key);
        }else{
          _playHash[_time] = [key];
        }
      }
    },

    keyUp: function(key){
      if(_recording && _notes[key]){
        if(_stopHash[_time]){
          _stopHash[_time].push(key);
        }else{
          _stopHash[_time] = [key];
        }
      }
    },

    newBind: function(bind){
      _notes[KeyCodes[bind.key]] = new Note(bind.freq);
    },

    reset: function(){
      clearInterval(_interval);
      _recording = false;
      _time = 0;
    },

    step: function(){
      _time += 5;
      if(_playHash[_time]){
        _playHash[_time].forEach(function(key){
          Actions.keyDown(key);
          // _notes[key].start();
        })
      }
      if(_stopHash[_time]){
        _stopHash[_time].forEach(function(key){
          Actions.keyUp(key);
          // _notes[key].stop();
        })
      }
    }
  }



})(this)
