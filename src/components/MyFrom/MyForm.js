import React from 'react';
import './MyForm.css';

class MyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: '',
            name: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

handleChange    (event) { this.setState({ name: event.target.value }); }

    handleSubmit(event) {
        event.preventDefault();

        fetch('http://localhost:8080/info/basic?molecule='+this.state.name)
            .then((response) => response.json())
            .then(info => {
                this.setState({ info:  Object.entries(info.basicMoleculeInfo).map(([key, value]) => [key + ": " + value + "\n"])} );
            });
    }

    render() {
        return (
            <form id="myForm" onSubmit={this.handleSubmit}>
                <label>
                    Please enter molecule name:
                <input id="name" type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
                <textarea id="myTextarea" value={this.state.info} />
            </form>
        );
    }
}

export default MyForm;