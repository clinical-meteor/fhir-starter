import React from 'react';
import { Card, withStyles } from '@material-ui/core';

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

  const {children, ...otherProps } = props;

  console.log('props.classes', props.classes)

  return(
    <Card className={ props.classes.root } {...otherProps}>
      { children }
    </Card>
  );
}

export default withStyles(styles)(StyledCard);