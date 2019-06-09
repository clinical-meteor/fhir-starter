/**
 * Babel Starter Kit (https://www.kriasoft.com/babel-starter-kit)
 *
 * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import { Card, CardActions, CardText, DatePicker, Toggle, RaisedButton, TextField } from 'material-ui';

import React from 'react';

export class HelloNpm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Guest'
    }
    if(props.name){
      this.state.name = props.name;      
    }
  }

  render() {
    return <Card>Welcome, {this.name}!</Card>;
  }
}

export default HelloNpm;
