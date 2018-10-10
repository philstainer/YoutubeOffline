import React, { Component } from 'react'

import ActionBar from './actionbar'
import DownloadArea from './downloadarea'

const electron = window.require('electron');
const fs = electron.remote.require('fs');
const path = electron.remote.require('path');
const url = electron.remote.require('url');

const ipcRenderer  = electron.ipcRenderer;

const clipboard = electron.remote.require('electron').clipboard;

export default class App extends Component {

  

  handleNewVideo = e => {
    var data = clipboard.readText('selection')
    var search = url.parse(data)
    
    if(search.host = "www.youtube.com") {
      ipcRenderer.send('download:video', data)
      console.log('sent')
    }

    console.log(data)
  }

  render() {
    return (
      <div onPaste={ this.handleNewVideo }>
        <ActionBar paste={ this.handleNewVideo } />
        <DownloadArea />
      </div>
    )
  }
}
