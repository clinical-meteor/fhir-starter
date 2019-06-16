/**
 * Babel Starter Kit (https://www.kriasoft.com/babel-starter-kit)
 *
 * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */


import React from 'react';
import PropTypes from 'prop-types'

import { TextField, Card, CardTitle, CardText } from 'material-ui';


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
    return(
      <div style={{margin: '40px'}}>
        <Card>
          <CardTitle 
            title="Hello Npm"
            subtitle="set dolar et..."
            />
          <CardText>
            <TextField
              name='foo'
              type='text'
              floatingLabelText='Full Name'
              floatingLabelFixed={true}
              value={this.state.name}
              />
          {/* <RaisedButton id="foo">Foo</RaisedButton> */}

          </CardText>
        </Card>
      </div>
    );
  }
}
HelloNpm.propTypes = {
  id: PropTypes.string,
};
export default HelloNpm;
