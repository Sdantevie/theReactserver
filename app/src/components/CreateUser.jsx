import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import ProgressBar from 'react-progress-bar-plus';
import 'react-progress-bar-plus/lib/progress-bar.css';




class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            percent: -1,
            conversation: 'Enter name, email and password.',
            created: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.goback = this.goback.bind(this);
    }


    goback() {
        this.props.history.push('/office');
    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value,
            percent: -1
        });
    }

    handleSubmit() {
        let data = {
            "email": this.state.email,
            "password": this.state.password,
            "name": this.state.name
        }
        console.log(data);
        this.setState({
            percent: 0,
            conversation: 'Creating User Account...'
        });
        axios({
            method: 'post',
            url: 'http://ec2-18-188-212-25.us-east-2.compute.amazonaws.com/usersignUp',
            // url: 'http://localhost:8080/usersignUp',
            data: data
        }).then(response => {
            let data = response.data;
            this.setState({
                percent: 100,
                conversation: 'User Account Created!!',
                created: true
            });
            console.log(data);
        }).catch((err) => {
            console.log(err);
            this.setState({
                percent: 100
            });
        });
    }


    render() {
        return (
            <div style={{ padding: 40 }}>
                <ProgressBar
                    percent={this.state.percent}
                    autoIncrement={true}
                    intervalTime={(Math.random() * 1000)}
                    spinner={'right'} />
                <img src="./baccccc.png" style={{ width: 20, cursor: 'pointer', height: 15, marginBottom: 3 }} onClick={() => this.goback()} alt="back" />
                <span style={{ fontSize: 20, marginLeft: 20, marginTop: 10 }}>Create User</span>
                <div style={{ maxWidth: '70%', margin: '0 auto', paddingTop: 50 }} className="row">
                    <div style={{ borderRight: '1px solid #59A4D6' }} className="col-md-7">
                        <h5><b>Name</b></h5>
                        <input type="text"
                            className="sign_in_input"
                            name="name"
                            onChange={this.handleInputChange}
                            value={this.state.name} />
                        <h5><b>Email</b></h5>
                        <input type="text"
                            className="sign_in_input"
                            name="email"
                            onChange={this.handleInputChange}
                            value={this.state.email} />
                        <h5><b>Password</b></h5>
                        <input type="text"
                            className="sign_in_input"
                            name="password"
                            onChange={this.handleInputChange}
                            value={this.state.password} />
                        <button type="button"
                            style={{ marginTop: 10 }}
                            className="sign_in_button btn btn-primary"
                            onClick={this.handleSubmit}>Create</button>
                    </div>
                    <div style={{ padding: '5% 0' }} className="col-md-5">
                        {this.state.created ? (
                            <div style={{paddingLeft : 10}}>
                                <span style={{ fontSize: 20 }}>{this.state.conversation}</span><br/><br/>
                                <span>Name  : {this.state.name}</span> <br/>
                                <span>Email : {this.state.email}</span> <br/>
                                <span>password : {this.state.password}</span> <br/>
                            </div>
                        ) : (
                                <div style={{ padding: '20% 0' }}>
                                    <span style={{ fontSize: 20, paddingLeft: 10 }}>{this.state.conversation}</span>
                                </div>
                            )}
                    </div>
                </div>
                <h6 style={{ position: 'absolute', bottom: '1%', left: '50%', transform: 'translateX(-50%)' }}>&copy;VidEcom, 2018</h6>
            </div>
        );

    }
}


export default withRouter(CreateUser);