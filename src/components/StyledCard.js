import React from 'react';
import PropTypes from 'prop-types';
import { Card, withStyles } from '@material-ui/core';

import _ from 'lodash';
let get = _.get;

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.paper.contrastText,
    backgroundColor: theme.palette.paper.main
  }
});


function StyledCard(props){
  console.log('StyledCard.props', props);

  let {children, style, padding, ...otherProps } = props;

  console.log('props.classes', props.classes)

  if(typeof style === "undefined"){
    style = {};
  }

  let headerHeight = 64;
  let paddingHeight = 20;
  let footerHeight = 64;


  if(get(Meteor, 'settings.public.defaults.prominantHeader', false)){
    headerHeight = 128;
  } 

  if(get(props, 'headerHeight')){
    headerHeight = get(props, 'headerHeight')
  }

  let cardsInLayout = 1;
  if(get(props, 'cardsInLayout')){
    cardsInLayout = get(props, 'cardsInLayout')
  }

  if(padding){
    paddingHeight = padding
  }

  if(get(props, 'height') === "auto"){
    style.height = (window.innerHeight - headerHeight - ((cardsInLayout + 1 ) * paddingHeight) - footerHeight) + "px";
  }

  if(get(props, 'scrollable') === true){
    style.overflowY = "scroll";
  }

  if(get(props, 'margin')){
    style.marginTop = get(props, 'margin', 0) + 'px';
  }

  return(
    <Card className={ props.classes.root } {...otherProps} style={style}>
      { children }
    </Card>
  );
}


StyledCard.propTypes = {
  prominantHeader: PropTypes.bool,
  headerHeight: PropTypes.number,
  cardsInLayout: PropTypes.number,
  height: PropTypes.string,
  scrollable: PropTypes.bool,
  margin: PropTypes.number
};

export default withStyles(styles)(StyledCard);