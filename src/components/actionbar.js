import React, { Component } from 'react';
import ActionBar from './styled/actionbar/actionbar'
import InputArea from './styled/inputarea'
import Button from './styled/button'

const electron = window.require('electron');
const fs = electron.remote.require('fs');
const path = electron.remote.require('path');

const ipcRenderer  = electron.ipcRenderer;

const dialog = electron.remote.require('electron').dialog;

const Store = electron.remote.require(path.resolve('./store'))

const store = new Store({
  configName: 'user-preferences'
});




class Home extends Component {
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
        if(path) {
          this.setState({ downloadLocation: path[0] }, () => {
            store.setKeys({ downloadLocation: this.state.downloadLocation })
          })
        }
      })
  }

  render() {

    

    return (
      <ActionBar>
        <Button green medium onClick={ this.props.paste }><span>&#43;</span>Paste</Button>
        <InputArea type="text" value={this.state.downloadLocation} onClick={ this.handleChangeDownloadLocation }></InputArea>
        <Button blue medium><span>&darr;</span>Download</Button>
      </ActionBar>
    );
  }
}

export default Home;
