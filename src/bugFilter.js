var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

class BugFilter extends React.Component{
	constructor(){
		super();
		this.clickHandler = this.clickHandler.bind(this);
	}
	clickHandler(){
		var filter = {priority: "P2"};
		this.props.loadData(filter);
	}
	render(){
		return(
			<button type="button" onClick={this.clickHandler}>Filter</button>
		);
	}
}

module.exports = BugFilter;