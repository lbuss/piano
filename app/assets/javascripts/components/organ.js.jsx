var Organ = React.createClass({
  getInitialState: function(){
    return{
      keysBound: BindStore.keyBindings()
    }
  },

  componentDidMount: function(){
    BindStore.addChangeListener(this.updateBoundKeys);
  },

  render: function() {
    var keyList = Object.keys(this.state.keysBound).sort(this.sortByFreq).map(function(key){
      var note = new Note(this.state.keysBound[key]);
      return <Key key={key} keyCode={key} note={note}/>
    }.bind(this));

    return(
      <div id="organ">
        <div className="menu">
          <TrackViewer/>
          <BindForm/>
        </div>
        <ul id="key-board">
          {keyList}
        </ul>
      </div>
    )
  },

  updateBoundKeys: function(){
    this.setState({
      keysBound: BindStore.keyBindings()
    })
  },

  sortByFreq: function(a, b) {
    return (this.state.keysBound[a] > this.state.keysBound[b]);
  }
});
