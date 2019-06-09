/**
 * Babel Starter Kit (https://www.kriasoft.com/babel-starter-kit)
 *
 * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */


import React from 'react';
import PropTypes from 'prop-types';

import { TextField, Card, CardTitle, CardText } from 'material-ui';
import { Col, Row } from 'react-bootstrap';

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
  patientCard: {
    overflowY: 'none'
  },
  patientCardSpace: {
    position: 'relative'
},
}

export class HelloPatientCard extends React.Component {
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

    console.log('HelloPatientCard.render', this.props)

    let { active, familyName, givenName, fullName, email, birthdate, gender, avatar, patient, zDepth, overflowY, ...otherProps } = this.props;

    fullName = get(this, 'props.patient.name[0].text', '');
    familyName = get(this, 'props.patient.name[0].family[0]', '');        
    givenName = get(this, 'props.patient.name[0].given[0]', '');
    email = get(this, 'props.patient.contact[0].value', '');
    birthdate = get(this, 'props.patient.birthDate', '');
    gender = get(this, 'props.patient.gender', '');
    avatar = get(this, 'props.patient.photo[0].url', '');
    // avatarImg = get(this, 'props.patient.photo[0].url', '/packages/clinical_hl7-resource-patient/assets/noAvatar.png');

        
    return(
      <div className='patientCard' style={style.patientCardSpace} >
        <Card style={ style.photo } >
          <img 
            id='avatarImage' 
            className='avatarImage' 
            onError={(e)=>{e.target.onerror = null; e.target.src="https://thumbnail.imgbin.com/8/21/21/imgbin-seaspace-corporation-computer-icons-user-icon-design-others-JPq6c3J0cLkF2zfJ19f1XDyDf_t.jpg"}}
            src={ avatar } 
            style={ style.avatar} 
            />
        </Card>
        <Card style={ style.patientCard } >
          <CardTitle
              title={ fullName }
              subtitle={ email }
              style={ style.title }
            />
          <CardText>
          {/* <div id='profileDemographicsPane' style={{position: 'relative'}}>
          <Row style={ style.synopsis} >
            <Col md={6}>
              <TextField
                id='givenNameInput'
                ref='given'
                name='given'
                type='text'
                floatingLabelText='given name'
                value={ givenName }
                //onChange={ this.props.updateGivenName ? this.props.updateGivenName.bind(this) : null }
                fullWidth
                /><br/>
            </Col>
            <Col md={6}>
              <TextField
                id='familyNameInput'
                ref='family'
                name='family'
                type='text'
                floatingLabelText='family name'
                value={ familyName }
                //onChange={ this.props.updateFamilyName ? this.props.updateFamilyName.bind(this) : null }
                fullWidth
                /><br/>
            </Col>
          </Row>
          <Row style={ style.synopsis }>
            <Col md={4}>
              <TextField
                id='birthdateInput'
                ref='birthdate'
                name='birthdate'
                type='date'
                floatingLabelText='date of birth'
                floatingLabelFixed={true}
                value={ moment(birthdate).format('YYYY-MM-DD') }                          
                //onChange={ this.props.updateBirthdate ? this.props.updateBirthdate.bind(this) : null }
                fullWidth
                /><br/>
            </Col>
            <Col md={2}>
              <TextField
                id='genderInput'
                ref='gender'
                name='gender'
                type='text'
                floatingLabelText='gender'
                value={ gender }
                //onChange={ this.props.updateGender ? this.props.updateGender.bind(this) : null }
                fullWidth
                /><br/>

            </Col>
            <Col md={6}>
              <TextField
                id='avatarInput'
                ref='avatar'
                name='avatar'
                type='text'
                floatingLabelText='avatar'
                value={ avatar }
                //onChange={ this.props.updateAvatar ? this.props.updateAvatar.bind(this) : null }
                fullWidth
                /><br/>

            </Col>
          </Row>
        </div> */}
            {/* <TextField
              name='foo'
              type='text'
              floatingLabelText='Full Name'
              floatingLabelFixed={true}
              value={this.state.name}
              /> */}

          </CardText>
        </Card>
      </div>
    );
  }
}
HelloPatientCard.propTypes = {
  multiline: PropTypes.bool,
  fullName: PropTypes.string,
  familyName: PropTypes.string,
  givenName: PropTypes.string,
  email: PropTypes.string,
  birthdate: PropTypes.string,
  gender: PropTypes.string,
  avatar: PropTypes.string,
  overflowY: PropTypes.string
};
export default HelloPatientCard;
