var TrackViewer = React.createClass({
  getInitialState: function(){
    return {
      track: TrackStore.currentTrack(),
      recording: false
    }
  },

  componentDidMount: function(){
    TrackStore.addChangeListener(this.updateTrack);
  },

  render: function() {
    return (
      <div id="track">
        <button 
          id="play"
          onClick={this.playTrack}>
          Play
        </button>
        <button
          id="record"
          onClick={this.toggleRecord}>
          {this.state.recording?' Stop ':'Record'}
        </button>
      </div>
    );
  },

  playTrack: function(){
    this.state.track.reset();
    this.state.track.play();
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
