var Main = React.createClass({
  getInitialState: function(){
    return{
      track: TrackStore.currentTrack(),
      keysBound: BindStore.keyBindings(),
      trackList: TrackListStore.getList(),
    }
  },

  componentDidMount: function(){
    BindStore.addChangeListener(this.updateBoundKeys);
    TrackListStore.addChangeListener(this.updateList);
    TrackStore.addChangeListener(this.updateTrack);
    ApiActions.getTracks();
  },

  render: function(){
    return (
      <div id="main">
        <Organ track={this.state.track} keys={this.state.keysBound}/>
        <Loader tracks={this.state.trackList}/>
      </div>
    );
  },

  updateBoundKeys: function(){
    this.setState({
      keysBound: BindStore.keyBindings()
    })
  },

  updateList: function(){
    this.setState({
      trackList: TrackListStore.getList()
    })
  },

  updateTrack: function(){
    this.setState({
      track: TrackStore.currentTrack()
    })
  },
});
