var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');


class BugAdd extends React.Component{
	constructor(){
		super();
		this.state = {
			title : '',
			owner : ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(e){
		e.preventDefault();
		this.props.addBug({owner: this.state.owner, title: this.state.title, status: 'New', priority: 'P1'});
		this.setState({
			title: '',
			owner: ''
		});
	}
	handleChange(event){
		var target = event.target;
		var name = target.name;
		var value = target.value;
		this.setState({
			[name]: value
		});
	}
	render(){
		return(
			<form onSubmit={this.handleSubmit} name="bugAdd">
				Title:<br/>
				<input type="text" name="title" value={this.state.title} onChange={this.handleChange}/>
				<br/>
				Owner:<br/>
				<input type="text" name="owner" value={this.state.owner} onChange={this.handleChange}/><br/>
				<input type="submit" value="Submit"/>
			</form>
		);
	}
}

module.exports = BugAdd;