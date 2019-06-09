import React from 'react';

import { GlassCard, DynamicSpacer } from 'meteor/clinical:glass-ui';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import { Col, Row } from 'react-bootstrap';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';

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
        height: '100%'
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
        position: 'relative'
    }
}


export class PatientCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    // console.log('&&&&&&&&&&&&&&&&&&&')
    console.log('PatientCard.render', this.props)

    let { active, familyName, givenName, fullName, email, birthdate, gender, avatar, patient, zDepth, overflowY, ...otherProps } = this.props;

    fullName = get(this, 'props.patient.name[0].text', '');
    familyName = get(this, 'props.patient.name[0].family[0]', '');        
    givenName = get(this, 'props.patient.name[0].given[0]', '');
    email = get(this, 'props.patient.contact[0].value', '');
    birthdate = get(this, 'props.patient.birthDate', '');
    gender = get(this, 'props.patient.gender', '');
    avatar = get(this, 'props.patient.photo[0].url', '');
    // avatarImg = get(this, 'props.patient.photo[0].url', '/packages/clinical_hl7-resource-patient/assets/noAvatar.png');

    return (
      // <div className='patientCard' {...otherProps} style={style.patientCard} >
      <div className='patientCard' style={style.patientCard} >
        <Card zDepth={zDepth} style={ style.photo }>
            <img id='avatarImage' className='avatarImage' ref='avatarImage' onError={this.imgError.bind(this)} src={ avatar } style={ style.avatar} />
        </Card>
        <GlassCard overflowY={overflowY} >
            <CardTitle
                title={ fullName }
                subtitle={ email }
                style={ style.title }
              >
              </CardTitle>
            <CardText>
                <div id='profileDemographicsPane' style={{position: 'relative'}}>
                  <Row style={ style.synopsis} >
                    <Col md={6}>
                      <TextField
                        id='givenNameInput'
                        ref='given'
                        name='given'
                        type='text'
                        floatingLabelText='given name'
                        value={ givenName }
                        onChange={ this.props.updateGivenName ? this.props.updateGivenName.bind(this) : null }
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
                        onChange={ this.props.updateFamilyName ? this.props.updateFamilyName.bind(this) : null }
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
                        onChange={ this.props.updateBirthdate ? this.props.updateBirthdate.bind(this) : null }
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
                        onChange={ this.props.updateGender ? this.props.updateGender.bind(this) : null }
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
                        onChange={ this.props.updateAvatar ? this.props.updateAvatar.bind(this) : null }
                        fullWidth
                        /><br/>

                    </Col>
                  </Row>
                </div>
            </CardText>
        </GlassCard>
        <DynamicSpacer />

        { this.props.children }
      </div>
    );
  }
  imgError() {
    this.refs.avatarImage.src = Meteor.absoluteUrl() + 'packages/clinical_hl7-resource-patient/assets/noAvatar.png';
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
  overflowY: PropTypes.string
};
export default PatientCard ;