import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


const electron = window.require('electron');
const fs = electron.remote.require('fs');
const path = electron.remote.require('path');

const ipcRenderer  = electron.ipcRenderer;
//const app = electron.app

const dialog = electron.remote.require('electron').dialog;

const Store = electron.remote.require(path.resolve('./store'))

const store = new Store({
  configName: 'user-preferences'
});


class UserSettings extends Component {
  constructor(props){
    super(props)
    this.state = {
      downloadLocation: null,
    }
  }

  componentWillMount() {
    let { downloadLocation } = store.data
    
    this.setState({ downloadLocation })
  }

  handleChangeDownloadLocation = () => {
    dialog.showOpenDialog({
        properties: ['openDirectory']
      }, path => {
        if(path)
          this.setState({ downloadLocation: path[0] })
      })
  }

  handleSaveSettings = (e) => {
    e.preventDefault();

    dialog.close();

    store.setKeys({ downloadLocation: this.state.downloadLocation }, ({ downloadLocation }) => {
      this.setState({ downloadLocation })      
      this.props.history.push('/')
    })
 
  }
  
  render() {
    return (
      <div>
        <form onSubmit={ this.handleSaveSettings }> 
          <input type="text" value={this.state.downloadLocation} onClick={ this.handleChangeDownloadLocation } style={{ '-webkit-app-region': 'no-drag' }}/>
          <button type="submit" style={{ '-webkit-app-region': 'no-drag' }}>Save Settings</button>
        </form>
      </div>
    );
  }
}

export default withRouter(UserSettings);
