import React from 'react';
import PropTypes from 'prop-types';

import { 
  Checkbox, 
  CardContent,  
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead
} from '@material-ui/core';

import moment from 'moment'
import _ from 'lodash';
let get = _.get;
let set = _.set;

import { FaTags  } from 'react-icons/fa';
import { GoTrashcan } from 'react-icons/go';

// import Icon from 'react-icons-kit'
// import {tag} from 'react-icons-kit/fa/tag'
// import {trashO} from 'react-icons-kit/fa/trashO'
// import {iosTrashOutline} from 'react-icons-kit/ionicons/iosTrashOutline'



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
  root: {
    padding: '0px',
    position: 'relative'
  }
}



export class ObservationTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      observations: []
    }
  }
  flattenObservation(observation){
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
      if(result.comparator){
        result.value = result.comparator + ' ';
      } 
      result.value = result.value + result.observationValue + ' ' + result.unit;
    }

    console.log('flattedObservations', result)
  
    return result;
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
  rowClick(_id){
    let self = this;
    if(this.props.onRowClick){
      this.props.onRowClick(self, _id);
    }
    // Session.set("selectedObservationId", _id);
    // Session.set('observationPageTabIndex', 2);
    // Session.set('observationDetailState', false);
  }
  renderActionIconsHeader(){
    if (!this.props.hideActionIcons) {
      return (
        <th className='actionIcons' style={{width: '100px'}}>Actions</th>
      );
    }
  }
  renderActionIcons(observation ){
    if (!this.props.hideActionIcons) {
      let iconStyle = {
        marginLeft: '4px', 
        marginRight: '4px', 
        marginTop: '2px', 
        fontSize: '120%'
      }

      return (
        <TableCell className='actionIcons' style={{minWidth: '120px'}}>
          <FaTags style={iconStyle} onClick={this.onMetaClick.bind(this, observation)} />
          <GoTrashcan style={iconStyle} onClick={this.removeRecord.bind(this, observation._id)} />  

          {/* <Icon icon={tag} style={iconStyle} onClick={this.onMetaClick.bind(this, observation)} /> 
          <Icon icon={trashO} style={iconStyle} onClick={this.removeRecord.bind(this, observation._id)}  />  */}

        </TableCell>
      );
    }
  } 
  removeRecord(_id){
    console.log('Remove observation ', _id)
    if(this.props.onRemoveRecord){
      this.props.onRemoveRecord(_id);
    }
  }
  onActionButtonClick(id){
    if(this.props.onActionButtonClick){
      this.props.onActionButtonClick(id);
    }
  }
  cellClick(id){
    if(this.props.onCellClick){
      this.props.onCellClick(id);
    }
  }

  onMetaClick(patient){
    let self = this;
    if(this.props.onMetaClick){
      this.props.onMetaClick(self, patient);
    }
  }
  renderBarcode(id){
    if (!this.props.hideBarcodes) {
      return (
        <TableCell><span className="barcode">{id}</span></TableCell>
      );
    }
  }
  renderBarcodeHeader(){
    if (!this.props.hideBarcodes) {
      return (
        <th>System ID</th>
      );
    }
  }
  renderSubject(id){
    if (!this.props.hideSubjects) {
      return (
        <TableCell className='name'>{ id }</TableCell>
      );
    }
  }
  renderSubjectHeader(){
    if (!this.props.hideSubjects) {
      return (
        <th className='name'>Subject</th>
      );
    }
  }
  renderDevice(device){
    if (!this.props.hideDevices) {
      return (
        <TableCell className='device.display'>{device }</TableCell>
      );
    }
  }
  renderDeviceHeader(){
    if (!this.props.hideDevices) {
      return (
        <th className='device.display'>Device</th>
      );
    }
  }

  renderValue(valueString){
    if (!this.props.hideValue) {
      return (
        <TableCell className='value'>{ valueString }</TableCell>
      );
    }
  }
  renderValueHeader(){
    if (!this.props.hideValue) {
      return (
        <th className='value'>Value</th>
      );
    }
  }

  renderCodeHeader(){
    if (!this.props.hideCode) {
      return (
        <th className='code'>Code</th>
      );
    }
  }
  renderCode(code, value){
    if (!this.props.hideCode) {
      if(this.props.multiline){
        return (<TableCell className='code'>
          <span style={{fontWeight: 400}}>{code }</span> <br />
          { value }
        </TableCell>)
      } else {
        return (
          <TableCell className='category'>{ code }</TableCell>
        );  
      }
    }
  }
  renderCategoryHeader(){
    if (this.props.multiline === false) {
      return (
        <th className='category'>Category</th>
      );
    }
  }
  renderCategory(category){
    if (this.props.multiline === false) {
      return (
        <TableCell className='category'>{ category }</TableCell>
      );
    }
  }

  renderValueString(valueString){
    if (!this.props.hideValue) {
      return (
        <TableCell className='value'>{ valueString }</TableCell>
      );
    }
  }
  renderValueStringHeader(){
    if (!this.props.hideValue) {
      return (
        <th className='value'>Value</th>
      );
    }
  }
  renderComparator(comparator){
    if (!this.props.hideComparator) {
      return (
        <TableCell className='comparator'>{ comparator }</TableCell>
      );
    }
  }
  renderComparatorHeader(){
    if (!this.props.hideComparator) {
      return (
        <th className='comparator'>Comparator</th>
        );
    }
  }
  renderToggleHeader(){
    if (!this.props.hideCheckboxes) {
      return (
        <th className="toggle" style={{width: '60px'}} >Toggle</th>
      );
    }
  }
  renderToggle(){
    if (!this.props.hideCheckboxes) {
      return (
        <TableCell className="toggle" style={{width: '60px'}}>
            <Checkbox
              defaultChecked={true}
              classes={{
                root: styles.root
              }}
            />
          </TableCell>
      );
    }
  }

  render () {
    let tableRows = [];
    let footer;
    let self = this;

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

    let observationsToRender = [];
    if(this.props.observations){
      if(this.props.observations.length > 0){              
        this.props.observations.forEach(function(observation){
          observationsToRender.push(self.flattenObservation(observation));
        });  
      }
    }

    if(observationsToRender.length === 0){
      logger.trace('ObservationTable:  No observations to render.');
      // footer = <TableNoData noDataPadding={ this.props.noDataMessagePadding } />
    } else {
      for (var i = 0; i < observationsToRender.length; i++) {
        if(this.props.multiline){
          tableRows.push(
            <TableRow className="observationRow" key={i} onClick={ this.rowClick.bind(this, observationsToRender[i]._id)} >
              { this.renderToggle() }
              { this.renderActionIcons(observationsToRender[i]) }
              { this.renderCategory(observationsToRender[i].category) }
              { this.renderCode(observationsToRender[i].code, observationsToRender[i].value) }
              {this.renderValue(observationsToRender[i].value)}
              {this.renderSubject(observationsToRender[i].subject)}
              <TableCell className='status' >{observationsToRender[i].status }</TableCell>
              {this.renderDevice(observationsToRender[i].device)}
              <TableCell className='date' style={{minWidth: '140px'}}>{observationsToRender[i].effectiveDateTime }</TableCell>
              {this.renderBarcode(observationsToRender[i]._id)}
            </TableRow>
          );    
  
        } else {
          tableRows.push(
            <TableRow className="observationRow" key={i} onClick={ this.rowClick.bind(this, observationsToRender[i]._id)} >            
              { this.renderToggle() }
              { this.renderActionIcons(observationsToRender[i]) }
              { this.renderCategory(observationsToRender[i].category) }
              { this.renderCode(observationsToRender[i].code) }
              { this.renderValue(observationsToRender[i].value)}
              { this.renderSubject(observationsToRender[i].subject)}
              <TableCell className='status' >{observationsToRender[i].status }</TableCell>
              { this.renderDevice(observationsToRender[i].device)}
              <TableCell className='date' style={{minWidth: '140px'}}>{observationsToRender[i].effectiveDateTime }</TableCell>
              { this.renderBarcode(observationsToRender[i]._id)}                            
            </TableRow>
          );    
        }
      }
    }


    return(
      <CardContent>
        <Table id="ObservationTable" hover >
          <TableHead>
            <TableRow>
              { this.renderToggleHeader() }
              { this.renderActionIconsHeader() }
              {this.renderCategoryHeader() }
              {this.renderCodeHeader() }
              {this.renderValueHeader() }
              {this.renderSubjectHeader() }
              <th className='status'>Status</th>
              {this.renderDeviceHeader() }
              <th className='date' style={{minWidth: '140px'}}>Date</th>
              {this.renderBarcodeHeader() }
            </TableRow>
          </TableHead>
          <TableBody>
            { tableRows }
          </TableBody>
        </Table>
      </CardContent>
    );
  }
}

ObservationTable.propTypes = {
  barcodes: PropTypes.bool,
  observations: PropTypes.array,
  query: PropTypes.object,
  paginationLimit: PropTypes.number,
  hideCode: PropTypes.bool,
  hideBarcodes: PropTypes.bool,
  hideSubjects: PropTypes.bool,
  hideDevices: PropTypes.bool,
  hideComparator: PropTypes.bool,
  hideValue: PropTypes.bool,
  hideCheckboxes: PropTypes.bool,
  hideActionIcons: PropTypes.bool,
  hideIdentifier: PropTypes.bool,
  enteredInError: PropTypes.bool,
  multiline: PropTypes.bool,
  onCellClick: PropTypes.func,
  onRowClick: PropTypes.func,
  onMetaClick: PropTypes.func,
  onRemoveRecord: PropTypes.func,
  onActionButtonClick: PropTypes.func,
  actionButtonLabel: PropTypes.string
};


export default ObservationTable; 