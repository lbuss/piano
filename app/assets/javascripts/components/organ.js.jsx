var Organ = React.createClass({
  getInitialState: function(){
    return{
      keysBound: KeyStore.keyBindings()
    }
  },

  componentDidMount: function(){
    KeyStore.addChangeListener(this.updateBoundKeys);
  },

  render: function() {
    var sortByFreq  = function(a, b) {
      return (this.state.keysBound[a] > this.state.keysBound[b]);
    }.bind(this);

    var keyList = Object.keys(this.state.keysBound).sort(sortByFreq).map(function(key){
      var note = new Note(this.state.keysBound[key]);
      return <Key key={key} keyCode={key} note={note}/>
    }.bind(this));

    return(
      <div id="organ">
        <div className="menu">
          <TrackViewer/>
          <BindForm/>
        </div>
        <ul>{keyList}</ul>
      </div>
    )
  },

  updateBoundKeys: function(){
    this.setState({
      keysBound: KeyStore.keyBindings()
    })
  }
});
