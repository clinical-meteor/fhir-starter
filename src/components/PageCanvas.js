import React from 'react';
import PropTypes from 'prop-types'

import { get } from 'lodash';


function PageCanvas(props){
  // console.log('PageCanvas.props', props);

  const {
    logging,
    children, 
    classes, 
    headerHeight, 
    paddingLeft, 
    paddingRight, 
    style, 
    ...otherProps 
  } = props;

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

  if(logging){
    console.log('PageCanvas.logging', logging)
    // console.log('returnedStyle', returnedStyle)
  }

  return(
    <div className="pageCanvas" {...otherProps} style={returnedStyle} >
      { children }
    </div>
  );
}
PageCanvas.propTypes = {
  headerHeight: PropTypes.number,
  paddingLeft: PropTypes.number,
  paddingRight: PropTypes.number,
  children: PropTypes.any,
  style: PropTypes.object,
  logging: PropTypes.bool
}
PageCanvas.defaultProps = {
  headerHeight: 0,
  paddingLeft: 100,
  paddingRight: 100,
  style: {
    flexGrow: 1,
    paddingLeft: '100px', 
    paddingRight: '100px',
    verticalAlign: 'top',
    display: 'inline-block', 
    height: '100%',
    width: '100%'
  },
  logging: false
}

export default PageCanvas;

