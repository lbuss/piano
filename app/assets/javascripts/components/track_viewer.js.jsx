var TrackViewer = React.createClass({
  getInitialState: function(){
    return {
      track: TrackStore.currentTrack(),
      recording: false,
      playing: false
    }
  },

  componentDidMount: function(){
    TrackStore.addTrackChangeListener(this.updateTrack);
  },

  render: function() {
    return (
      <div id="track">
        // <button
        //   id="play"
        //   onClick={this.playTrack}>
        //   Play
        // </button>
        // <button
        //   id="record"
        //   onClick={this.toggleRecord}>
        //   {this.state.recording?' Stop ':'Record'}
        // </button>

      <button id="play" onClick={this.togglePlay}> {this.state.playing? 'Stop' : 'Play'} </button>
      <button id="record" onClick={this.toggleRecord}> {this.state.recording? 'Stop' : 'Record'} </button>
      </div>
    );
  },

  togglePlay: function(){
    if(!this.state.playing){
      this.state.track.play();
    }else{
      this.state.track.stop();
    }
    this.setState({
      playing: !this.state.playing
    })
  },

  toggleRecord: function(){
    if(!this.state.recording){
      this.state.track.startRecording();
    }else{
      this.state.track.stopRecording();
    }
    this.setState({
      recording: !this.state.recording
    })
  },

  updateTrack: function(){
    this.setState({
      track: TrackStore.currentTrack()
    })
  }
});
