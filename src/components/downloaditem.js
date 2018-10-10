import React, { Component } from 'react';

import DownloadItemContainer from './styled/downloadarea/item'
import Button from './styled/button'

export default class DownloadItem extends Component {
  render() {
    return (
      <DownloadItemContainer>
        <div>
          <img src={ this.props.item.thumbnail } />
          <span>{ this.props.item.duration.split(' ')[0] }</span>
          { console.log(this.props) }
        </div>
        <div>
          <h3>{ this.props.item.title }</h3>
          <a>{ this.props.item.resolution.split(' ')[0] }</a>
        </div>
        <div>
          <Button onClick={ () => this.props.removeItem(this.props.itemid)}>&times;</Button>
        </div>
      </DownloadItemContainer>
    );
  }
}