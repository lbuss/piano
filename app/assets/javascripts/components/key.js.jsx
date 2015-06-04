var Key = React.createClass({

  getInitialState: function(){
    return {playing: false};
  },

  componentDidMount: function(){
    KeyStore.addPlayListener(this.checkPlaying);
  },

  render: function() {
    var pressClass = (this.state.playing ? 'pressed' : 'unpressed');

    return <li className={pressClass+" piano-key"}>{KeyLetters[this.props.keyCode]}:<br/>{this.props.note.frequency}<br/>Hz</li>
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
