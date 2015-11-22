import React from 'react'

var Content = React.createClass({
  render() {
    var blockName = 'content'

    return (
        <div className={blockName}>
          <div className={`${blockName}__inner`}>
            { this.props.children }
          </div>
        </div>
    );
  }
});

export default Content