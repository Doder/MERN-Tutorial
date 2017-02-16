var React = require('react');
var ReactDOM = require('react-dom');
var BugList = require('./bugList.js');
var NotFound = require('./notFound.js');
var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link
var hashHistory = require('react-router').hashHistory;
var Redirect = require('react-router').Redirect;


ReactDOM.render((
	<Router history={hashHistory}>
		<Redirect from="/" to="/bugs"/>
		<Route path="/bugs" component={BugList}/>
		<Route path="*" component={NotFound}/>
		
	</Router>
	), document.getElementById('main'));