var LoaderLoad = React.createClass({

  render: function() {
    return <button onClick={this.loadTrack}>Load</button>
  },

  loadTrack: function(){
    ApiActions.loadTrack(this.props.id);
  }
});
