import React from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types'

import _ from 'lodash';
let get = _.get;

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingLeft: '100px', 
    paddingRight: '100px',
    verticalAlign: 'top',
    display: 'inline-block', 
    height: '100%',
    width: '100%'
  }
});

function PageCanvas(props){
  // console.log('PageCanvas.props', props);

  const {children, classes, headerHeight, paddingLeft, paddingRight, style, ...otherProps } = props;

  let returnedHeaderHeight = 0;
  let returnedStyle = {};

  if(style){
    returnedStyle = Object.assign(returnedStyle, style);
  }

  if(headerHeight > 0){
    returnedStyle.paddingTop = headerHeight + 'px';
  }
  if(paddingLeft > 0){
    returnedStyle.paddingLeft = paddingLeft + 'px';
  }
  if(paddingRight > 0){
    returnedStyle.paddingRight = paddingRight + 'px';
  }

  return(
    <div className={ props.classes.root } {...otherProps} style={returnedStyle} >
      { children }
    </div>
  );
}

export default withStyles(styles)(PageCanvas);

PageCanvas.propTypes = {
  headerHeight: PropTypes.number,
  paddingLeft: PropTypes.number,
  paddingRight: PropTypes.number,
  children: PropTypes.any,
  style: PropTypes.object
}