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
      <form id="bind-form-wrapper" onSubmit={this.submitBind}>
        <input type="text"
          id="bind-form-freq-input"
          className="bind-form-text-input"
          maxLength="5"
          valueLink={this.linkState('freq')}
        />
        <input
          type="text"
          id="bind-form-key-input"
          className="bind-form-text-input"
          maxLength="1"
          valueLink={this.linkState('key')}
        />
        <input type="submit" className="organ-button" value="Bind Key"/>
      </form>
    )
  },

  submitBind: function(e){
    e.preventDefault();
    Actions.newBind(this.state);
  }

});
