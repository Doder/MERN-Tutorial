var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var BugAdd = require('./bugAdd.js');
var BugFilter = require('./bugFilter.js');

class BugRow extends React.Component{
	render(){
		return(
		<tr>
			<td>{this.props.bug._id}</td>
			<td>{this.props.bug.status}</td>
			<td>{this.props.bug.priority}</td>
			<td>{this.props.bug.owner}</td>
			<td>{this.props.bug.title}</td>
		</tr>
		);
	}
}

class BugTable extends React.Component{
	render(){
		var bugRows = this.props.bugs.map((bug) => {
			return <BugRow key={bug._id} bug={bug}/>
		}
		);
		return(
		<table>
		<thead>
			<tr>
				<th>Id</th>
				<th>Status</th>
				<th>Priority</th>
				<th>Owner</th>
				<th>Title</th>
			</tr>
		</thead>
		<tbody>
			{bugRows}
		</tbody>
		</table>
		);
	}
}

class BugList extends React.Component{
	constructor(){
		super();
		this.state = {bugs: []};
		this.addBug = this.addBug.bind(this);
		this.loadData = this.loadData.bind(this);
	}
	componentDidMount(){
		//ajax request here
		this.loadData();
	}
	loadData(filter = { priority: 'any' ,status : 'any'}){
		var status = filter.status ;
		var priority = filter.priority;
		console.log(`ajax: /api/bugs?priority=${priority}&status=${status}`);
		$.ajax(`/api/bugs?priority=${priority}&status=${status}`).done((data) =>{
			this.setState({bugs: data});
		});
	}
	addBug(bug){
		console.log("Adding bug:", bug);
		$.ajax({
			type: 'POST', url: '/api/bugs', contentType: 'application/json',
			data: JSON.stringify(bug),
			success: function (data) {
				var bug = data;
				// We're advised not to modify the state, it's immutable. So, make a copy.
				var bugsModified = this.state.bugs.concat(bug);
				this.setState({ bugs: bugsModified });
			}.bind(this),
			error: function (xhr, status, err) {
				// ideally, show error to user.
				console.log("Error adding bug:", err);
			}
		});
	}
	render(){
		return(
			<div>
			<BugFilter loadData={this.loadData}/>
			<BugTable bugs={this.state.bugs}/>
			<BugAdd addBug = {this.addBug}/>
			</div>
			
		);
	}
}

module.exports = BugList;