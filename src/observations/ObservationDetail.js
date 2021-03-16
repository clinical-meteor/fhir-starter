// import { CardActions, CardText } from 'material-ui/Card';
// import RaisedButton from 'material-ui/RaisedButton';
// import DatePicker from 'material-ui/DatePicker';
// import TextField from 'material-ui/TextField';

// import { Row, Col } from 'react-bootstrap';

// import React from 'react';
// import PropTypes from 'prop-types';

// import { Meteor } from 'meteor/meteor';

// import { get, set } from 'lodash';
// // import { setFlagsFromString } from 'v8';



// export class ObservationDetail extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       observationId: false,
//       observation: {
//         resourceType: 'Observation',
//         status: 'preliminary',
//         category: {
//           text: ''
//         },
//         effectiveDateTime: '',
//         subject: {
//           display: '',
//           reference: ''
//         },
//         performer: [],
//         device: {
//           display: '',
//           reference: ''
//         },
//         valueQuantity: {
//           value: '',
//           unit: '',
//           system: 'http://unitsofmeasure.org'
//         },
//         valueString: ''
//       },
//       form: {
//         category: '',
//         code: '',
//         value: '',
//         quantity: '',
//         unit: '',
//         deviceDisplay: '',
//         subjectDisplay: '',
//         subjectReference: '',
//         effectiveDateTime: '',
//         loincCode: '',
//         loincCodeText: '',
//         loincCodeDisplay: '',
//         status: ''
//       }
//     }
//   }
//   dehydrateFhirResource(observation) {
//     let formData = Object.assign({}, this.state.form);

//     formData.category = get(observation, 'type.text')
//     formData.code = get(observation, 'code.text')
//     formData.value = get(observation, 'valueString')
//     formData.comparator = get(observation, 'valueQuantity.comparator')
//     formData.quantity = get(observation, 'valueQuantity.value')
//     formData.unit = get(observation, 'valueQuantity.unit')
//     formData.deviceDisplay = get(observation, 'device.display')
//     formData.subjectDisplay = get(observation, 'subject.display')
//     formData.subjectReference = get(observation, 'subject.reference')
//     formData.effectiveDateTime = get(observation, 'effectiveDateTime')
//     formData.status = get(observation, 'status')

//     formData.loincCode = get(observation, 'code.codeable[0].code')
//     formData.loincCodeText = get(observation, 'code.text')
//     formData.loincCodeDisplay = get(observation, 'code.codeable[0].display')

//     return formData;
//   }
//   shouldComponentUpdate(nextProps){
//     process.env.NODE_ENV === "test" && console.log('ObservationDetail.shouldComponentUpdate()', nextProps, this.state)
//     let shouldUpdate = true;

//     // received an observation from the table; okay lets update again
//     if(nextProps.observationId !== this.state.observationId){

//       if(nextProps.observation){
//         this.setState({observation: nextProps.observation})     
//         this.setState({form: this.dehydrateFhirResource(nextProps.observation)})       
//       }

//       this.setState({observationId: nextProps.observationId})      
//       shouldUpdate = true;
//     }

//     // both false; don't take any more updates
//     if(nextProps.observation === this.state.observation){
//       shouldUpdate = false;
//     }
    
//     return shouldUpdate;
//   }
//   getMeteorData() {
//     let data = {
//       observationId: this.props.observationId,
//       observation: false,
//       form: this.state.form,
//       displayDatePicker: false
//     };

//     if(this.props.displayDatePicker){
//       data.displayDatePicker = this.props.displayDatePicker
//     }
    
//     if(this.props.observation){
//       data.observation = this.props.observation;
//       data.form = this.dehydrateFhirResource(this.props.observation);
//     }

//     //console.log("ObservationDetail[data]", data);
//     return data;
//   }

//   renderDatePicker(displayDatePicker, effectiveDateTime){
//     console.log('renderDatePicker', displayDatePicker, effectiveDateTime)
//     if(typeof effectiveDateTime === "string"){
//       effectiveDateTime = moment(effectiveDateTime);
//     }
//     if (displayDatePicker) {
//       return (
//         <DatePicker 
//           name='effectiveDateTime'
//           hintText={ this.setHint("Date of Administration") } 
//           container="inline" 
//           mode="landscape"
//           value={ effectiveDateTime ? effectiveDateTime : null}    
//           onChange={ this.changeState.bind(this, 'effectiveDateTime')}      
//           fullWidth
//         />
//       );
//     }
//   }
//   setHint(text){
//     if(this.props.showHints !== false){
//       return text;
//     } else {
//       return '';
//     }
//   }
//   render() {
//     console.log('ObservationDetail.render()', this.state)
//     //let formData = this.state.form;

//     var patientInputs;
//     if(this.props.showPatientInputs !== false){
//       patientInputs = <Row>
//         <Col md={6}>
//           <TextField
//             id='subjectDisplayInput'                
//             name='subjectDisplay'
//             floatingLabelText='Subject Name'
//             // TimelineSidescrollPage dialog popup
//             // Getting the following when passing an observation in via props
//             // A component is changing a controlled input of type text to be uncontrolled. Input elements should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled input element for the lifetime of the component. 
//             value={ get(this, 'data.form.subjectDisplay') }
//             onChange={ this.changeState.bind(this, 'subjectDisplay')}
//             hintText={ this.setHint('Jane Doe') }
//             floatingLabelFixed={true}
//             fullWidth
//             /><br/>
//         </Col>
//         <Col md={3}>
//           <TextField
//             id='subjectIdInput'                
//             name='subjectReference'
//             floatingLabelText='Subject ID'
//             value={ get(this, 'data.form.subjectReference') }
//             onChange={ this.changeState.bind(this, 'subjectReference')}
//             hintText={ this.setHint('Patient/12345') }
//             floatingLabelFixed={true}
//             fullWidth
//             /><br/>
//         </Col>
//         <Col md={3}>
//           <TextField
//             id='categoryTextInput'                
//             name='category'
//             floatingLabelText='Category'
//             value={ get(this, 'data.form.category') }
//             onChange={ this.changeState.bind(this, 'category')}
//             hintText={ this.setHint('Vital Signs') }
//             floatingLabelFixed={true}
//             fullWidth
//             /><br/>
//         </Col>
//       </Row>
//     }

//     return (
//       <div id={this.props.id} className="observationDetail">
//         <CardText>
//           { patientInputs }
//           <Row>
//           <Col md={6}>
//               <TextField
//                 id='loincCodeTextInput'                
//                 name='loincCodeText'
//                 floatingLabelText='LOINC Code Text'
//                 value={ get(this, 'data.form.loincCodeText') }
//                 onChange={ this.changeState.bind(this, 'loincCodeText')}
//                 hintText={ this.setHint('HbA1c') }
//                 floatingLabelFixed={true}
//                 value={ get(this, 'data.form.loincCodeText') }
//                 onChange={ this.changeState.bind(this, 'loincCodeText')}
//                 hintText={ this.setHint('HbA1c') }
//                 floatingLabelFixed={true}
//                 fullWidth
//                 /><br/>
//             </Col>
//             <Col md={2}>
//               <TextField
//                 id='loincCodeInput'                
//                 name='loincCode'
//                 floatingLabelText='LOINC Code'
//                 value={ get(this, 'data.form.loincCode') }
//                 onChange={ this.changeState.bind(this, 'loincCode')}
//                 hintText={ this.setHint('4548-4') }
//                 floatingLabelFixed={true}
//                 fullWidth
//                 /><br/>
//             </Col>
//             <Col md={4}>
//               <TextField
//                 id='loincDisplayInput'                
//                 name='loincCodeText'
//                 floatingLabelText='LOINC Display'
//                 value={ get(this, 'data.form.loincCodeText') }
//                 onChange={ this.changeState.bind(this, 'loincCodeText')}
//                 hintText={ this.setHint('4548-4') }
//                 floatingLabelFixed={true}
//                 fullWidth
//                 /><br/>
//             </Col>
//           </Row>

//           <Row>
//             <Col md={2}>
//               <TextField
//                 id='comparatorInput'                
//                 name='valueQuantity.comparator'
//                 floatingLabelText='Comparator'
//                 hintText={ this.setHint('< | <= | >= | >') }
//                 value={ get(this, 'data.form.comparator') }
//                 onChange={ this.changeState.bind(this, 'comparator')}
//                 floatingLabelFixed={true}
//                 fullWidth
//                 /><br/>
//             </Col>
//             <Col md={2}>
//               <TextField
//                 id='valueQuantityInput'                
//                 name='valueQuantity.value'
//                 floatingLabelText='Quantity'
//                 hintText={ this.setHint('70.0') }
//                 value={ get(this, 'data.form.quantity') }
//                 onChange={ this.changeState.bind(this, 'quantity')}
//                 floatingLabelFixed={true}
//                 fullWidth
//                 /><br/>
//             </Col>
//             <Col md={2}>
//               <TextField
//                 id='valueQuantityUnitInput'                
//                 name='valueQuantity.unit'
//                 floatingLabelText='Unit'
//                 hintText={ this.setHint('kg') }
//                 value={ get(this, 'data.form.unit') }
//                 onChange={ this.changeState.bind(this, 'unit')}
//                 floatingLabelFixed={true}
//                 fullWidth
//                 /><br/>
//             </Col>
//             <Col md={3}>
//               <TextField
//                 id='valueStringInput'                
//                 name='value'
//                 floatingLabelText='Value'
//                 hintText={ this.setHint('AB+; pos; neg') }
//                 value={ get(this, 'data.form.value') }
//                 onChange={ this.changeState.bind(this, 'value')}
//                 floatingLabelFixed={true}
//                 fullWidth
//                 /><br/>
//             </Col>
//             <Col md={3}>
//               <TextField
//                 id='statusInput'                
//                 name='status'
//                 floatingLabelText='Status'
//                 value={ get(this, 'data.form.status') }
//                 onChange={ this.changeState.bind(this, 'status')}
//                 hintText={ this.setHint('preliminary | final') }
//                 floatingLabelFixed={true}
//                 fullWidth
//                 /><br/>
//             </Col>
//           </Row>
//           <Row>
//             <Col md={3}>
//               <TextField
//                 id='deviceDisplayInput'                
//                 name='deviceDisplay'
//                 floatingLabelText='Device Name'
//                 value={ get(this, 'data.form.deviceDisplay') }
//                 onChange={ this.changeState.bind(this, 'deviceDisplay')}
//                 hintText={ this.setHint('iHealth Blood Pressure Cuff') }
//                 floatingLabelFixed={true}
//                 fullWidth
//                 /><br/>
//             </Col>
//             <Col md={3}>
//               <TextField
//                 id='deviceReferenceInput'                
//                 name='deviceReference'
//                 floatingLabelText='Device Name'
//                 // value={ get(this, 'data.form.deviceReference') }
//                 // onChange={ this.changeState.bind(this, 'deviceReference')}
//                 hintText={ this.setHint('Device/444') }
//                 floatingLabelFixed={true}
//                 fullWidth
//                 /><br/>
//             </Col>
//             <Col md={3}>
//               <br />
//               { this.renderDatePicker(this.data.displayDatePicker, get(this, 'data.form.effectiveDateTime') ) }
//             </Col>

//           </Row>
//         </CardText>
//         <CardActions>
//           { this.determineButtons(this.data.observationId) }
//         </CardActions>
//       </div>
//     );
//   }
//   determineButtons(observationId) {
//     if (observationId) {
//       return (
//         <div>
//           <RaisedButton id="updateObservationButton" label="Save" className="saveObservationButton" primary={true} onClick={this.handleSaveButton.bind(this)} style={{marginRight: '20px'}}  />
//           <RaisedButton id="deleteObservationButton" label="Delete" onClick={this.handleDeleteButton.bind(this)} />
//         </div>
//       );
//     } else {
//       return (
//         <RaisedButton id="saveObservationButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
//       );
//     }
//   }
//   updateFormData(formData, field, textValue){
//     if(process.env.NODE_ENV === "test") console.log("ObservationDetail.updateFormData", formData, field, textValue);

//     switch (field) {
//       case "category":
//         set(formData, 'category', textValue)
//         break;
//       case "code":
//         set(formData, 'code', textValue)
//         break;        
//       case "value":
//         set(formData, 'value', textValue)
//         break;        
//       case "comparator":
//         set(formData, 'comparator', textValue)
//         break;
//       case "quantity":
//         set(formData, 'quantity', textValue)
//         break;
//       case "unit":
//         set(formData, 'unit', textValue)
//         break;
//       case "deviceDisplay":
//         set(formData, 'deviceDisplay', textValue)
//         break;
//       case "subjectDisplay":
//         set(formData, 'subjectDisplay', textValue)
//         break;
//       case "subjectReference":
//         set(formData, 'subjectReference', textValue)
//         break;
//       case "effectiveDateTime":
//         set(formData, 'effectiveDateTime', textValue)
//         break;
//       case "status":
//         set(formData, 'status', textValue)
//         break;
//       case "loincCode":
//         set(formData, 'loincCode', textValue)
//         break;
//       case "loincCodeText":
//         set(formData, 'loincCodeText', textValue)
//         break;
//       case "loincCodeDisplay":
//         set(formData, 'loincCodeDisplay', textValue)
//         break;
//     }

//     if(process.env.NODE_ENV === "test") console.log("formData", formData);
//     return formData;
//   }
//   updateObservation(observationData, field, textValue){
//     if(process.env.NODE_ENV === "test") console.log("ObservationDetail.updateObservation", observationData, field, textValue);

//     switch (field) {
//       case "category":
//         set(observationData, 'category.text', textValue)
//         break;
//       case "code":
//         set(observationData, 'code.text', textValue)
//         break;        
//       case "value":
//         set(observationData, 'valueString', textValue)
//         break;        
//       case "comparator":
//         set(observationData, 'valueQuantity.comparator', textValue)
//         break;        
//       case "quantity":
//         set(observationData, 'valueQuantity.value', textValue)
//         break;
//       case "unit":
//         set(observationData, 'valueQuantity.unit', textValue)
//         break;
//       case "deviceDisplay":
//         set(observationData, 'device.display', textValue)
//         break;
//       case "subjectDisplay":
//         set(observationData, 'subject.display', textValue)
//         break;
//       case "subjectReference":
//         set(observationData, 'subject.reference', textValue)
//         break;
//       case "effectiveDateTime":
//         set(observationData, 'effectiveDateTime', textValue)
//         break;    
//       case "status":
//         set(observationData, 'status', textValue)
//         break;    
//       case "loincCode":
//         set(observationData, 'code.coding[0].code', textValue)
//         break;
//       case "loincCodeText":
//         set(observationData, 'code.text', textValue)
//         break;
//       case "loincCodeDisplay":
//         set(observationData, 'code.coding[0].display', textValue)
//         break;
//     }
//     return observationData;
//   }

//   changeState(field, event, textValue){
//     if(process.env.NODE_ENV === "test") console.log("   ");
//     if(process.env.NODE_ENV === "test") console.log("ObservationDetail.changeState", field, textValue);
//     if(process.env.NODE_ENV === "test") console.log("this.state", this.state);

//     let formData = Object.assign({}, this.state.form);
//     let observationData = Object.assign({}, this.state.observation);

//     formData = this.updateFormData(formData, field, textValue);
//     observationData = this.updateObservation(observationData, field, textValue);

//     if(process.env.NODE_ENV === "test") console.log("observationData", observationData);
//     if(process.env.NODE_ENV === "test") console.log("formData", formData);

//     this.setState({observation: observationData})
//     this.setState({form: formData})
//   }


  
//   // this could be a mixin
//   handleSaveButton() {
//     let self = this;
//     if(this.props.onUpsert){
//       this.props.onUpsert(self);
//     }
//   }

//   // this could be a mixin
//   handleCancelButton() {
//     let self = this;
//     if(this.props.onCancel){
//       this.props.onCancel(self);
//     }
//   }

//   handleDeleteButton() {
//     let self = this;
//     if(this.props.onDelete){
//       this.props.onDelete(self);
//     }
//   }
// }

// ObservationDetail.propTypes = {
//   id: PropTypes.string,
//   fhirVersion: PropTypes.string,
//   observationId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
//   observation: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
//   showPatientInputs: PropTypes.bool,
//   showHints: PropTypes.bool,
//   onInsert: PropTypes.func,
//   onUpsert: PropTypes.func,
//   onRemove: PropTypes.func,
//   onCancel: PropTypes.func
// };

// export default ObservationDetail;