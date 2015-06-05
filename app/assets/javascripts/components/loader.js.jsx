var Loader = React.createClass({
  mixins:[React.addons.LinkedStateMixin],

  getInitialState: function(){
    return{
      selectedTrack: 3,
      trackName: TrackStore.currentTrack().name
    }
  },

  componentDidMount:function(){
    TrackStore.addChangeListener(this.updateTrack);
  },

  render: function() {
    // TODO: Make the dial a jquery knob
    var trackList = this.props.tracks.map(function(track){
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
          <input id="loader-text-input"
            className="loader-menu-item"
            type="text"
            maxLength="15"
            valueLink={this.linkState('trackName')}
          />

          <ul id="loader-screen">
            {trackList}
          </ul>
        </div>
        <div id="loader-circle-outer">
          <div id="loader-buttons">
            <LoaderSave name={this.state.trackName}/>
            <LoaderLoad id={this.state.selectedTrack}/>
          </div>
          <div id="loader-circle-inner"/>
        </div>
      </div>
    )
  },

  selectMenuItem: function(e){
    // TODO: Make this an action
    e.preventDefault();
    this.setState({
      selectedTrack: $(e.target).data("id")
    })
  },

  updateTrack: function(){
    this.setState({
      trackName: TrackStore.currentTrack().name
    })
  }
});
