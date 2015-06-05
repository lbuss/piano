var SaveTrack = React.createClass({
  render: function() {
    return <button onClick={this.saveTrack}>Save</button>;
  },

  saveTrack: function(){
    ApiActions.saveTrack(TrackStore.currentTrack().saveAttrs(this.props.name));
  }
});
