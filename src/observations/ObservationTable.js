import React from 'react';
import PropTypes from 'prop-types';

// import { CardText } from 'material-ui';
import { Checkbox, CardContent } from '@material-ui/core/Checkbox';
import { Table } from 'react-bootstrap';

import moment from 'moment-es6'
import _ from 'lodash';
let get = _.get;
let set = _.set;

import { FaTags, FaCode, FaPuzzlePiece, FaLock  } from 'react-icons/fa';
import { GoTrashcan } from 'react-icons/go';


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
        <td className='actionIcons' style={{minWidth: '120px'}}>
          <FaTags style={iconStyle} onClick={this.onMetaClick.bind(this, observation)} />
          <GoTrashcan style={iconStyle} onClick={this.removeRecord.bind(this, observation._id)} />  
        </td>
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
        <td><span className="barcode">{id}</span></td>
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
        <td className='name'>{ id }</td>
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
        <td className='device.display'>{device }</td>
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
        <td className='value'>{ valueString }</td>
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
        return (<td className='code'>
          <span style={{fontWeight: 400}}>{code }</span> <br />
          { value }
        </td>)
      } else {
        return (
          <td className='category'>{ code }</td>
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
        <td className='category'>{ category }</td>
      );
    }
  }

  renderValueString(valueString){
    if (!this.props.hideValue) {
      return (
        <td className='value'>{ valueString }</td>
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
        <td className='comparator'>{ comparator }</td>
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
        <td className="toggle" style={{width: '60px'}}>
            <Checkbox
              defaultChecked={true}
              classes={{
                root: styles.root
              }}
            />
          </td>
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
      console.log('No observations to render');
      // footer = <TableNoData noDataPadding={ this.props.noDataMessagePadding } />
    } else {
      for (var i = 0; i < observationsToRender.length; i++) {
        if(this.props.multiline){
          tableRows.push(
            <tr className="observationRow" key={i} onClick={ this.rowClick.bind(this, observationsToRender[i]._id)} >
              { this.renderToggle() }
              { this.renderActionIcons(observationsToRender[i]) }
              { this.renderCategory(observationsToRender[i].category) }
              { this.renderCode(observationsToRender[i].code, observationsToRender[i].value) }
              {this.renderValue(observationsToRender[i].value)}
              {this.renderSubject(observationsToRender[i].subject)}
              <td className='status' >{observationsToRender[i].status }</td>
              {this.renderDevice(observationsToRender[i].device)}
              <td className='date' style={{minWidth: '140px'}}>{observationsToRender[i].effectiveDateTime }</td>
              {this.renderBarcode(observationsToRender[i]._id)}
            </tr>
          );    
  
        } else {
          tableRows.push(
            <tr className="observationRow" key={i} onClick={ this.rowClick.bind(this, observationsToRender[i]._id)} >            
              { this.renderToggle() }
              { this.renderActionIcons(observationsToRender[i]) }
              { this.renderCategory(observationsToRender[i].category) }
              { this.renderCode(observationsToRender[i].code) }
              {this.renderValue(observationsToRender[i].value)}
              {this.renderSubject(observationsToRender[i].subject)}
              <td className='status' >{observationsToRender[i].status }</td>
              {this.renderDevice(observationsToRender[i].device)}
              <td className='date' style={{minWidth: '140px'}}>{observationsToRender[i].effectiveDateTime }</td>
              {this.renderBarcode(observationsToRender[i]._id)}
            </tr>
          );    
        }
      }
    }


    return(
      <CardContent>
        <Table id="ObservationTable" hover >
          <thead>
            <tr>
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
            </tr>
          </thead>
          <tbody>
            { tableRows }
          </tbody>
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