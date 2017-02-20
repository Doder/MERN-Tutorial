var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
import {Panel, Form, Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap'

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
			<Panel header="Add New Bug">
			<Form inline onSubmit={this.handleSubmit} name="bugAdd">
				<FormGroup>
					<ControlLabel>Title</ControlLabel>
					<FormControl type="text" name="title" value={this.state.title} onChange={this.handleChange} />
				</FormGroup>
				<FormGroup>
					<ControlLabel>Owner</ControlLabel>
					<FormControl type="text" name="title" value={this.state.title} onChange={this.handleChange} />
				</FormGroup>
				<Button type="submit">
					Submit
				</Button>
			</Form>
			</Panel>
		);
	}
}

module.exports = BugAdd;