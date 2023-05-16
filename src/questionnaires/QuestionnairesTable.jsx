import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { 
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button  
} from '@material-ui/core';


import _ from 'lodash';
let get = _.get;
let cloneDeep = _.cloneDeep;
let findIndex = _.findIndex;
let pullAt = _.pullAt;

import moment from 'moment'

import { FhirDehydrator } from '../FhirDehydrator';




//===========================================================================
// MAIN COMPONENT  


function QuestionnairesTable(props){

  let { 
    children, 
    id,

    data,
    questionnaires,
    selectedQuestionnaireId,
    selectedIds,

    query,
    paginationLimit,
    disablePagination,
  
    hideCheckbox,
    hideIdentifier,
    hideActionIcons,
    hideTitle,
    hideStatus,
    hideDate,
    hideNumItems,
    hideBarcode,
  
    onCellClick,
    onRowClick,
    onMetaClick,
    onRemoveRecord,
    onActionButtonClick,
    hideActionButton,
    actionButtonLabel,
  
    rowsPerPage,
    tableRowSize,
    dateFormat,
    showMinutes,

    formFactorLayout,

    count,
    page,
    onSetPage,
    
    ...otherProps 
  } = props;


  // ------------------------------------------------------------------------
  // Form Factors

  if(formFactorLayout){
    logger.verbose('formFactorLayout', formFactorLayout + ' ' + window.innerWidth);
    switch (formFactorLayout) {
      case "phone":
        hideCheckbox = true;
        hideIdentifier = true;
        hideActionIcons = true;
        hideTitle = false;
        hideStatus = true;
        hideDate = true;
        hideNumItems = true;
        hideBarcode = true;
        break;
      case "tablet":
        hideCheckbox = true;
        hideIdentifier = true;
        hideActionIcons = true;
        hideTitle = false;
        hideStatus = true;
        hideDate = false;
        hideNumItems = true;
        hideBarcode = true;
        break;
      case "web":        
        hideCheckbox = true;
        hideIdentifier = true;
        hideActionIcons = true;
        hideTitle = false;
        hideStatus = false;
        hideDate = false;
        hideNumItems = false;
        hideBarcode = true;
        break;
      case "desktop":
        hideCheckbox = true;
        hideIdentifier = true;
        hideActionIcons = true;
        hideTitle = false;
        hideStatus = false;
        hideDate = false;
        hideNumItems = false;
        hideBarcode = true;
        break;
      case "hdmi":
        hideCheckbox = true;
        hideIdentifier = true;
        hideActionIcons = true;
        hideTitle = false;
        hideStatus = false;
        hideDate = false;
        hideNumItems = false;
        hideBarcode = false;
        break;            
    }
  }

  // ------------------------------------------------------------------------
  // CRUD Methods

  function removeRecord(_id){
    console.log('Remove questionnaire ', _id)
    if(onRemoveRecord){
      onRemoveRecord(_id);
    }
  }
  function handleActionButtonClick(id){
    if(typeof onActionButtonClick === "function"){
      onActionButtonClick(id);
    }
  }
  function cellClick(id){
    if(typeof onCellClick === "function"){
      onCellClick(id);
    }
  }

  function handleMetaClick(patient){
    let self = this;
    if(typeof onMetaClick === "function"){
      onMetaClick(self, patient);
    }
  }
  function selectQuestionnaireRow(questionnaireId){
    if(typeof onRowClick === "function"){
      onRowClick(questionnaireId);
    }
  }

  function handleToggle(index, objectId){
    // console.log('Toggling entry', index, objectId)

    let clonedRowIds = cloneDeep(selectedRowIds);
    // console.log('handleToggle().clonedRowIds', selectedRowIds)


    let trimmedRowIds = [];
    if(Array.isArray(clonedRowIds)){
      let undefinedIndex = findIndex(clonedRowIds, function(o) {
        if(typeof o !== "undefined"){
          trimmedRowIds.push(o);
        }
      });
    }
    // console.log('handleToggle().trimmedRowIds', trimmedRowIds)

    let rowId = trimmedRowIds.indexOf(objectId);
    // console.log('handleToggle().rowId', rowId)

    let resultingRowIds = cloneDeep(trimmedRowIds);
    if(rowId > -1){
      pullAt(resultingRowIds, rowId);
    } else {
      resultingRowIds.push(objectId);
    };
    // console.log('handleToggle().resultingRowIds', resultingRowIds)

    setSelectedRowIds(resultingRowIds);      

    if(props.onToggle){
      props.onToggle(resultingRowIds);
    }
  }

  // ------------------------------------------------------------------------
  // Column Rendering

  function renderToggleHeader(){
    if (!hideCheckbox) {
      return (
        <TableCell className="toggle" style={{width: '60px', padding: '0px'}} >Toggle</TableCell>
      );
    }
  }

  function renderToggle(index, objectId){
    if (!hideCheckbox) {
      return (
        <TableCell className="toggle" style={{width: '60px', padding: '0px'}}>
            <Checkbox
              defaultChecked={false} 
              onChange={ handleToggle.bind(this, index, objectId)} 
            />
        </TableCell>
      );
    }
  }
  function renderActionIconsHeader(){
    if (!hideActionIcons) {
      return (
        <TableCell className='actionIcons' style={{width: '100px'}}>Actions</TableCell>
      );
    }
  }
  function renderActionIcons(measureReport ){
    if (!hideActionIcons) {
      let iconStyle = {
        marginLeft: '4px', 
        marginRight: '4px', 
        marginTop: '4px', 
        fontSize: '120%'
      }

      return (
        <TableCell className='actionIcons' style={{minWidth: '120px'}}>
          {/* <FaTags style={iconStyle} onClick={ onMetaClick.bind(measureReport)} />
          <GoTrashcan style={iconStyle} onClick={ removeRecord.bind(measureReport._id)} />   */}
        </TableCell>
      );
    }
  } 
  function renderIdentifier(identifier){
    if (!hideIdentifier) {
      return (
        <TableCell className='identifier'>{ identifier }</TableCell>
      );
    }
  }
  function renderIdentifierHeader(){
    if (!hideIdentifier) {
      return (
        <TableCell className='identifier'>Identifier</TableCell>
      );
    }
  }
      

  function renderBarcode(id){
    if (!hideBarcode) {
      return (
        <TableCell><span className="barcode">{id}</span></TableCell>
      );
    }
  }
  function renderBarcodeHeader(){
    if (!hideBarcode) {
      return (
        <TableCell>System ID</TableCell>
      );
    }
  }
  function renderTitle(title){
    if (!hideTitle) {
      return (
        <TableCell><span className="title">{title}</span></TableCell>
      );
    }
  }
  function renderTitleHeader(){
    if (!hideTitle) {
      return (
        <TableCell>Title</TableCell>
      );
    }
  }
  function renderStatus(status){
    if (!hideStatus) {
      return (
        <TableCell><span className="status">{status}</span></TableCell>
      );
    }
  }
  function renderStatusHeader(){
    if (!hideStatus) {
      return (
        <TableCell>Status</TableCell>
      );
    }
  }
  function renderDate(date){
    if (!hideDate) {
      let columnDateFormat = "YYYY-MM-DD";
      if(dateFormat){
        columnDateFormat = dateFormat;
      }
      return (
        <TableCell style={{minWidth: '120px'}}>{moment(date).format("YYYY-MM-DD")}</TableCell>
      );
    }
  }
  function renderDateHeader(){
    if (!hideDate) {
      return (
        <TableCell>Date</TableCell>
      );
    }
  }

  function renderActionButtonHeader(){
    if (!hideActionButton) {
      return (
        <TableCell className='ActionButton' >Action</TableCell>
      );
    }
  }
  function renderActionButton(patient){
    if (!hideActionButton) {
      return (
        <TableCell className='ActionButton' >
          <Button onClick={ handleActionButtonClick.bind(this, patient[i]._id)}>{ get(props, "actionButtonLabel", "") }</Button>
        </TableCell>
      );
    }
  }
  function renderNumItems(numItems){
    if (!hideNumItems) {
      return (
        <TableCell><span className="numItems">{numItems}</span></TableCell>
      );
    }
  }
  function renderNumItemsHeader(){
    if (!hideNumItems) {
      return (
        <TableCell># Items</TableCell>
      );
    }
  }
  // ------------------------------------------------------------------------
  // Table Row Rendering

  let tableRows = [];
  let questionnairesToRender = [];
  let internalDateFormat = "YYYY-MM-DD";

  if(showMinutes){
    internalDateFormat = "YYYY-MM-DD hh:mm";
  }
  if(internalDateFormat){
    internalDateFormat = dateFormat;
  }

  if(questionnaires){
    if(questionnaires.length > 0){              
      questionnaires.forEach(function(questionnaire){
        questionnairesToRender.push(FhirDehydrator.dehydrateQuestionnaire(questionnaire, internalDateFormat));
      });  
    }
  }


  if(questionnairesToRender.length === 0){
    console.log('No questionnaires to render');
  } else {
    for (var i = 0; i < questionnairesToRender.length; i++) {

      let selected = false;
      if(questionnairesToRender[i].id === selectedQuestionnaireId){
        selected = true;
      }

      tableRows.push(
        <TableRow key={i} className="questionnaireRow" style={{cursor: "pointer"}} onClick={ selectQuestionnaireRow.bind(this, questionnairesToRender[i].id )} >
          { renderToggle(i, questionnairesToRender[i]._id) }
          { renderActionIcons(questionnairesToRender[i]) }
          { renderIdentifier(questionnairesToRender[i].identifier) }

          { renderTitle(questionnairesToRender[i].title) } 
          { renderStatus(questionnairesToRender[i].status) }
          { renderDate(questionnairesToRender[i].date) }
          { renderNumItems(questionnairesToRender[i].numItems) }

          { renderBarcode(questionnairesToRender[i].id) }
        </TableRow>
      );
    }
  }

  return(
    <div id={id} className="tableWithPagination">
      <Table id='questionnairesTable' >
        <TableHead>
          <TableRow>
          { renderToggleHeader() }
          { renderActionIconsHeader() }
          { renderIdentifierHeader() }

          { renderTitleHeader() }
          { renderStatusHeader() }
          { renderDateHeader() }
          { renderNumItemsHeader() }

          { renderBarcodeHeader() }
          </TableRow>
        </TableHead>
        <TableBody>
          { tableRows }
        </TableBody>
      </Table>
    </div>
  );
}




QuestionnairesTable.propTypes = {
  id: PropTypes.string,

  data: PropTypes.array,
  questionnaires: PropTypes.array,
  selectedQuestionnaireId: PropTypes.string,
  selectedIds: PropTypes.array,

  fhirVersion: PropTypes.string,
  query: PropTypes.object,
  paginationLimit: PropTypes.number,

  hideIdentifier: PropTypes.bool,
  hideCheckbox: PropTypes.bool,
  hideBarcode: PropTypes.bool,
  hideActionIcons: PropTypes.bool,
  hideTitle: PropTypes.bool,
  hideStatus: PropTypes.bool,
  hideDate: PropTypes.bool,
  hideNumItems: PropTypes.bool,

  onCellClick: PropTypes.func,
  onRowClick: PropTypes.func,
  onMetaClick: PropTypes.func,
  onRemoveRecord: PropTypes.func,
  onActionButtonClick: PropTypes.func,
  onCheck: PropTypes.func,
  onToggle: PropTypes.func,
  onSetPage: PropTypes.func,

  count: PropTypes.number,
  page: PropTypes.number,
  actionButtonLabel: PropTypes.string,
  hideActionButton: PropTypes.bool,

  formFactorLayout: PropTypes.string
};
QuestionnairesTable.defaultProps = {
  questionnaires: [],
  tableRowSize: 'medium',
  rowsPerPage: 5,
  dateFormat: "YYYY-MM-DD hh:mm:ss",
  hideCheckbox: true,
  hideIdentifier: false,
  hideBarcode: true,
  hideActionIcons: true,
  hideTitle: false,
  hideStatus: false,
  hideDate: false,
  hideNumItems: false,
  count: 0
};

export default QuestionnairesTable;