import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import SignIn from './components/SignIn';
import Office from './components/Office'
import './App.css';
import UploadAudio from './components/UploadAudio';
import DesignTemplates from './components/DesignTemplates';
import UploadVideoTuorial from './components/UploadVideoTutorial';
import CreateUser from './components/CreateUser';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      username: ''
    };
    this.getUserInfo = this.getUserInfo.bind(this);
  }


  getUserInfo(id, username) {
    this.setState({ id: id, username: username });
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact={true} path="/" render={() => <SignIn
            getUserInfo={this.getUserInfo} />} />
          <Route path="/office" render={() => <Office
            username={this.state.username} />} />
          <Route path="/uploadaudio" render={() => <UploadAudio
            username={this.state.username} />} />
          <Route path="/designtemplates" render={() => <DesignTemplates
            username={this.state.username} />} />
          <Route path="/uploadvideotutorial" render={() => <UploadVideoTuorial
            username={this.state.username} />} />
          <Route path="/createuser" render={() => <CreateUser
            username={this.state.username} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
