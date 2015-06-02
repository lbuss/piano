var Key = React.createClass({

  getInitialState: function(){
    return {playing: false}
  },

  componentDidMount: function(){
    KeyStore.addPlayListener(this.checkPlaying);
  },

  render: function() {
    var divStyle = {backgroundColor: (this.state.playing?'yellow':'white')};

    return <li style={divStyle}> {KeyLetters[this.props.keyCode]} {this.props.note.frequency}</li>
  },

  checkPlaying: function(){
      if(KeyStore.checkPlaying(this.props.keyCode)){
        this.props.note.start();
        this.setState({playing:true});
      }else{
        this.props.note.stop();
        this.setState({playing:false});
      }
  }
});
