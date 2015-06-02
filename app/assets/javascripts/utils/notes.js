(function(root){
    var ctx = new (window.AudioContext || window.webkitAudioContext)();

    root.Note = function(freq){
      this.frequency = freq;
      //freq in HZ
      this.oscillator = this.createOscillator(freq);
      this.gainNode = this.createGainNode();

      this.oscillator.connect(this.gainNode);
    }

    root.Note.prototype = {
      createOscillator: function(freq){
        var osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.value = freq;
        osc.detune.value = 0;
        osc.start(ctx.currentTime);
        return osc;
      },

      createGainNode: function(){
        var gainNode = ctx.createGain();
        gainNode.gain.value = 0;
        gainNode.connect(ctx.destination);
        return gainNode;
      },

      start: function(){
        this.gainNode.gain.value = .3;
      },

      stop: function(){
        this.gainNode.gain.value = 0;
      }
    };

})(this);
