import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import 'babel-polyfill'

import Fluxxor from 'fluxxor'
import Stores from './Stores'
import Actions from './Actions'

import HomePage from './components/route-handlers/HomePage'
import SearchPage from './components/route-handlers/SearchPage'

var flux = new Fluxxor.Flux(Stores, Actions)

// Debuging dispatches.
flux.on('dispatch', function(type, payload) {
  console.log('Dispatch', type, payload);
});


// In order to run fluxxor in react-router 1.x,
// we have to create a wrapper whose context will be used to
// transmit flux through the whole app tree.
// https://github.com/BinaryMuse/fluxxor/issues/137
function rootPass(props) {
  const { children, tree, ...otherProps } = props;

  return {...otherProps};
}

function renderChildren(children, props) {
  if (!children) {
    return null
  }

  if (!Array.isArray(children)) {
    return React.cloneElement(children, props);
  }

  var group = React.Children.map(children, child => {
    return React.cloneElement(child, props);
  });

  return <span>{ group }</span>;
}

var Root = React.createClass({
  propTypes: {
    flux: (t) => {if(!t.flux) return new Error('Powerzone inversion!')}
  },

  childContextTypes: {
    flux: (t) => {if(!t.flux) return new Error('Powerzone inversion!')}
  },

  getChildContext() {
    return {
      flux: this.props.flux
    };
  },

  render() {
    return renderChildren(this.props.children, rootPass(this.props));
  }
})

ReactDOM.render((
    <Root flux={flux}>
      <Router>
        <Route path='/' component={ HomePage } />
        <Route path='/search' component={ SearchPage } />
      </Router>
    </Root>
), document.getElementById('app'))