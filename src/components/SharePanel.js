import React, { Component } from 'react';
import ClipboardJS from 'clipboard';
import './SharePanel.css';

class SharePanel extends Component {

  componentDidMount() {
    new ClipboardJS("#SharePanelURL")
  }

  render() {
    const className = this.props.className;

    return (
      <div className={"SharePanel " + className}>
       <p id="SharePanelURL" data-clipboard-target="#SharePanelURL">{this.props.shareURL}</p>
      </div>
    );  
  }
}

export default SharePanel;
