var OrganPlayer = React.createClass({
  getInitialState: function(){
    return {
      recording: false,
      playing: false
    }
  },

  render: function(){
    var PlayPressed = (this.state.playing ? 'pressed-button' : '');
    var RecordPressed = (this.state.recording ? 'pressed-button' : '');

    return (
      <div id="organ-player-wrapper">
        <button id="new" className="organ-button" onClick={this.newTrack}>
          New
        </button>
        <button id="play" className={PlayPressed + " organ-button"} onClick={this.togglePlay}>
           {this.state.playing? 'Stop' : 'Play'}
        </button>
        <button id="record" className={RecordPressed + " organ-button"} onClick={this.toggleRecord}>
           {this.state.recording? 'Stop' : 'Record'}
        </button>
      </div>
    );
  },

  togglePlay: function(){
    if(!this.state.playing){
      this.props.track.play();
    }else{
      this.props.track.stop();
    }
    this.setState({
      playing: !this.state.playing
    })
  },

  toggleRecord: function(){
    if(!this.state.recording){
      this.props.track.startRecording();
    }else{
      this.props.track.stopRecording();
    }
    this.setState({
      recording: !this.state.recording
    })
  },

  updateTrack: function(){
    this.setState({
      track: TrackStore.currentTrack()
    })
  },

  newTrack: function(){
    Actions.newTrack();
  }
});
