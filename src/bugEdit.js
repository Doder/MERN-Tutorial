var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Link = require('react-router').Link;

class BugEdit extends React.Component {
    constructor(doc){
        super();
        this.state = {
            title : 'undefined',
            owner : 'underfined',
            status : 'undefined',
            priority : 'undefined'
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        $.ajax('/api/bugs/' + this.props.params.bugId).done((data) => {
            this.setState(data);
        });
    }
    handleSubmit(e){
        e.preventDefault();
        const bug = {title: this.state.title, owner: this.state.owner,
             status: this.state.status, priority: this.state.priority};
        $.ajax({
            type: 'PUT',
            url: '/api/bugs/'+this.props.params.bugId,
            contentType: 'application/json',
            data: JSON.stringify(bug),
			success: function (data) {
				
			}.bind(this),
			error: function (xhr, status, err) {
				// ideally, show error to user.
				console.log("Error adding bug:", err);
			}
        });
    }
    handleChange(e){
        let target = e.target;
        let x = target.name;
        this.setState({
            [x] : target.value
        });
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} name="bugEdit">
				Title:<br/>
				<input type="text" name="title" value={this.state.title} onChange={this.handleChange}/>
				<br/>
				Owner:<br/>
				<input type="text" name="owner" value={this.state.owner} onChange={this.handleChange}/><br/>
                Status:<br/>
				<input type="text" name="status" value={this.state.status} onChange={this.handleChange}/>
				<br/>
                Priority:<br/>
				<input type="text" name="priority" value={this.state.priority} onChange={this.handleChange}/>
				<br/>
				<input type="submit" value="Submit"/>
			</form>
            <Link to="/bugs">Bug List</Link>
            </div>
        );
    }
}

module.exports = BugEdit;

