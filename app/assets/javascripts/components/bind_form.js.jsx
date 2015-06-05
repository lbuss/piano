var BindForm = React.createClass({
  mixins:[React.addons.LinkedStateMixin],

  getInitialState: function(){
    return{
      freq: 1000,
      key: 'a'
    }
  },

  render: function() {
    return(
      <form onSubmit={this.submitBind}>
        <input type="text" className="bindFormInput" valueLink={this.linkState('freq')}/>
        <input type="text" className="bindFormInput" valueLink={this.linkState('key')}/>
        <input type="submit" value="Bind Key"/>
      </form>
    )
  },

  submitBind: function(e){
    e.preventDefault();
    Actions.newBind(this.state);
  }

});
