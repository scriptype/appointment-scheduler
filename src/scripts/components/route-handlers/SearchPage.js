import React from 'react'
import SideBar from '../layout/Sidebar.js'
import Content from '../layout/Content.js'

var SearchPage = React.createClass({
  render() {
    var blockName = 'route-search'
    return (
        <div className={blockName}>
          <SideBar />
          <Content>
            <h1>Search</h1>
          </Content>
        </div>
    );
  }
});

export default SearchPage