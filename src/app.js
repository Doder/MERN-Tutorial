var React = require('react');
var ReactDOM = require('react-dom');
var BugList = require('./bugList.js');
var BugEdit = require('./bugEdit.js');
var NotFound = require('./notFound.js');
import {Router, Route, Link, hashHistory, Redirect} from 'react-router'


ReactDOM.render((
	<Router history={hashHistory}>
		<Redirect from="/" to="/bugs"/>
		<Route path="/bugs" component={BugList}/>
		<Route path="/bugs/:bugId" component={BugEdit}/>
		<Route path="*" component={NotFound}/>
		
	</Router>
	), document.getElementById('main'));