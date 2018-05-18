import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'simplebar';
import 'simplebar/dist/simplebar.css';
import './ControlPanel.css';
import backgroundsJSON from '../data/backgrounds.json';
import soundsJSON from '../data/sounds.json';

class ControlPanel extends Component {

  constructor(props) {
    super(props)

    this.state = {
      backgrounds: backgroundsJSON,
      sounds: soundsJSON
    }
  }

  render() {
    return (
      <div className="ControlPanel">
        <Tabs>
          <TabList>
            <Tab>Sounds</Tab>
            <Tab>Background</Tab>
          </TabList>
      
          <TabPanel>
            <div className="ControlPanel-scroll" data-simplebar>
              {
                this.state.sounds.length > 0 && this.state.sounds.map(sound => {
                  return (
                    <div key={sound.title}>
                      <p>{sound.title}</p>
                    </div>
                  )
                })
              }
            </div>
          </TabPanel>
          <TabPanel>
            <div className="ControlPanel-scroll" data-simplebar>
              {
                this.state.backgrounds.length > 0 && this.state.backgrounds.map(background => {
                  return (
                    <div key={background.title}>
                      <div onClick={() => this.props.changeBackground(background.backgroundURL)} className="ControlPanel-thumbnail-container">
                        <img alt={background.title} src={background.thumbnailURL} className="ControlPanel-thumbnail" />
                      </div>
                      <p>{background.title}</p>
                    </div>
                  )
                })
              }
            </div>
          </TabPanel>
        </Tabs>
      </div>
    );  
  }
}

export default ControlPanel;
