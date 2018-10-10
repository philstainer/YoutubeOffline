import React, { Component } from 'react';
import DownloadAreaContainer from './styled/downloadarea/container'
import DownloadItem from './downloaditem'

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;


export default class DownloadArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      downloads: []
    }
  }

  componentDidMount() {
    ipcRenderer.on('download:video:info', (event, arg) => {
      
      this.setState({ downloads: [...this.state.downloads, arg] })
    })
  }

  removeItem(itemid) {
    this.setState({ downloads: [ ...this.state.downloads.filter((i, index) => index != itemid)] })
  }

  renderDownloads() {
    return (
      this.state.downloads.map((item, index) => <DownloadItem key={index} itemid={index} removeItem={this.removeItem.bind(this)} item={item} />)
    )
  }

  render() {
    return (
      <DownloadAreaContainer>
        { this.renderDownloads() }
      </DownloadAreaContainer>
    );
  }
}
