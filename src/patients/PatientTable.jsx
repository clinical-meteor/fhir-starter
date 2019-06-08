import { FlatButton, Toggle } from 'material-ui';

import React from 'react';
import { Table } from 'react-bootstrap';

import { TableNoData } from './TableNoData'
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { FaTags, FaCode, FaPuzzlePiece, FaLock  } from 'react-icons/fa';
import { GoTrashcan } from 'react-icons/go'

let styles = {
  hideOnPhone: {
    visibility: 'visible',
    display: 'table'
  },
  cellHideOnPhone: {
    visibility: 'visible',
    display: 'table',
    paddingTop: '16px',
    maxWidth: '120px'
  },
  cell: {
    paddingTop: '16px'
  },
  avatar: {
    // color: rgb(255, 255, 255);
    backgroundColor: 'rgb(188, 188, 188)',
    userSelect: 'none',
    borderRadius: '2px',
    height: '40px',
    width: '40px'
  }
},


flattenPatient = function(person){
  let result = {
    _id: person._id,
    id: person.id,
    active: true,
    gender: get(person, 'gender'),
    name: '',
    mrn: '',
    birthDate: '',
    photo: "/thumbnail-blank.png",
    initials: 'abc'
  };

  result.active = get(person, 'active', true).toString();

  // there's an off-by-1 error between momment() and Date() that we want
  // to account for when converting back to a string
  result.birthDate = moment(person.birthDate).format("YYYY-MM-DD")
  result.photo = get(person, 'photo[0].url', '');
  result.identifier = get(person, 'identifier[0].value', '');

  result.maritalStatus = get(person, 'maritalStatus.text', '');
  result.deceased = get(person, 'deceasedBoolean', '');
  result.species = get(person, 'animal.species.text', '');
  result.language = get(person, 'communication[0].language.text', '');

  let nameText = get(person, 'name[0].text', '');
  if(nameText.length > 0){
    result.name = get(person, 'name[0].text', '');    
  } else {
    if(get(person, 'name[0].suffix[0]')){
      result.name = get(person, 'name[0].suffix[0]')  + ' ';
    }

    result.name = result.name + get(person, 'name[0].given[0]') + ' ' + get(person, 'name[0].family[0]');
    
    if(get(person, 'name[0].suffix[0]')){
      result.name = result.name + ' ' + get(person, 'name[0].suffix[0]');
    }
  }

  return result;
}

export class PatientTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      patients: []
    }
  }
  imgError(avatarId) {
    this.refs[avatarId].src = Meteor.absoluteUrl() + 'noAvatar.png';
  }
  renderRowAvatarHeader(){
    if (get(Meteor, 'settings.public.defaults.avatars') && (this.props.showAvatars === true)) {
      return (
        <th className='avatar'>photo</th>
      );
    }
  }
  renderRowAvatar(patient, avatarStyle){
    //console.log('renderRowAvatar', patient, avatarStyle)
    
    if (get(Meteor, 'settings.public.defaults.avatars') && (this.props.showAvatars === true)) {
      return (
        <td className='avatar'>
          <img src={patient.photo} ref={patient._id} onError={ this.imgError.bind(this, patient._id) } style={avatarStyle}/>
        </td>
      );
    }
  }
  renderIdentifier(identifier){
    if (!this.props.hideIdentifier) {
      return (
        <td className="identifier hidden-on-phone">{ identifier }</td>
      );
    }
  }
  renderIdentifierHeader(){
    if (!this.props.hideIdentifier) {
      return (
        <th className="identifier hidden-on-phone">identifier</th>
      );
    }
  }

  renderSpeciesHeader(hideSpecies){
    if(hideSpecies){
      return (
        <th className='species'>Species</th>
      );
    }
  }
  renderSpeciesRow(hideSpecies, patient){
    if(hideSpecies){
      return (
        <td className='species' style={styles.cellHideOnPhone}>
          {patient.species}
        </td>
      );
    }

  }
  renderActionButtonHeader(){
    if (this.props.showActionButton === true) {
      return (
        <th className='ActionButton' style={styles.hideOnPhone}></th>
      );
    }
  }
  renderActionButton(patient, avatarStyle){
    if (this.props.showActionButton === true) {
      return (
        <td className='ActionButton' style={styles.hideOnPhone}>
          <FlatButton label="send" onClick={this.onActionButtonClick.bind('this', patientsToRender[i]._id)}/>
        </td>
      );
    }
  }
  onActionButtonClick(id){
    if(typeof this.props.onActionButtonClick === "function"){
      this.props.onActionButtonClick(id);
    }
  }
  cellClick(id){
    if(typeof this.props.onCellClick === "function"){
      this.props.onCellClick(id);
    }
  }
  selectPatientRow(patientId){
    console.log('Selecting a new Patient...');
    // console.log('patientId', patientId, foo, bar)
    if(typeof this.props.onRowClick  === "function"){
      console.log('Apparently we received an onRowClick() as a prop')
      this.props.onRowClick(patientId);
    }
  }
  renderToggleHeader(){
    if (!this.props.hideToggle) {
      return (
        <th className="toggle" style={{width: '60px'}} >Toggle</th>
      );
    }
  }
  renderToggle(){
    if (!this.props.hideToggle) {
      return (
        <td className="toggle" style={{width: '60px'}}>
            <Toggle
              defaultToggled={true}
            />
          </td>
      );
    }
  }
  renderActionIconsHeader(){
    if (!this.props.hideActionIcons) {
      return (
        <th className='actionIcons' style={{minWidth: '120px'}}>Actions</th>
      );
    }
  }
  renderActionIcons(patient ){
    if (!this.props.hideActionIcons) {
      let iconStyle = {
        marginLeft: '4px', 
        marginRight: '4px', 
        marginTop: '4px', 
        fontSize: '120%'
      }

      return (
        <td className='actionIcons' style={{minWidth: '120px'}}>
          <FaTags style={iconStyle} onClick={this.showSecurityDialog.bind(this, patient)} />
          <GoTrashcan style={iconStyle} onClick={this.removeRecord.bind(this, patient._id)} />  
        </td>
      );
    }
  } 

  renderMaritalStatusHeader(){
    if (!this.props.hideMaritalStatus) {
      return (
        <th className="maritalStatus">Marital Status</th>
      );
    }
  }
  renderMaritalStatus(patient){
    if (!this.props.hideMaritalStatus) {
      return (
        <td className='maritalStatus'>{patient.maritalStatus}</td>
      );
    }
  }

  renderLanguageHeader(){
    if (!this.props.hideLanguage) {
      return (
        <th className="language">Language</th>
      );
    }
  }
  renderLanguage(patient){
    if (!this.props.hideLanguage) {
      return (
        <td className='language'>{patient.language}</td>
      );
    }
  }
  renderIsActiveHeader(){
    if (!this.props.hideActive) {
      return (
        <th className="isActive">Active</th>
      );
    }
  }
  renderIsActive(isActive){
    if (!this.props.hideActive) {
      return (
        <td className='isActive'>{isActive}</td>
      );
    }
  }
  removeRecord(_id){
    console.log('Remove patient ', _id)
    Patients._collection.remove({_id: _id})
  }
  showSecurityDialog(patient){
    console.log('showSecurityDialog', patient)

    Session.set('securityDialogResourceJson', Patients.findOne(get(patient, '_id')));
    Session.set('securityDialogResourceType', 'Patient');
    Session.set('securityDialogResourceId', get(patient, '_id'));
    Session.set('securityDialogOpen', true);
  }
  render () {
    let tableRows = [];
    let footer;

    if(this.props.appWidth){
      if (this.props.appWidth < 768) {
        styles.hideOnPhone.visibility = 'hidden';
        styles.hideOnPhone.display = 'none';
        styles.cellHideOnPhone.visibility = 'hidden';
        styles.cellHideOnPhone.display = 'none';
      } else {
        styles.hideOnPhone.visibility = 'visible';
        styles.hideOnPhone.display = 'table-cell';
        styles.cellHideOnPhone.visibility = 'visible';
        styles.cellHideOnPhone.display = 'table-cell';
      }  
    }

    let patientsToRender = [];
    if(this.props.patients){
      if(this.props.patients.length > 0){              
        this.props.patients.forEach(function(patient){
          patientsToRender.push(flattenPatient(patient));
        });  
      }
    }

    if(patientsToRender.length === 0){
      footer = <TableNoData noDataPadding={ this.props.noDataMessagePadding } />
    } else {
      for (var i = 0; i < patientsToRender.length; i++) {

        let rowStyle = {
          cursor: 'pointer'
        }
        if(get(patientsToRender[i], 'modifierExtension[0]')){
          rowStyle.color = "orange";
        }

        tableRows.push(
          <tr key={i} className="patientRow" style={rowStyle} onClick={this.selectPatientRow.bind(this, patientsToRender[i]._id )} >
  
            { this.renderToggle(patientsToRender[i]) }
            { this.renderActionIcons(patientsToRender[i]) }

            { this.renderRowAvatar(patientsToRender[i], styles.avatar) }
            { this.renderIdentifier(patientsToRender[i].identifier)}

            <td className='name' onClick={ this.cellClick.bind(this, patientsToRender[i]._id)} style={styles.cell}>{patientsToRender[i].name }</td>
            <td className='gender' onClick={ this.cellClick.bind(this, patientsToRender[i]._id)} style={styles.cell}>{patientsToRender[i].gender}</td>
            <td className='birthDate' onClick={ this.cellClick.bind(this, patientsToRender[i]._id)} style={{minWidth: '100px', paddingTop: '16px'}}>{patientsToRender[i].birthDate }</td>

            { this.renderMaritalStatus(patientsToRender[i]) }
            { this.renderLanguage(patientsToRender[i]) }

            { this.renderIsActive(this.props.hideActive, patientsToRender[i].active) }
            { this.renderSpeciesRow(this.props.hideSpecies, patientsToRender[i]) }
            { this.renderActionButton(patientsToRender[i], styles.avatar) }
          </tr>
        );
      }
    }
    


    return(
      <div>
        <Table id='patientsTable' hover >
          <thead>
            <tr>
              { this.renderToggleHeader() }
              { this.renderActionIconsHeader() }
              { this.renderRowAvatarHeader() }
              {this.renderIdentifierHeader() }

              {/* <th className='identifier' style={styles.hideOnPhone}>Identifier</th> */}
              <th className='name'>Name</th>
              <th className='gender'>Gender</th>
              <th className='birthdate' style={{minWidth: '100px'}}>Birthdate</th>

              { this.renderMaritalStatusHeader(patientsToRender[i]) }
              { this.renderLanguageHeader(patientsToRender[i]) }

              {/* <th className='maritalStatus' style={styles.hideOnPhone}>Marital Status</th> */}
              {/* <th className='language' style={styles.hideOnPhone}>Language</th> */}
              {/* <th className='isActive' style={styles.hideOnPhone}>Active</th> */}
              
              {this.renderIsActiveHeader() }
              { this.renderSpeciesHeader(this.props.hideSpecies) }
              { this.renderActionButtonHeader() }
            </tr>
          </thead>
          <tbody>
            { tableRows }
          </tbody>
        </Table>
        { footer }
      </div>
    );
  }
}

PatientTable.propTypes = {
  id: PropTypes.string,
  data: PropTypes.array,
  fhirVersion: PropTypes.string,
  showActionButton: PropTypes.bool,
  onRowClick: PropTypes.func,
  hideToggle: PropTypes.bool,
  hideActionIcons: PropTypes.bool,
  hideIdentifier: PropTypes.bool,
  hideActive: PropTypes.bool,
  hideMaritalStatus: PropTypes.bool,
  hideLanguage: PropTypes.bool,
  hideSpecies: PropTypes.bool,
  appWidth: PropTypes.number,
  noDataMessagePadding: PropTypes.number,
  paginationLimit: PropTypes.number,
  onCellClick: PropTypes.func,
  onRowClick: PropTypes.func,
  onActionButtonClick: PropTypes.func,
  actionButtonLabel: PropTypes.string
};

export default PatientTable;