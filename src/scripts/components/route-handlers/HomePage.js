import React from 'react'
import SideBar from '../layout/Sidebar.js'
import Content from '../layout/Content.js'
import Calendar from '../Calendar'

var HomePage = React.createClass({
  render() {
    var blockName = 'route-home'
    return (
        <div className={blockName}>
          <SideBar />
          <Content>
            <Calendar />
          </Content>
        </div>
    );
  }
});

export default HomePage