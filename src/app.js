var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

class BugFilter extends React.Component{
	render(){
		return(
			<div>Bug filtering</div>
		);
	}
}

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

class BugList extends React.Component{
	constructor(){
		super();
		this.state = {bugs: []};
		this.addBug = this.addBug.bind(this);
	}
	componentDidMount(){
		//ajax request here
		
		$.ajax('/api/bugs').done((data) =>{
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
			<h1>Hide me</h1>
			<BugFilter/>
			<BugTable bugs={this.state.bugs}/>
			<BugAdd addBug = {this.addBug}/>
			</div>
			
		);
	}
}




ReactDOM.render(
			<BugList/>,
			document.getElementById('main')
			);