import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import { Card, CardMedia, CardTitle, CardText, CardActions, Toggle } from 'material-ui';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import { Table } from 'react-bootstrap';

import { GlassCard, VerticalCanvas, Glass, DynamicSpacer } from 'meteor/clinical:glass-ui';
import { get } from 'lodash';

import { FaTags, FaCode, FaPuzzlePiece, FaLock  } from 'react-icons/fa';

flattenObservation = function(observation){
  let result = {
    _id: '',
    meta: '',
    category: '',
    code: '',
    valueString: '',
    value: '',
    observationValue: '',
    subject: '',
    subjectId: '',
    status: '',
    device: '',
    createdBy: '',
    effectiveDateTime: '',
    issued: '',
    unit: ''
  };

  result._id =  get(observation, 'id') ? get(observation, 'id') : get(observation, '_id');
  result.category = get(observation, 'category.text', '');
  result.code = get(observation, 'code.text', '');
  result.valueString = get(observation, 'valueString', '');
  result.comparator = get(observation, 'valueQuantity.comparator', '');
  result.observationValue = get(observation, 'valueQuantity.value', '');
  result.unit = get(observation, 'valueQuantity.unit', '');
  result.subject = get(observation, 'subject.display', '');
  result.subjectId = get(observation, 'subject.reference', '');
  result.device = get(observation, 'device.display', '');
  result.status = get(observation, 'status', '');
  
  if(get(observation, 'effectiveDateTime')){
    result.effectiveDateTime =  moment(get(observation, 'effectiveDateTime')).format("YYYY-MM-DD hh a");
  }
  if(get(observation, 'issued')){
    result.effectiveDateTime =  moment(get(observation, 'issued')).format("YYYY-MM-DD hh a");    
  }



  result.meta = get(observation, 'category.text', '');

  if(result.valueString.length > 0){
    result.value = result.valueString;
  } else {
    result.value = result.comparator + ' ' + result.observationValue + ' ' + result.unit;
  }




  return result;
}



// db.inventory.find( { item: { $not: /^p.*/ } } )  



export class ObservationsTable extends React.Component {

  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        text: Glass.darkroom()
      },
      selected: [],
      observations: []
    };


    if(this.props.data){
      console.log('this.props.data', this.props.data);

      if(this.props.data.length > 0){              
        this.props.data.forEach(function(observation){
          data.observations.push(flattenObservation(observation));
        });  
      }
    } else {
      let query = {};
      if(this.props.query){
        query = this.props.query
      }
      if(this.props.hideEnteredInError){
        query['verificationStatus'] = {
          $nin: ['entered-in-error']  // unconfirmed | provisional | differential | confirmed | refuted | entered-in-error
        }
      }

      data.observations = Observations.find(query).map(function(observation){
        return flattenObservation(observation);
      });
    }


    // this could be another mixin
    if (Session.get('glassBlurEnabled')) {
      data.style.filter = "blur(3px)";
      data.style.WebkitFilter = "blur(3px)";
    }

    // this could be another mixin
    if (Session.get('backgroundBlurEnabled')) {
      data.style.backdropFilter = "blur(5px)";
    }

    if(process.env.NODE_ENV === "test") console.log("ObservationsTable[data]", data);
    return data;
  }
  handleChange(row, key, value) {
    const source = this.state.source;
    source[row][key] = value;
    this.setState({source});
  }
  displayOnMobile(width){
    let style = {};
    if(['iPhone'].includes(window.navigator.platform)){
      style.display = "none";
    }
    if(width){
      style.width = width;
    }
    return style;
  }
  handleSelect(selected) {
    this.setState({selected});
  }
  getDate(){
    return "YYYY/MM/DD";
  }
  noChange(){
    return "";
  }
  rowClick(id){
    Session.set("selectedObservationId", id);
    Session.set('observationPageTabIndex', 2);
    Session.set('observationDetailState', false);
  }
  renderBarcode(id){
    if (this.props.displayBarcodes) {
      return (
        <td><span className="barcode">{id}</span></td>
      );
    }
  }
  renderBarcodeHeader(){
    if (this.props.displayBarcodes) {
      return (
        <th>_id</th>
      );
    }
  }
  renderSubject(id){
    if (this.props.showSubjects) {
      return (
        <td className='name'>{ id }</td>
      );
    }
  }
  renderSubjectHeader(){
    if (this.props.showSubjects) {
      return (
        <th className='name'>subject</th>
      );
    }
  }
  renderDevice(device){
    if (this.props.showDevices) {
      return (
        <td className='device.display'>{device }</td>
      );
    }
  }
  renderDeviceHeader(){
    if (this.props.showDevices) {
      return (
        <th className='device.display'>device</th>
      );
    }
  }

  renderValue(valueString){
    if (this.props.showvalueString) {
      return (
        <td className='value'>{ valueString }</td>
      );
    }
  }
  renderValueHeader(){
    if (this.props.showValueString) {
      return (
        <th className='value'>Value</th>
      );
    }
  }

  renderCodeHeader(){
    if (this.props.multiline === false) {
      return (
        <th className='code'>Code</th>
      );
    }
  }

  renderCategoryHeader(){
    if (this.props.multiline === false) {
      return (
        <th className='category'>Category</th>
      );
    }
  }


  renderValueString(valueString){
    if (this.props.showValueString) {
      return (
        <td className='value'>{ valueString }</td>
      );
    }
  }
  renderValueStringHeader(){
    if (this.props.showValueString) {
      return (
        <th className='value'>Value</th>
      );
    }
  }
  renderComparator(comparator){
    if (this.props.showComparator) {
      return (
        <td className='comparator'>{ comparator }</td>
      );
    }
  }
  renderComparatorHeader(){
    if (this.props.showComparator) {
      return (
        <th className='comparator'>Comparator</th>
        );
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
  renderActionIcons(actionIcons ){
    if (!this.props.hideActionIcons) {
      return (
        <td className='actionIcons' style={{minWidth: '120px'}}>
          <FaLock style={{marginLeft: '2px', marginRight: '2px'}} />
          <FaTags style={{marginLeft: '2px', marginRight: '2px'}} />
          <FaCode style={{marginLeft: '2px', marginRight: '2px'}} />
          <FaPuzzlePiece style={{marginLeft: '2px', marginRight: '2px'}} />          
        </td>
      );
    }
  } 
  render () {
    let tableRows = [];
    for (var i = 0; i < this.data.observations.length; i++) {
      if(this.props.multiline){
        tableRows.push(
          <tr className="observationRow" key={i} style={this.data.style.text} onClick={ this.rowClick.bind(this, this.data.observations[i]._id)} >
            {/* <td className='category'>{this.data.observations[i].category }</td> */}
            { this.renderToggle() }
            { this.renderActionIcons() }
            <td className='code'>
              <b>{this.data.observations[i].code }</b> <br />
              {this.data.observations[i].value }
              </td>
            {/* {this.renderComparator(this.data.observations[i].comparator)}
            {this.renderValueString(this.data.observations[i].observationValue)} */}
            {this.renderValue(this.data.observations[i].observationValue)}
            {/* <td className='unit'>{this.data.observations[i].unit }</td> */}
            {this.renderSubject(this.data.observations[i].subject)}
            <td className='status' style={ this.displayOnMobile()} >{this.data.observations[i].status }</td>
            {this.renderDevice(this.data.observations[i].device)}
            <td className='date' style={{minWidth: '140px'}}>{this.data.observations[i].effectiveDateTime }</td>
            {this.renderBarcode(this.data.observations[i]._id)}
          </tr>
        );    

      } else {
        tableRows.push(
          <tr className="observationRow" key={i} style={this.data.style.text} onClick={ this.rowClick.bind(this, this.data.observations[i]._id)} >            
            { this.renderToggle() }
            { this.renderActionIcons() }
            <td className='category'>{this.data.observations[i].category }</td>
            <td className='code'>{this.data.observations[i].code }</td>
            {/* {this.renderComparator(this.data.observations[i].comparator)}
            {this.renderValueString(this.data.observations[i].observationValue)} */}
            {this.renderValue(this.data.observations[i].observationValue)}
            {/* <td className='unit'>{this.data.observations[i].unit }</td> */}
            {this.renderSubject(this.data.observations[i].subject)}
            <td className='status' style={ this.displayOnMobile()} >{this.data.observations[i].status }</td>
            {this.renderDevice(this.data.observations[i].device)}
            <td className='date' style={{minWidth: '140px'}}>{this.data.observations[i].effectiveDateTime }</td>
            {this.renderBarcode(this.data.observations[i]._id)}
          </tr>
        );    
      }
    }


    return(
      <CardText>
        <Table id="observationsTable" hover >
          <thead>
            <tr>
              {/* <th className='meta' style={ this.displayOnMobile('100px')}>Meta</th> */}
              {/* <th className='category'>Category</th>
              <th className='code'>Code</th> */}

              { this.renderToggleHeader() }
              { this.renderActionIconsHeader() }
              {this.renderCategoryHeader() }
              {this.renderCodeHeader() }
              {/* {this.renderComparatorHeader() }
              {this.renderValueStringHeader() } */}
              {this.renderValueHeader() }
              {/* <th className='unit'>Unit</th> */}
              {this.renderSubjectHeader() }
              <th className='status' style={ this.displayOnMobile()} >Status</th>
              {this.renderDeviceHeader() }
              <th className='date' style={{minWidth: '140px'}}>Date</th>
              {this.renderBarcodeHeader() }
            </tr>
          </thead>
          <tbody>
            { tableRows }
          </tbody>
        </Table>
      </CardText>
    );
  }
}

ObservationsTable.propTypes = {
  barcodes: PropTypes.bool,
  data: PropTypes.array,
  query: PropTypes.object,
  paginationLimit: PropTypes.number,
  showSubjects: PropTypes.bool,
  showDevices: PropTypes.bool,
  showValueString: PropTypes.bool,
  showComparator: PropTypes.bool,
  hideToggle: PropTypes.bool,
  hideActionIcons: PropTypes.bool,
  enteredInError: PropTypes.bool,
  multiline: PropTypes.bool
};

ReactMixin(ObservationsTable.prototype, ReactMeteorData);
export default ObservationsTable;