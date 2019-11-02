/**
 * Copyright © 2015-2016 Symptomatic, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { TextField, Card, CardTitle, CardText } from 'material-ui';

import { Grid, Col, Row } from 'react-bootstrap';

import { get } from 'lodash-es';
import moment from 'moment-es6'

const style = {
  avatar: {
      position: 'absolute',
      zIndex: 10,
      transition: '1s',
      left: '0px',
      top: '0px',
      width: '100%',
      height: '100%',
      objectFit: 'cover'
  }, 
  photo: {
      position: 'absolute',
      height: '160px',
      width: '160px',
      left: '-20px',
      top: '-10px',       
      zIndex: 10 
  },
  title: {
      left: '160px'
  },
  synopsis: {
      marginLeft: '160px',
      position: 'relative',
      top: '0px'
  },
  content: {
    marginLeft: '160px',
    position: 'relative'
  },
  patientCard: {
    overflowY: 'none'
  },
  patientCardSpace: {
    position: 'relative'
},
}

export class PatientCard extends React.Component {
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
    let { identifier, active, familyName, givenName, fullName, email, birthdate, gender, avatar, patient, zDepth, overflowY, ...otherProps } = this.props;

    fullName = get(this, 'props.patient.name[0].text', '');
    familyName = get(this, 'props.patient.name[0].family[0]', '');        
    givenName = get(this, 'props.patient.name[0].given[0]', '');
    email = get(this, 'props.patient.contact[0].value', '');
    birthdate = get(this, 'props.patient.birthDate', '');
    gender = get(this, 'props.patient.gender', '');
    avatar = get(this, 'props.patient.photo[0].url', '');
    identifier = get(this, 'props.patient.identifier[0].value', '');
        
    let details;
    if(!this.props.hideDetails){
        details = <div id='profileDemographicsPane' style={{position: 'relative'}}>
                  <Row style={ style.synopsis} >
                    <Col md={6}>
                      <TextField
                        id='givenNameInput'
                        name='given'
                        type='text'
                        floatingLabelText='given name'
                        value={ givenName }                        
                        fullWidth
                        /><br/>
                    </Col>
                    <Col md={6}>
                      <TextField
                        id='familyNameInput'
                        name='family'
                        type='text'
                        floatingLabelText='family name'
                        value={ familyName }                        
                        fullWidth
                        /><br/>
                    </Col>
                  </Row>
                  <Row style={ style.synopsis }>
                    <Col md={4}>
                      <TextField
                        id='birthdateInput'
                        name='birthdate'
                        type='date'
                        floatingLabelText='date of birth'
                        floatingLabelFixed={true}
                        value={ moment(birthdate).format('YYYY-MM-DD') }                                                  
                        fullWidth
                        /><br/>
                    </Col>
                    <Col md={2}>
                      <TextField
                        id='genderInput'
                        name='gender'
                        type='text'
                        floatingLabelText='gender'
                        value={ gender }                        
                        fullWidth
                        /><br/>

                    </Col>
                    <Col md={6}>
                      <TextField
                        id='avatarInput'
                        name='avatar'
                        type='text'
                        floatingLabelText='avatar'
                        value={ avatar }                        
                        fullWidth
                        /><br/>

                    </Col>
                  </Row>
                </div>

    }

    if(this.props.style){
      style.patientCard = this.props.style;
    }

    return(
      <div className='patientCard' style={style.patientCardSpace} >
        <Card style={ style.photo } >
          <img 
            id='avatarImage' 
            className='avatarImage' 
            onError={(e)=>{e.target.onerror = null; e.target.src = get(this, 'props.defaultAvatar') }}
            src={ avatar } 
            style={ style.avatar} 
            />
        </Card>
        <Card style={ style.patientCard } >
          <CardTitle
              title={ fullName }
              subtitle={ birthdate + ', ' + gender }
              style={ style.title }
            />
          <CardText>
            { details }
          </CardText>
        </Card>
      </div>
    );
  }
}
PatientCard.propTypes = {
  multiline: PropTypes.bool,
  fullName: PropTypes.string,
  familyName: PropTypes.string,
  givenName: PropTypes.string,
  email: PropTypes.string,
  birthdate: PropTypes.string,
  gender: PropTypes.string,
  avatar: PropTypes.string,
  hideDetails: PropTypes.bool,
  overflowY: PropTypes.string,
  style: PropTypes.object,
  defaultAvatar: PropTypes.string
};
export default PatientCard;
