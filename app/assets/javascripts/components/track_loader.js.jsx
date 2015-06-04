var TrackLoader = React.createClass({
  mixins:[React.addons.LinkedStateMixin],

  getInitialState: function(){
    return{
      trackList: TrackStore.getList(),
      selectedTrack: 3,
      trackName: 'Input'
    }
  },

  componentDidMount: function(){
    TrackStore.addListChangeListener(this.updateList);
    ApiActions.getTracks();
  },

  updateList: function(){
    this.setState({
      trackList: TrackStore.getList(),
      trackName: TrackStore.currentTrack().name
    })
  },

  render: function() {
    var trackList = this.state.trackList.map(function(track){
      var selected = (this.state.selectedTrack === track.id ? "selected" : "");
      return(
        <li className={"loader-menu-item " + selected}
          key={track.id}
          data-id={track.id}
          onClick={this.selectMenuItem}>
          {track.name}
        </li>
      )
    }.bind(this));

    return(
      <div id="track-loader">
        <div id="loader-screen-wrapper">
          <input id="loader-text-input" className="loader-menu-item" type="text" valueLink={this.linkState('trackName')}/>
          <ul id="loader-screen">
            {trackList}
          </ul>
        </div>
        <div id="loader-circle-outer">
          <div id="loader-buttons">
            <SaveTrack name={this.state.trackName}/>
            <LoadTrack id={this.state.selectedTrack}/>
          </div>
        </div>
      </div>
    )
  },

  selectMenuItem: function(e){
    e.preventDefault();
    this.setState({
      selectedTrack: $(e.target).data("id")
    })
  }
});
