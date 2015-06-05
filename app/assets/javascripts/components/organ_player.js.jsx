var OrganPlayer = React.createClass({
  getInitialState: function(){
    return {
      recording: false,
      playing: false
    }
  },

  render: function(){
    return (
      <div id="organ-player-wrapper">
        <button id="new" className="organ-button" onClick={this.newTrack}>
          New
        </button>
        <button id="play" className="organ-button" onClick={this.togglePlay}>
           {this.state.playing? 'Stop' : 'Play'}
        </button>
        <button id="record" className="organ-button" onClick={this.toggleRecord}>
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
