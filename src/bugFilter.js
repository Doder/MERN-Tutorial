var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
import {Button, Panel, Grid, Row, Col} from 'react-bootstrap';


class BugFilter extends React.Component{
	constructor(){
		super();
		this.state = {
			priority : '',
			status: ''
		};
		this.clickHandler = this.clickHandler.bind(this);
		this.changeHandler = this.changeHandler.bind(this);
	}
	componentDidMount(){
		this.setState({
			priority : this.props.query.priority,
			status: this.props.query.status
		});
	}
	clickHandler(){
		var filter = {
			priority : this.state.priority,
			status: this.state.status,
		}
		this.props.changeFilter(filter);
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
	componentWillReceiveProps(nextProps){
		let newPriority = nextProps.query.priority;
		let newStatus = nextProps.query.status;
		let filter = {
			priority : newPriority,
			status: newStatus
		}
		if(newPriority !== this.state.priority ||
		newStatus !== this.state.status){
			this.setState(filter);
		}
	}
	render(){
		return(
			<Panel header="Filter" collapsible expanded={true}>
			<Grid fluid={true}>
				<Row>
				<Col md={4}>
				<label>Priority</label>
				<select name='priority' value={this.state.priority} onChange={this.changeHandler}>
					<option value="undefined">Any</option>
					<option value="P1">P1</option>
					<option value="P2">P2</option>
				</select>
				</Col>
				<Col md={4}>
				<label>Status</label>
				<select name='status' value={this.state.status} onChange={this.changeHandler}>
					<option value="undefined">Any</option>
					<option value="New">New</option>
					<option value="Old">Old</option>
				</select>
				</Col>
				<Col md={4}>
				<Button bsStyle="primary" onClick={this.clickHandler}>Filter</Button>
				</Col>
			</Row>
			</Grid>
			</Panel>
		);
	}
}

module.exports = BugFilter;