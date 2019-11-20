import React from 'react';
import PropTypes from 'prop-types';

import { 
  CssBaseline,
  Grid, 
  Container,
  Divider,
  Card,
  CardHeader,
  CardContent,
  Tab, 
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';

import TableNoData from '../components/TableNoData'

import { makeStyles } from '@material-ui/styles';
const useStyles = makeStyles(theme => ({
  button: {
    background: theme.background,
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: theme.buttonText,
    height: 48,
    padding: '0 30px',
  }
}));

import _ from 'lodash';
let get = _.get;
let set = _.set;

// import moment from 'moment-es6'

// import { FaTags, FaCode, FaPuzzlePiece, FaLock  } from 'react-icons/fa';
// import { GoTrashcan } from 'react-icons/go'

// let styles = {
//   hideOnPhone: {
//     visibility: 'visible',
//     display: 'table'
//   },
//   cellHideOnPhone: {
//     visibility: 'visible',
//     display: 'table',
//     paddingTop: '16px',
//     maxWidth: '120px'
//   },
//   cell: {
//     paddingTop: '16px'
//   },
//   avatar: {
//     // color: rgb(255, 255, 255);
//     backgroundColor: 'rgb(188, 188, 188)',
//     userSelect: 'none',
//     borderRadius: '2px',
//     height: '40px',
//     width: '40px'
//   }
// },




// export class PatientTable extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selected: [],
//       patients: []
//     }
//   }
//   renderRowAvatarHeader(){
//     if (get(this, 'props.defaultAvatar') && (props.showAvatars === true)) {
//       return (
//         <TableHead className='avatar'>photo</TableHead>
//       );
//     }
//   }
//   renderRowAvatar(patient, avatarStyle){
//     //console.log('renderRowAvatar', patient, avatarStyle)
    
//     if (get(this, 'props.defaultAvatar') && (props.showAvatars === true)) {
//       return (
//         <TableCell className='avatar'>
//           <img 
//             src={patient.photo} 
//             onError={(e)=>{e.target.onerror = null; e.target.src = get(this, 'props.defaultAvatar')}}
//             style={avatarStyle}
//           />
//         </TableCell>
//       );
//     }
//   }
//   renderIdentifier(identifier){
//     if (!props.hideIdentifier) {
//       return (
//         <TableCell className="identifier hidden-on-phone">{ identifier }</TableCell>
//       );
//     }
//   }
//   renderIdentifierHeader(){
//     if (!props.hideIdentifier) {
//       return (
//         <TableHead className="identifier hidden-on-phone">identifier</TableHead>
//       );
//     }
//   }

//   renderSpeciesHeader(){
//     if(!props.hideSpecies || (props.fhirVersion === "R4")){
//       return (
//         <TableHead className='species'>Species</TableHead>
//       );
//     }
//   }
//   renderSpecies(patient){
//     if(!props.hideSpecies || (props.fhirVersion === "R4")){
//       return (
//         <TableCell className='species' style={styles.cellHideOnPhone}>
//           {patient.species}
//         </TableCell>
//       );
//     }

//   }
//   renderActionButtonHeader(){
//     if (props.showActionButton === true) {
//       return (
//         <TableHead className='ActionButton' style={styles.hideOnPhone}></TableHead>
//       );
//     }
//   }
//   renderActionButton(patient, avatarStyle){
//     if (props.showActionButton === true) {
//       return (
//         <TableCell className='ActionButton' style={styles.hideOnPhone}>
//           <FlatButton label="send" onClick={this.onActionButtonClick.bind('this', patientsToRender[i]._id)}/>
//         </TableCell>
//       );
//     }
//   }
//   onActionButtonClick(id){
//     if(typeof props.onActionButtonClick === "function"){
//       props.onActionButtonClick(id);
//     }
//   }
//   cellClick(id){
//     if(typeof props.onCellClick === "function"){
//       props.onCellClick(id);
//     }
//   }
//   selectPatientRow(patientId){
//     console.log('Selecting a new Patient...');
//     // console.log('patientId', patientId, foo, bar)
//     if(typeof props.onRowClick  === "function"){
//       // console.log('Apparently we received an onRowClick() as a prop')
//       props.onRowClick(patientId);
//     }
//   }
//   // renderCheckboxHeader(){
//   //   if (!props.hideCheckbox) {
//   //     return (
//   //       <TableHead className="checkbox" style={{width: '60px'}} >Checkbox</TableHead>
//   //     );
//   //   }
//   // }
//   // renderCheckbox(){
//   //   if (!props.hideCheckbox) {
//   //     return (
//   //       <TableCell className="checkbox" style={{width: '60px'}}>
//   //           <Checkbox
//   //             defaultChecked={true}
//   //           />
//   //         </TableCell>
//   //     );
//   //   }
//   // }
//   renderActionIconsHeader(){
//     if (!props.hideActionIcons) {
//       return (
//         <TableHead className='actionIcons' style={{minWidth: '120px'}}>Actions</TableHead>
//       );
//     }
//   }
//   renderActionIcons(patient ){
//     if (!props.hideActionIcons) {
//       let iconStyle = {
//         marginLeft: '4px', 
//         marginRight: '4px', 
//         marginTop: '4px', 
//         fontSize: '120%'
//       }

//       return (
//         <TableCell className='actionIcons' style={{minWidth: '120px'}}>
//           <FaTags style={iconStyle} onClick={this.onMetaClick.bind(this, patient)} />
//           <GoTrashcan style={iconStyle} onClick={this.removeRecord.bind(this, patient._id)} />  
//         </TableCell>
//       );
//     }
//   } 

//   onMetaClick(patient){
//     let self = this;
//     if(props.onMetaClick){
//       props.onMetaClick(self, patient);
//     }
//   }
//   renderMaritalStatusHeader(){
//     if (!props.hideMaritalStatus) {
//       return (
//         <TableHead className="maritalStatus">Marital Status</TableHead>
//       );
//     }
//   }
//   renderMaritalStatus(patient){
//     if (!props.hideMaritalStatus) {
//       return (
//         <TableCell className='maritalStatus'>{patient.maritalStatus}</TableCell>
//       );
//     }
//   }

//   renderLanguageHeader(){
//     if (!props.hideLanguage) {
//       return (
//         <TableHead className="language">Language</TableHead>
//       );
//     }
//   }
//   renderLanguage(patient){
//     if (!props.hideLanguage) {
//       return (
//         <TableCell className='language'>{patient.language}</TableCell>
//       );
//     }
//   }
//   renderIsActiveHeader(){
//     if (!props.hideActive) {
//       return (
//         <TableHead className="isActive">Active</TableHead>
//       );
//     }
//   }
//   renderIsActive(isActive){
//     if (!props.hideActive) {
//       return (
//         <TableCell className='isActive'>{isActive}</TableCell>
//       );
//     }
//   }
//   removeRecord(_id){
//     console.log('Remove patient ', _id)
//     Patients._collection.remove({_id: _id})
//   }

//   render () {
//     let tableRows = [];
//     let footer;

//     if(props.appWidth){
//       if (props.appWidth < 768) {
//         styles.hideOnPhone.visibility = 'hidden';
//         styles.hideOnPhone.display = 'none';
//         styles.cellHideOnPhone.visibility = 'hidden';
//         styles.cellHideOnPhone.display = 'none';
//       } else {
//         styles.hideOnPhone.visibility = 'visible';
//         styles.hideOnPhone.display = 'table-cell';
//         styles.cellHideOnPhone.visibility = 'visible';
//         styles.cellHideOnPhone.display = 'table-cell';
//       }  
//     }

//     let patientsToRender = [];
//     if(props.patients){
//       if(props.patients.length > 0){              
//         props.patients.forEach(function(patient){
//           patientsToRender.push(flattenPatient(patient));
//         });  
//       }
//     }

//     if(patientsToRender.length === 0){
//       // footer = <TableNoData noDataPadding={ props.noDataMessagePadding } />
//     } else {
//       for (var i = 0; i < patientsToRender.length; i++) {

//         let rowStyle = {
//           cursor: 'pointer'
//         }
//         if(get(patientsToRender[i], 'modifierExtension[0]')){
//           rowStyle.color = "orange";
//         }

//         tableRows.push(
//           <tr key={i} className="patientRow" style={rowStyle} onClick={this.selectPatientRow.bind(this, patientsToRender[i]._id )} >
  
//             {/* { this.renderCheckbox(patientsToRender[i]) } */}
//             { this.renderActionIcons(patientsToRender[i]) }

//             { this.renderRowAvatar(patientsToRender[i], styles.avatar) }
//             { this.renderIdentifier(patientsToRender[i].identifier)}

//             <TableCell className='name' onClick={ this.cellClick.bind(this, patientsToRender[i]._id)} >{patientsToRender[i].name }</TableCell>
//             <TableCell className='gender' onClick={ this.cellClick.bind(this, patientsToRender[i]._id)} >{patientsToRender[i].gender}</TableCell>
//             <TableCell className='birthDate' onClick={ this.cellClick.bind(this, patientsToRender[i]._id)} style={{minWidth: '100px', paddingTop: '16px'}}>{patientsToRender[i].birthDate }</TableCell>

//             { this.renderMaritalStatus(patientsToRender[i]) }
//             { this.renderLanguage(patientsToRender[i]) }

//             { this.renderIsActive(patientsToRender[i].active) }
//             {/* { this.renderSpecies(patientsToRender[i]) } */}
//             { this.renderActionButton(patientsToRender[i], styles.avatar) }
//           </tr>
//         );
//       }
//     }
    


//     return(
//       <div>
//         <Table id='patientsTable' hover >
//           <TableHeadead>
//             <tr>
//               {/* { this.renderCheckboxHeader() } */}
//               { this.renderActionIconsHeader() }
//               { this.renderRowAvatarHeader() }
//               {this.renderIdentifierHeader() }

//               <TableHead className='name'>Name</TableHead>
//               <TableHead className='gender'>Gender</TableHead>
//               <TableHead className='birthdate' style={{minWidth: '100px'}}>Birthdate</TableHead>

//               { this.renderMaritalStatusHeader(patientsToRender[i]) }
//               { this.renderLanguageHeader(patientsToRender[i]) }              
//               { this.renderIsActiveHeader() }
//               {/* { this.renderSpeciesHeader(props.hideSpecies) } */}
//               { this.renderActionButtonHeader() }
//             </tr>
//           </thead>
//           <tbody>
//             { tableRows }
//           </tbody>
//         </Table>
//         { footer }
//       </div>
//     );
//   }
// }



function PatientTable(props){
  console.log('PatientTable', props)

  let tableRows = [];
  let footer;


  //================================================================
  // Data Methods
  
  function flattenPatient(person){
    let result = {
      _id: person._id,
      id: person._id,
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
    result.gender = get(person, 'gender', '');

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

    console.log('flattened', result)
    return result;
  }

  //================================================================
  // Render Methods


  function renderRowAvatarHeader(){
    if (get(this, 'props.defaultAvatar') && (props.showAvatars === true)) {
      return (
        <TableCell className='avatar'>photo</TableCell>
      );
    }
  }
  function renderRowAvatar(patient, avatarStyle){
    //console.log('renderRowAvatar', patient, avatarStyle)
    
    if (get(this, 'props.defaultAvatar') && (props.showAvatars === true)) {
      return (
        <TableCell className='avatar'>
          <img 
            src={patient.photo} 
            onError={(e)=>{e.target.onerror = null; e.target.src = get(this, 'props.defaultAvatar')}}
            style={avatarStyle}
          />
        </TableCell>
      );
    }
  }
  function renderIdentifier(identifier){
    if (!props.hideIdentifier) {
      return (
        <TableCell className="identifier hidden-on-phone">{ identifier }</TableCell>
      );
    }
  }
  function renderIdentifierHeader(){
    if (!props.hideIdentifier) {
      return (
        <TableCell className="identifier hidden-on-phone">identifier</TableCell>
      );
    }
  }

  function renderSpeciesHeader(){
    if(!props.hideSpecies || (props.fhirVersion === "R4")){
      return (
        <TableCell className='species'>Species</TableCell>
      );
    }
  }
  function renderSpecies(patient){
    if(!props.hideSpecies || (props.fhirVersion === "R4")){
      return (
        <TableCell className='species' style={styles.cellHideOnPhone}>
          {patient.species}
        </TableCell>
      );
    }

  }
  function renderActionButtonHeader(){
    if (props.showActionButton === true) {
      return (
        <TableCell className='ActionButton' style={styles.hideOnPhone}></TableCell>
      );
    }
  }
  function renderActionButton(patient, avatarStyle){
    if (props.showActionButton === true) {
      return (
        <TableCell className='ActionButton' style={styles.hideOnPhone}>
          <FlatButton label="send" onClick={this.onActionButtonClick.bind('this', patientsToRender[i]._id)}/>
        </TableCell>
      );
    }
  }
  function onActionButtonClick(id){
    if(typeof props.onActionButtonClick === "function"){
      props.onActionButtonClick(id);
    }
  }
  function cellClick(id){
    if(typeof props.onCellClick === "function"){
      props.onCellClick(id);
    }
  }
  function selectPatientRow(patientId){
    console.log('Selecting a new Patient...');
    if(typeof props.onRowClick  === "function"){
      props.onRowClick(patientId);
    }
  }
  function renderActionIconsHeader(){
    if (!props.hideActionIcons) {
      return (
        <TableCell className='actionIcons' style={{minWidth: '120px'}}>Actions</TableCell>
      );
    }
  }
  function renderActionIcons(patient ){
    if (!props.hideActionIcons) {
      let iconStyle = {
        marginLeft: '4px', 
        marginRight: '4px', 
        marginTop: '4px', 
        fontSize: '120%'
      }

      return (
        <TableCell className='actionIcons' style={{minWidth: '120px'}}>
          <FaTags style={iconStyle} onClick={this.onMetaClick.bind(this, patient)} />
          <GoTrashcan style={iconStyle} onClick={this.removeRecord.bind(this, patient._id)} />  
        </TableCell>
      );
    }
  } 

  function onMetaClick(patient){
    let self = this;
    if(props.onMetaClick){
      props.onMetaClick(self, patient);
    }
  }
  function renderMaritalStatusHeader(){
    if (!props.hideMaritalStatus) {
      return (
        <TableCell className="maritalStatus">Marital Status</TableCell>
      );
    }
  }
  function renderMaritalStatus(patient){
    if (!props.hideMaritalStatus) {
      return (
        <TableCell className='maritalStatus'>{patient.maritalStatus}</TableCell>
      );
    }
  }

  function renderLanguageHeader(){
    if (!props.hideLanguage) {
      return (
        <TableCell className="language">Language</TableCell>
      );
    }
  }
  function renderLanguage(patient){
    if (!props.hideLanguage) {
      return (
        <TableCell className='language'>{patient.language}</TableCell>
      );
    }
  }
  function renderIsActiveHeader(){
    if (!props.hideActive) {
      return (
        <TableCell className="isActive">Active</TableCell>
      );
    }
  }
  function renderIsActive(isActive){
    if (!props.hideActive) {
      return (
        <TableCell className='isActive'>{isActive}</TableCell>
      );
    }
  }


  //================================================================
  // Table
  const classes = useStyles();


  let patientsToRender = [];
  if(props.patients){
    if(props.patients.length > 0){              
      props.patients.forEach(function(patient){
        patientsToRender.push(flattenPatient(patient));
      });  
    }
  }

  if(patientsToRender.length === 0){
    footer = <TableNoData noDataPadding={ props.noDataMessagePadding } />
  } else {
    for (var i = 0; i < patientsToRender.length; i++) {

      let rowStyle = {
        cursor: 'pointer'
      }
      if(get(patientsToRender[i], 'modifierExtension[0]')){
        rowStyle.color = "orange";
      }

      tableRows.push(
        <TableRow key={i} className="patientRow" style={rowStyle} onClick={ selectPatientRow.bind(this, patientsToRender[i]._id )} >
          { renderActionIcons(patientsToRender[i]) }
          { renderRowAvatar(patientsToRender[i], styles.avatar) }
          { renderIdentifier(patientsToRender[i].identifier)}

          <TableCell className='name' onClick={ cellClick.bind(this, patientsToRender[i]._id)} >{patientsToRender[i].name }</TableCell>
          <TableCell className='gender' onClick={ cellClick.bind(this, patientsToRender[i]._id)} >{patientsToRender[i].gender}</TableCell>
          <TableCell className='birthDate' onClick={ cellClick.bind(this, patientsToRender[i]._id)} style={{minWidth: '100px', paddingTop: '16px'}}>{patientsToRender[i].birthDate }</TableCell>

          { renderMaritalStatus(patientsToRender[i]) }
          { renderLanguage(patientsToRender[i]) }
          { renderIsActive(patientsToRender[i].active) }
          { renderActionButton(patientsToRender[i], styles.avatar) }
        </TableRow>
      );
    }
  }


  return(
    <Table size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          { renderActionIconsHeader() }
          { renderRowAvatarHeader() }
          { renderIdentifierHeader() }

          <TableCell className='name'>Name</TableCell>
          <TableCell className='gender'>Gender</TableCell>
          <TableCell className='birthdate' style={{minWidth: '100px'}}>Birthdate</TableCell>

          { renderMaritalStatusHeader(patientsToRender[i]) }
          { renderLanguageHeader(patientsToRender[i]) }              
          { renderIsActiveHeader() }
          { renderActionButtonHeader() }

        </TableRow>
      </TableHead>
      <TableBody>
        { tableRows }
      </TableBody>
    </Table>
  );
}


PatientTable.propTypes = {
  id: PropTypes.string,
  patients: PropTypes.array,
  fhirVersion: PropTypes.string,
  showActionButton: PropTypes.bool,
  onRowClick: PropTypes.func,
  hideCheckbox: PropTypes.bool,
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
  onMetaClick: PropTypes.func,
  onActionButtonClick: PropTypes.func,
  actionButtonLabel: PropTypes.string,
  defaultAvatar: PropTypes.string
};

export default PatientTable;