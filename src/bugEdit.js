var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Link = require('react-router').Link;
import {Form, Panel, FormControl, FormGroup,
     ControlLabel, Button, ButtonToolbar,
      ButtonGroup, Alert } from 'react-bootstrap'

class BugEdit extends React.Component {
    constructor(doc){
        super();
        this.state = {
            title : 'undefined',
            owner : 'underfined',
            status : 'undefined',
            priority : 'undefined',
            isAlertHidden : true
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
				this.setState({
                    isAlertHidden : false
                });
                console.log('success');
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
            <Panel header="Edit Bug" style={{maxWidth: 600}}>
            <Form name="bugEdit">
                <FormGroup>
                    <ControlLabel>Title:</ControlLabel>
				    <FormControl type="text" name="title" value={this.state.title} onChange={this.handleChange}/>
				</FormGroup>
                <FormGroup>
				    <ControlLabel>Owner:</ControlLabel>
				    <FormControl type="text" name="owner" value={this.state.owner} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Status:</ControlLabel>
				    <FormControl type="text" name="status" value={this.state.status} onChange={this.handleChange}/>
				</FormGroup>
                <FormGroup>
                    <ControlLabel>Priority:</ControlLabel>
                    <FormControl type="text" name="priority" value={this.state.priority} onChange={this.handleChange}/>
				</FormGroup>
			</Form>
            <ButtonToolbar> 
                <ButtonGroup>
                    <Button bsStyle="primary" onClick={this.handleSubmit}>Submit</Button>
                 </ButtonGroup>
                  <ButtonGroup>
                    <Link className="btn btn-link" to="/bugs">Back</Link>
                 </ButtonGroup>
            </ButtonToolbar>
            {this.state.isAlertHidden? 
            '': <Alert bsStyle="success">
                <strong>Bug saved to DB successfully.</strong>
            </Alert> 
            }
            </Panel>
        );
    }
}

module.exports = BugEdit;

