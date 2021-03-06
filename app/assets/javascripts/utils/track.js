(function(root){
  root.Track = function(boundKeys, loadTrack){

    this.attr = {
      time: 0,
      timeStep: 5,
      interval: null,
      recording: false,
      //hashes are {time: [key1, key2...],}
      playHash: {},
      stopHash: {},
      //notes is {key: freq}
      notes: {}
    }

    if(loadTrack){
      this.id = loadTrack.id;
      this.attr.playHash = loadTrack.play_hash;
      this.attr.stopHash = loadTrack.stop_hash;
      this.attr.notes = loadTrack.notes;
      this.name = loadTrack.name;

    }else{
      Object.keys(boundKeys).forEach(function(key){
        this.attr.notes[key] = boundKeys[key];
      }.bind(this));
      this.name = 'Track01';
    }
  }

  root.Track.prototype = {
    play: function(){
      if(!this.attr.interval){
        this.attr.interval = setInterval(this.step.bind(this), this.attr.timeStep);
      }
    },

    stop: function(){
      this.reset();
    },

    startRecording: function(){
      this.reset();
      this.attr.recording = true;
      this.play();
    },

    stopRecording: function(){
      this.reset();
    },

    keyDown: function(key){
      if(this.attr.recording && this.attr.notes[key]){
        if(this.attr.playHash[this.attr.time]){
          this.attr.playHash[this.attr.time].push(key);
        }else{
          this.attr.playHash[this.attr.time] = [key];
        }
      }
    },

    keyUp: function(key){
      if(this.attr.recording && this.attr.notes[key]){
        if(this.attr.stopHash[this.attr.time]){
          this.attr.stopHash[this.attr.time].push(key);
        }else{
          this.attr.stopHash[this.attr.time] = [key];
        }
      }
    },

    newBind: function(bind){
      this.attr.notes[KeyCodes[bind.key]] = bind.freq;
    },

    reset: function(){
      clearInterval(this.attr.interval);
      this.attr.interval = null;
      this.attr.recording = false;
      this.attr.time = 0;

      //stop trailing notes
      Object.keys(this.attr.notes).forEach(function(key){
        Actions.keyUp(key);
      })
    },

    step: function(){
      //press and release keys using attrs playhash and stophash respectively
      this.attr.time += this.attr.timeStep;
      if(this.attr.playHash[this.attr.time]){
        this.attr.playHash[this.attr.time].forEach(function(key){
          Actions.keyDown(key);
        })
      }
      if(this.attr.stopHash[this.attr.time]){
        this.attr.stopHash[this.attr.time].forEach(function(key){
          Actions.keyUp(key);
        })
      }
    },

    saveAttrs: function(name){
      // return the attributes required to save the song
      return {
        name: name,
        play_hash: this.attr.playHash,
        stop_hash: this.attr.stopHash,
        notes: this.attr.notes
      }
    }
  }
})(this)
