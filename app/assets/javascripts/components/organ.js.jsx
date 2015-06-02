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
    var keyList = Object.keys(this.state.keysBound).map(function(key){
      var note = new Note(this.state.keysBound[key]);
      return <Key key={key} keyCode={key} note={note}/>
    }.bind(this))

    return <div id="organ"><ul>{keyList}</ul><BindForm/></div>
  },

  updateBoundKeys: function(){
    this.setState({
      keysBound: KeyStore.keyBindings()
    })
  }
});
