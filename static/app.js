var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

class BugFilter extends React.Component {
	render() {
		return React.createElement(
			'div',
			null,
			'Bug filtering'
		);
	}
}

class BugRow extends React.Component {
	render() {
		return React.createElement(
			'tr',
			null,
			React.createElement(
				'td',
				null,
				this.props.bug._id
			),
			React.createElement(
				'td',
				null,
				this.props.bug.status
			),
			React.createElement(
				'td',
				null,
				this.props.bug.priority
			),
			React.createElement(
				'td',
				null,
				this.props.bug.owner
			),
			React.createElement(
				'td',
				null,
				this.props.bug.title
			)
		);
	}
}

class BugTable extends React.Component {
	render() {
		var bugRows = this.props.bugs.map(bug => {
			return React.createElement(BugRow, { key: bug._id, bug: bug });
		});
		return React.createElement(
			'table',
			null,
			React.createElement(
				'thead',
				null,
				React.createElement(
					'tr',
					null,
					React.createElement(
						'th',
						null,
						'Id'
					),
					React.createElement(
						'th',
						null,
						'Status'
					),
					React.createElement(
						'th',
						null,
						'Priority'
					),
					React.createElement(
						'th',
						null,
						'Owner'
					),
					React.createElement(
						'th',
						null,
						'Title'
					)
				)
			),
			React.createElement(
				'tbody',
				null,
				bugRows
			)
		);
	}
}

class BugAdd extends React.Component {
	constructor() {
		super();
		this.state = {
			title: '',
			owner: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(e) {
		e.preventDefault();
		this.props.addBug({ owner: this.state.owner, title: this.state.title, status: 'New', priority: 'P1' });
		this.setState({
			title: '',
			owner: ''
		});
	}
	handleChange(event) {
		var target = event.target;
		var name = target.name;
		var value = target.value;
		this.setState({
			[name]: value
		});
	}
	render() {
		return React.createElement(
			'form',
			{ onSubmit: this.handleSubmit, name: 'bugAdd' },
			'Title:',
			React.createElement('br', null),
			React.createElement('input', { type: 'text', name: 'title', value: this.state.title, onChange: this.handleChange }),
			React.createElement('br', null),
			'Owner:',
			React.createElement('br', null),
			React.createElement('input', { type: 'text', name: 'owner', value: this.state.owner, onChange: this.handleChange }),
			React.createElement('br', null),
			React.createElement('input', { type: 'submit', value: 'Submit' })
		);
	}
}

class BugList extends React.Component {
	constructor() {
		super();
		this.state = { bugs: [] };
		this.addBug = this.addBug.bind(this);
	}
	componentDidMount() {
		//ajax request here

		$.ajax('/api/bugs').done(data => {
			this.setState({ bugs: data });
		});
	}
	addBug(bug) {
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
	render() {
		return React.createElement(
			'div',
			null,
			React.createElement(
				'h1',
				null,
				'Hide me'
			),
			React.createElement(BugFilter, null),
			React.createElement(BugTable, { bugs: this.state.bugs }),
			React.createElement(BugAdd, { addBug: this.addBug })
		);
	}
}

ReactDOM.render(React.createElement(BugList, null), document.getElementById('main'));