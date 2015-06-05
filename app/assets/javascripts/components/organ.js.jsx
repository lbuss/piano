var Organ = React.createClass({

  render: function() {
    var keyList = Object.keys(this.props.keys).sort(this.sortByFreq).map(function(key){
      var note = new Note(this.props.keys[key]);
      return <OrganKey key={key} keyCode={key} note={note}/>
    }.bind(this));

    return(
      <div id="organ">
        <div id="organ-menu-wrapper">
          <OrganPlayer track={this.props.track}/>
          <BindForm/>
        </div>
        <ul id="key-board">
          {keyList}
        </ul>
      </div>
    )
  },

  sortByFreq: function(a, b) {
    return (this.props.keys[a] > this.props.keys[b]);
  }
});
