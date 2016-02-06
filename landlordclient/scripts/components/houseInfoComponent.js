import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';


var HouseInfo = React.createClass({
  getInitialState: function() {
    return {
      tenants: []
    }
  },

  componentDidMount: function() {
    console.log('current house passed in: ', this.props.currentHouse);
    this.getUsersInHouse();
  },

  getUsersInHouse: function() {
    $.ajax({
      url: '/users',
      type: 'GET',
      contentType: 'application/json',
      headers: {'token': localStorage.getItem('obie')},
      success: function(tenants) {
        this.setState({tenants: tenants});
      }.bind(this),
      error: function(err) {
        console.log(err);
      }
    })
  },

  render: function() {
    var tenantList = this.state.tenants.map(function(tenant, index) {
      return <User key={index} tenant={tenant} />
    });
    return (
      <div className="message-container">
        <h2 className="text-center">{this.props.currentHouse.name}</h2>
        <p>{this.props.currentHouse.address}</p>
        <div className="message-list">
          <ul>{tenantList}</ul>
        </div>
      </div>
    )
  }
});

var User = React.createClass({
  render: function() {
    return (
      <li>
        <div className="row">
          <div className="col-xs-4 col-lg-2">
             <img className="tenant-image" src={this.props.tenant.userImageUrl} alt=""/>
          </div>
          <div className="col-xs-8 col-lg-10">
            <p>
              {this.props.tenant.name}
            </p>
            <p>
              {this.props.tenant.email}
            </p>
          </div>
        </div>
      </li>
    )
  }
})

export default HouseInfo;