import React from 'react';
import PropTypes from 'prop-types';

import { 
  Paper,
  Card,
  CardHeader,
  CardContent
} from '@material-ui/core';

function Foo(props){
  return (<div id='foo'>
    <Card>
      <CardHeader title="Foo!" />
      <CardContent>
        Lorem ipsum....
      </CardContent>
    </Card>
  </div>
  );
}

export default Foo;