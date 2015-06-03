var BindForm = React.createClass({
  mixins:[React.addons.LinkedStateMixin],

  getInitialState: function(){
    return{
      freq: 0,
      key: 'a'
    }
  },

  render: function() {
    return(
      <form onSubmit={this.submitBind}>
        <input type="text" className="bindFormInput" valueLink={this.linkState('freq')}/>
        <input type="text" className="bindFormInput" valueLink={this.linkState('key')} name="lng"/>
        <input type="submit" value="Bind Key"/>
      </form>
    )
  },

  submitBind: function(e){
    e.preventDefault();
    Actions.newBind(this.state);
  }

});
