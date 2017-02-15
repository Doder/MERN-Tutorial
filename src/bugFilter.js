var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

class BugFilter extends React.Component{
	constructor(){
		super();
		this.state = {
			priority : 'any',
			status : 'any'
		};
		this.clickHandler = this.clickHandler.bind(this);
		this.changeHandler = this.changeHandler.bind(this);
	}
	clickHandler(){
		var filter = {
			priority : this.state.priority,
			status: this.state.status,
		}
		this.props.loadData(filter);
	}
	changeHandler(e){
		e.preventDefault();
		var target = e.target;
		var filterItem = target.name;
		var value = target.value;
		
		this.setState({
			[filterItem]: value
		});

	}
	render(){
		return(
			<div id="filter">
				<label>Priority</label>
				<select name="priority" onChange={this.changeHandler}>
					<option value="any">Any</option>
					<option value="P1">P1</option>
					<option value="P2">P2</option>
				</select><br/>
				<label>Status</label>
				<select name="status" onChange={this.changeHandler}>
					<option value="any">Any</option>
					<option value="New">New</option>
					<option value="Old">Old</option>
				</select><br/>
				<button type="button" onClick={this.clickHandler}>Filter</button>
			</div>
		);
	}
}

module.exports = BugFilter;