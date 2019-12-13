import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  IconButton,
  FirstPageIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPageIcon
} from '@material-ui/core';

// import { FaTags, FaCode, FaPuzzlePiece, FaLock  } from 'react-icons/fa';
import { GoTrashcan } from 'react-icons/go';
import TableNoData from '../components/TableNoData';


import { useTheme } from '@material-ui/styles';


// import moment from 'moment-es6'
import _ from 'lodash';
let get = _.get;
let set = _.set;


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
    backgroundColor: 'rgb(188, 188, 188)',
    userSelect: 'none',
    borderRadius: '2px',
    height: '40px',
    width: '40px'
  }
};


import { makeStyles } from '@material-ui/styles';
const useStyles = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
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

function TablePaginationActions(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}



TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, calories, fat) {
  return { name, calories, fat };
}

// const rows = [
//   createData('Cupcake', 305, 3.7),
//   createData('Donut', 452, 25.0),
//   createData('Eclair', 262, 16.0),
//   createData('Frozen yoghurt', 159, 6.0),
//   createData('Gingerbread', 356, 16.0),
//   createData('Honeycomb', 408, 3.2),
//   createData('Ice cream sandwich', 237, 9.0),
//   createData('Jelly Bean', 375, 0.0),
//   createData('KitKat', 518, 26.0),
//   createData('Lollipop', 392, 0.2),
//   createData('Marshmallow', 318, 0),
//   createData('Nougat', 360, 19.0),
//   createData('Oreo', 437, 18.0),
// ].sort((a, b) => (a.calories < b.calories ? -1 : 1));

const rows = [];

const useStyles2 = makeStyles({
  root: {
    width: '100%',
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});




function PatientTable(props){
  console.log('PatientTable', props)

  let tableRows = [];
  let footer;
  let rowsPerPageToRender = 5;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  if(props.rowsPerPage){
    // if we receive an override as a prop, render that many rows
    // best to use rowsPerPage with disablePagination
    rowsPerPageToRender = props.rowsPerPage;
  } else {
    // otherwise default to the user selection
    rowsPerPageToRender = rowsPerPage;
  }

  let paginationCount = 101;
  if(props.count){
    paginationCount = props.count;
  } else {
    paginationCount = rows.length;
  }


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
          <FlatButton label="send" onClick={ onActionButtonClick.bind('this', patientsToRender[i]._id)}/>
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
  function removeRecord(_id){
    console.log('Remove patient ', _id)
    if(props.onRemoveRecord){
      props.onRemoveRecord();
    }
    // Patients._collection.remove({_id: _id})
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
          {/* <FaTags style={iconStyle} onClick={ onMetaClick.bind(this, patient)} /> */}
          <GoTrashcan style={iconStyle} onClick={ removeRecord.bind(this, patient._id)} />  
        </TableCell>
      );
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
      let count = 0;  
      props.patients.forEach(function(patient){
        if((count >= (page * rowsPerPageToRender)) && (count < (page + 1) * rowsPerPageToRender)){
          patientsToRender.push(flattenPatient(patient));
        }
        count++;
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




  let paginationFooter;
  if(!props.disablePagination){
    paginationFooter = <TablePagination
      component="div"
      rowsPerPageOptions={[5, 10, 25, 100]}
      colSpan={3}
      count={paginationCount}
      rowsPerPage={rowsPerPageToRender}
      page={page}
      // SelectProps={{
      //   inputProps: { 'aria-label': 'rows per page' },
      //   native: true
      // }}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      // ActionsComponent={TablePaginationActions}
      style={{float: 'right', border: 'none'}}
    />
  }



  return(
    <div>
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
      { paginationFooter }
    </div>
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
  rowsPerPage: PropTypes.number,
  onCellClick: PropTypes.func,
  onRowClick: PropTypes.func,
  onMetaClick: PropTypes.func, 
  onActionButtonClick: PropTypes.func,
  actionButtonLabel: PropTypes.string,
  defaultAvatar: PropTypes.string,
  disablePagination: PropTypes.bool,
  paginationCount: PropTypes.number
};

export default PatientTable;









// export class PatientTable extends React.Component {
//   constructor(props) {
//     super(props);
//      state = {
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
//           <FlatButton label="send" onClick={ onActionButtonClick.bind('this', patientsToRender[i]._id)}/>
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
//           <FaTags style={iconStyle} onClick={ onMetaClick.bind(this, patient)} />
//           <GoTrashcan style={iconStyle} onClick={ removeRecord.bind(this, patient._id)} />  
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
//           <tr key={i} className="patientRow" style={rowStyle} onClick={ selectPatientRow.bind(this, patientsToRender[i]._id )} >
  
//             {/* { renderCheckbox(patientsToRender[i]) } */}
//             { renderActionIcons(patientsToRender[i]) }

//             { renderRowAvatar(patientsToRender[i], styles.avatar) }
//             { renderIdentifier(patientsToRender[i].identifier)}

//             <TableCell className='name' onClick={ cellClick.bind(this, patientsToRender[i]._id)} >{patientsToRender[i].name }</TableCell>
//             <TableCell className='gender' onClick={ cellClick.bind(this, patientsToRender[i]._id)} >{patientsToRender[i].gender}</TableCell>
//             <TableCell className='birthDate' onClick={ cellClick.bind(this, patientsToRender[i]._id)} style={{minWidth: '100px', paddingTop: '16px'}}>{patientsToRender[i].birthDate }</TableCell>

//             { renderMaritalStatus(patientsToRender[i]) }
//             { renderLanguage(patientsToRender[i]) }

//             { renderIsActive(patientsToRender[i].active) }
//             {/* { renderSpecies(patientsToRender[i]) } */}
//             { renderActionButton(patientsToRender[i], styles.avatar) }
//           </tr>
//         );
//       }
//     }
    


//     return(
//       <div>
//         <Table id='patientsTable' hover >
//           <TableHeadead>
//             <tr>
//               {/* {  renderCheckboxHeader() } */}
//               {  renderActionIconsHeader() }
//               {  renderRowAvatarHeader() }
//               { renderIdentifierHeader() }

//               <TableHead className='name'>Name</TableHead>
//               <TableHead className='gender'>Gender</TableHead>
//               <TableHead className='birthdate' style={{minWidth: '100px'}}>Birthdate</TableHead>

//               {  renderMaritalStatusHeader(patientsToRender[i]) }
//               {  renderLanguageHeader(patientsToRender[i]) }              
//               {  renderIsActiveHeader() }
//               {/* {  renderSpeciesHeader(props.hideSpecies) } */}
//               {  renderActionButtonHeader() }
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