import React from 'react';
import PropTypes from 'prop-types';

import { 
  Card,
  CardHeader,
  CardContent,
  Grid,
  TextField
} from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

import _ from 'lodash';
let get = _.get;
let set = _.set;

// we need to enumerate components from Material 1.5.1+ explicitly (absolute path);
// tedious, but it works.  see:
// https://github.com/mui-org/material-ui/issues/10212

// import Button from '@material-ui/core/Button';

// const ActionButton = styled(Button)({
//   background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//   border: 0,
//   borderRadius: 3,
//   boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//   color: 'white',
//   height: 48,
//   padding: '0 30px',
// });

// we can clean this up when lodash exports { get, set }
// import { get, set } from 'lodash';

// import _ from 'lodash';
// let get = _.get;
// let set = _.set;

// import moment from 'moment-es6'



//  export class PatientDetail extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       patientId: false,
//       patient: {
//         resourceType : 'Patient',
//         name : [{
//           text : '',
//           prefix: [''],
//           family: [''],
//           given: [''],
//           suffix: [''],
//           resourceType : 'HumanName'
//         }],
//         active : true,
//         gender : "",
//         birthDate : '',
//         photo : [{
//           url: ""
//         }],
//         identifier: [{
//           use: 'usual',
//           type: {
//             coding: [
//               {
//                 system: 'http://hl7.org/fhir/v2/0203',
//                 code: 'MR'
//               }
//             ]
//           },
//           value: ''
//         }],
//         deceasedBoolean: false,
//         multipleBirthBoolean: false,
//         maritalStatus: {
//           text: ''
//         },
//         telecom: [{
//           use: "phone"
//         }],
//         contact: [],
//         animal: {
//           species: {
//             text: 'Human'
//           }
//         },
//         communication: [{
//           language: {
//             text: 'English'
//           }
//         }],
//         careProvider: [{
//           display: '',
//           reference: ''
//         }],
//         managingOrganization: {
//           reference: '',
//           display: ''
//         }
//       },
//       form: {
//         prefix: '',
//         family: '',
//         given: '',
//         suffix: '',
//         identifier: '',
//         deceased: false,
//         multipleBirth: false,
//         maritalStatus: '',
//         species: '',
//         language: ''
//       }
//     }
//   }
//   dehydrateFhirResource(patient) {
//     let formData = Object.assign({}, this.state.form);

//     formData.prefix = get(patient, 'name[0].prefix[0]')
//     formData.family = get(patient, 'name[0].family[0]')
//     formData.given = get(patient, 'name[0].given[0]')
//     formData.suffix = get(patient, 'name[0].suffix[0]')
//     formData.identifier = get(patient, 'identifier[0].value')
//     formData.deceased = get(patient, 'deceasedBoolean')
//     formData.gender = get(patient, 'gender')
//     formData.multipleBirth = get(patient, 'multipleBirthBoolean')
//     formData.maritalStatus = get(patient, 'maritalStatus.text')
//     formData.species = get(patient, 'animal.species.text')
//     formData.language = get(patient, 'communication[0].language.text')
//     formData.birthDate = moment(patient.birthDate).format("YYYY-MM-DD")
//     formData.smartphone = get(patient, 'telecom[0].value')

//     return formData;
//   }
//   shouldComponentUpdate(nextProps){
//     process.env.NODE_ENV === "test" && console.log('PatientDetail.shouldComponentUpdate()', nextProps, this.state)
//     let shouldUpdate = true;

//     // both false; don't take any more updates
//     if(nextProps.patient === this.state.patient){
//       shouldUpdate = false;
//     }

//     // received an patient from the table; okay lets update again
//     if(nextProps.patientId !== this.state.patientId){
//       this.setState({patientId: nextProps.patientId})
      
//       if(nextProps.patient){
//         this.setState({patient: nextProps.patient})     
//         this.setState({form: this.dehydrateFhirResource(nextProps.patient)})       
//       }
//       shouldUpdate = true;
//     }
 
//     return shouldUpdate;
//   }
//   render() {
//     // if(process.env.NODE_ENV === "test") console.log('PatientDetail.render()', this.state)
//     let formData = this.state.form;

//     let formButtons;
//     if (get(this, 'state.patientId')) {
//       formButtons = <div>
//           <Button 
//             id='updatePatientButton' 
//             className='updatePatientButton' 
//             onClick={this.handleSaveButton.bind(this)} 
//             variant="contained" 
//             color="primary" 
//             style={{marginRight: '20px'}}>Save</Button>
//           <Button 
//             id='deletePatientButton' 
//             className='deletePatientButton'
//             variant="contained" 
//             onClick={this.handleDeleteButton.bind(this)}>
//             Delete
//           </Button>
//         </div>
//     } else {
//       formButtons = <Button 
//         id='savePatientButton'  
//         className='savePatientButton'
//         variant="contained" 
//         color="primary" 
//         onClick={this.handleSaveButton.bind(this)}
//         style={{backgroundColor: '#2196f3'}}
//         >Save</Button>
//     }


//     return (
//       <div id={this.props.id} className="patientDetail">
//         <CardText>
//         </CardText>
//         <CardActions>
//           { formButtons }
//         </CardActions>
//       </div>
//     );
//   }
//   renderDatePicker(displayDatePicker, birthDate){
//     if (displayDatePicker) {
//       console.log('renderDatePicker', displayDatePicker, birthDate, typeof birthDate)

//       let javascriptDate;
//       let momentDate;

//       if(typeof birthDate === "string"){
//         momentDate = moment(birthDate).toDate();
//       } else {
//         momentDate = birthDate;
//       }
    
//       console.log('javascriptDate', javascriptDate)
//       console.log('momentDate', momentDate)

//       return (
//         <DatePicker 
//           name='birthDate'
//           hintText="Birthdate" 
//           container="inline" 
//           mode="landscape"
//           value={ momentDate ? momentDate : null}    
//           onChange={ this.changeState.bind(this, 'birthDate')}      
//           floatingLabelFixed={true}
//           fullWidth
//         />
//       );
//     }
//   }


//   updateFormData(formData, field, textValue){
//     if(process.env.NODE_ENV === "test") console.log("PatientDetail.updateFormData", formData, field, textValue);

//     switch (field) {
//       case "prefix":
//         set(formData, 'prefix', textValue)
//         break;
//       case "family":
//         set(formData, 'family', textValue)
//         break;
//       case "given":
//         set(formData, 'given', textValue)
//         break;        
//       case "suffix":
//         set(formData, 'suffix', textValue)
//         break;
//       case "identifier":
//         set(formData, 'identifier', textValue)
//         break;
//       case "gender":
//         set(formData, 'gender', textValue)
//         break;
//       case "maritalStatus":
//         set(formData, 'maritalStatus', textValue)
//         break;
//       case "deceased":
//         set(formData, 'deceased', textValue)
//         break;
//       case "multipleBirth":
//         set(formData, 'multipleBirth', textValue)
//         break;
//       case "species":
//         set(formData, 'species', textValue)
//         break;
//       case "language":
//         set(formData, 'language', textValue)
//         break;
//       case "photo":
//         set(formData, 'photo', textValue)
//         break;
//       case "birthDate":
//         set(formData, 'birthDate', textValue)
//         break;
//       case "smartphone":
//         set(formData, 'smartphone', textValue)
//         break;
//       default:
//     }

//     if(process.env.NODE_ENV === "test") console.log("formData", formData);
//     return formData;
//   }
//   updatePatient(patientData, field, textValue){
//     if(process.env.NODE_ENV === "test") console.log("PatientDetail.updatePatient", patientData, field, textValue);

//     switch (field) {
//       case "prefix":
//         set(patientData, 'name[0].prefix[0]', textValue)
//         break;
//       case "family":
//         set(patientData, 'name[0].family[0]', textValue)
//         break;
//       case "given":
//         set(patientData, 'name[0].given[0]', textValue)
//         break;        
//       case "suffix":
//         set(patientData, 'name[0].suffix[0]', textValue)
//         break;
//       case "identifier":
//         set(patientData, 'identifier[0].value', textValue)
//         break;
//       case "deceased":
//         set(patientData, 'deceasedBoolean', textValue)
//         break;
//       case "multipleBirth":
//         set(patientData, 'multipleBirthBoolean', textValue)
//         break;
//       case "gender":
//         set(patientData, 'gender', textValue)
//         break;
//       case "maritalStatus":
//         set(patientData, 'maritalStatus.text', textValue)
//         break;
//       case "species":
//         set(patientData, 'animal.species.text', textValue)
//         break;
//       case "language":
//         set(patientData, 'communication[0].language.text', textValue)
//         break;  
//       case "photo":
//         set(patientData, 'photo[0].url', textValue)
//         break;
//       case "smartphone":
//         set(patientData, 'telecom[0].value', textValue)
//         break;
//       case "birthDate":
//         set(patientData, 'birthDate', textValue)
//         break;
//     }
//     return patientData;
//   }
//   changeState(field, event, textValue){
//     if(process.env.NODE_ENV === "test") console.log("   ");
//     if(process.env.NODE_ENV === "test") console.log("PatientDetail.changeState", field, textValue);
//     if(process.env.NODE_ENV === "test") console.log("this.state", this.state);

//     let formData = Object.assign({}, this.state.form);
//     let patientData = Object.assign({}, this.state.patient);

//     formData = this.updateFormData(formData, field, textValue);
//     patientData = this.updatePatient(patientData, field, textValue);

//     if(process.env.NODE_ENV === "test") console.log("patientData", patientData);
//     if(process.env.NODE_ENV === "test") console.log("formData", formData);

//     this.setState({patient: patientData})
//     this.setState({form: formData})
//   }




function PatientDetail(props){

  let classes = useStyles();

  // // this could be a mixin
  // function handleSaveButton(){
  //   //console.log('handleSaveButton')
  //   if(props.onUpsert){
  //     props.onUpsert(self);
  //   }
  // }

  // function handleCancelButton(){
  //   if(props.onCancel){
  //     props.onCancel(self);
  //   }
  // }

  // function handleDeleteButton(){
  //   if(props.onDelete){
  //     props.onDelete(self);
  //   }
  // }

  return(
    <div className='PatientDetail'>
      <Card>
        <CardHeader title="Jane Doe" />
        <CardContent>
          <Grid container spacing={3}>

            <Grid item xs={9}>
              <TextField
                id='mrnInput'                
                name='identifier'
                label='Identifier (Medical Record Number)'
                margin='normal'
                fullWidth
                // value={ get(formData, 'identifier', '')}
                // onChange={ this.changeState.bind(this, 'identifier')}
                /><br/>
            </Grid>
            <Grid item xs={3}>
              {/* <Checkbox
                label="Deceased"
                labelPosition="right"
                defaultChecked={false}
                style={styles.toggle}
              /> */}
            </Grid>

            <Grid item xs={1}>
              <TextField
                id='prefixInput'                
                name='prefix'
                label='Prefix'
                margin='normal'
                fullWidth
                //value={ get(formData, 'prefix', '')}
                //onChange={ this.changeState.bind(this, 'prefix')}
                /><br/>
            </Grid>
            <Grid item xs={5}>
              <TextField
                id='givenInput'                
                name='given'
                label='Given Name'
                placeholder='Jane'
                margin='normal'
                fullWidth
                // value={ get(formData, 'given', '')}
                // onChange={ this.changeState.bind(this, 'given')}
                // floatingLabelFixed={true}
                // fullWidth
                /><br/>
            </Grid>
            <Grid item xs={3}>
              <TextField
                id='familyInput'                
                name='family'
                label='Family Name'
                placeholder='Doe'
                margin='normal'
                fullWidth
                // value={ get(formData, 'family', '')}
                // onChange={ this.changeState.bind(this, 'family')}
                // floatingLabelFixed={true}
                // fullWidth
                /><br/>
            </Grid>
            <Grid item xs={3}>
              <TextField
                id='suffixInput'                
                name='suffix'
                label='Suffix / Maiden'
                placeholder=''
                margin='normal'
                // value={ get(formData, 'suffix', '')}
                // onChange={ this.changeState.bind(this, 'suffix')}
                // floatingLabelFixed={true}
                // fullWidth
                /><br/>
            </Grid>



            <Grid item xs={3}>
              <TextField
                id='maritalStatusInput'                
                name='maritalStatus'
                label='Marital Status'
                placeholder='single | maried | other'
                // value={ get(formData, 'maritalStatus', '')}
                // onChange={ this.changeState.bind(this, 'maritalStatus')}
                // floatingLabelFixed={false}
                // floatingLabelFixed={true}
                // fullWidth
                /><br/>
            </Grid>
            <Grid item xs={3}>
              <TextField
                id='genderInput'                
                name='gender'
                label='Gender'
                placeholder='male | female | unknown'
                // value={ get(formData, 'gender', '')}
                // onChange={ this.changeState.bind(this, 'gender')}
                // floatingLabelFixed={true}
                // fullWidth
                /><br/>
            </Grid>
            <Grid item xs={3}>
              <TextField
                id='birthDateInput'                
                name='birthDate'
                type='date'
                // label='Birthdate'
                // placeholder='YYYY-MM-DD'
                // value={ get(formData, 'birthDate', '')}
                // onChange={ this.changeState.bind(this, 'birthDate')}
                // floatingLabelFixed={true}
                // fullWidth
                /><br/>
            </Grid>
            <Grid item xs={3}>
              <br />
              {/* <Checkbox
                label="Multiple Birth"
                defaultChecked={false}
                labelPosition="right"
              />     */}
            </Grid>

            <Grid item xs={6}>
              <TextField
                id='photoInput'                
                name='photo'
                label='Photo'
                placeholder='http://somewhere.com/image.jpg'
                // value={ get(formData, 'photo', '')}
                // onChange={ this.changeState.bind(this, 'photo')}
                // floatingLabelFixed={true}
                // fullWidth
                /><br/>
            </Grid>
            <Grid item xs={3}>
              <TextField
                id='speciesInput'                
                name='species'
                label='Species'
                // value={ get(formData, 'species', '')}
                // placeholder='Human'
                // onChange={ this.changeState.bind(this, 'species')}
                // floatingLabelFixed={true}
                // fullWidth
                /><br/>
            </Grid>
            <Grid item xs={3}>
              <TextField
                id='languageInput'                
                name='language'
                label='Language'
                // value={ get(formData, 'language', '')}
                // onChange={ this.changeState.bind(this, 'language')}
                // placeholder='English'
                // floatingLabelFixed={true}
                // fullWidth
                /><br/>
            </Grid>

            <Grid item xs={3}>
              <TextField
                id='smartphoneInput'                
                name='smartphone'
                label='Phone'
                placeholder='773-555-1234'
                // value={ get(formData, 'smartphone', '')}
                // onChange={ this.changeState.bind(this, 'smartphone')}
                // floatingLabelFixed={true}
                // fullWidth
                /><br/>
            </Grid>

            {/* <CardActions>
              { formButtons }
            </CardActions> */}

          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

  

PatientDetail.propTypes = {
  id: PropTypes.string,
  fhirVersion: PropTypes.string,
  patientId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  patient: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onDelete: PropTypes.func,
  onUpsert: PropTypes.func,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  buttons: PropTypes.object
};
export default PatientDetail;