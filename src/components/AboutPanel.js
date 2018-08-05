import React, { Component } from 'react';
import './AboutPanel.css';

class AboutPanel extends Component {


  render() {
    const className = this.props.className;

    return (
      <div className={"AboutPanel " + className}>
        <i onClick={this.props.toggleAbout} class="material-icons AboutPanel-close">close</i>
        <h1 className="AboutPanel-header">rainy life</h1>
        <h3 className="AboutPanel-subheader">rain simulator for the heart and soul</h3>
      </div>
    );  
  }
}

export default AboutPanel;
