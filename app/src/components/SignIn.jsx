import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import ProgressBar from 'react-progress-bar-plus';
import 'react-progress-bar-plus/lib/progress-bar.css';
import axios from 'axios';
import './theCss.css';


class SignIn extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            percent: -1
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
            "username": this.state.username,
            "password": this.state.password
        }
        console.log(data);
        this.setState({
            percent: 0
        });
        axios({
            method: 'post',
            url: 'http://ec2-18-188-212-25.us-east-2.compute.amazonaws.com/adminLogin',
            // url: 'http://localhost:8080/adminLogin',
            data: data
        }).then(response => {
            let data = response.data;
            if (data.code === 33) {
                NotificationManager.success("Welcome, " + this.state.username, "Success");
                this.setState({
                    percent: 100
                });
                this.props.getUserInfo(data.data._id, data.data.username);
                console.log(data.data);
                setTimeout(() => {
                    this.props.history.push('/office');
                }, 100);
            } else {
                NotificationManager.error(this.state.username + ", Are you sure you are you?", "Error");
                this.setState({
                    percent: 100
                });
            }
        }).catch((err) => {
            console.log(err);
            NotificationManager.error(this.state.username + ", Wahala Dey O!!", "Error");
            this.setState({
                percent: 100
            });
        });
    }
    render() {
        return (
            <div style={{ marginTop: 50 }}>
             <ProgressBar
                    percent={this.state.percent}
                    autoIncrement={true}
                    intervalTime={(Math.random() * 1000)}
                    spinner={'right'} />
                <div style={{  marginTop : 80, maxWidth : '30%', margin : '0 auto', textAlign : 'center' }}>
                <img src="./Logo22.png" alt="logo" style={{ width: 150, margin : '0 auto', display : 'block' }} />
                <span style={{fontSize : 20, }}>Admin Office</span>
                    <div style={{textAlign : 'left', marginBottom : 50}}>
                    <h5><b>User Name</b></h5>
                    <input type="text"
                            className="sign_in_input"
                            name="username"
                            onChange={this.handleInputChange}
                            value={this.state.username} />
                    <h5><b>Password</b></h5>
                    <input type="password"
                            className="sign_in_input"
                            name="password"
                            onChange={this.handleInputChange}
                            value={this.state.password} />
                    </div>
                    <button type="button"
                            className="sign_in_button btn btn-primary"
                            onClick={this.handleSubmit}>Sign In</button>
                </div>
                {/* <NotificationContainer /> */}
                <h6 style={{position : 'absolute', bottom : '1%', left : '50%', transform : 'translateX(-50%)'}}>&copy;VidEcom, 2018</h6>
            </div>
        );
    }
}

export default withRouter(SignIn);
