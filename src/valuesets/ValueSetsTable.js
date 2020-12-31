import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination
} from '@material-ui/core';

import TableNoData from 'material-fhir-ui';

import moment from 'moment'
import _ from 'lodash';
let get = _.get;
let set = _.set;

import { flattenValueSet } from '../FhirDehydrator';

//===========================================================================
// THEMING

import { ThemeProvider, makeStyles } from '@material-ui/styles';
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
  }
}

//===========================================================================
// FLATTENING / MAPPING

// flattenValueSet = function(valueSet, internalDateFormat){
//   let result = {
//     _id: '',
//     meta: '',
//     identifier: '',
//     title: '',
//   };

//   if(!internalDateFormat){
//     internalDateFormat = get(Meteor, "settings.public.defaults.internalDateFormat", "YYYY-MM-DD");
//   }

//   result._id =  get(valueSet, 'id') ? get(valueSet, 'id') : get(valueSet, '_id');
//   result.id = get(valueSet, 'id', '');
//   result.identifier = get(valueSet, 'identifier[0].value', '');
//   result.title = get(valueSet, 'title', '');


//   return result;
// }





function ValueSetsTable(props){
  logger.info('Rendering the ValueSetsTable');
  logger.verbose('clinical:hl7-fhir-data-infrastructure.client.ValueSetsTable');
  logger.data('ValueSetsTable.props', {data: props}, {source: "ValueSetsTable.jsx"});

  const classes = useStyles();

  let { 
    children, 

    valueSets,
    selectedValueSetId,

    query,
    paginationLimit,
    disablePagination,

    hideCheckbox,
    hideActionIcons,
    hideBarcode,

    onCellClick,
    onRowClick,
    onMetaClick,
    onRemoveRecord,
    onActionButtonClick,
    showActionButton,
    actionButtonLabel,
  
    rowsPerPage,
    formFactorLayout,

    ...otherProps 
  } = props;


  // ------------------------------------------------------------------------
  // Form Factors

  if(formFactorLayout){
    switch (formFactorLayout) {
      case "phone":
        hideCheckbox = true;
        hideActionIcons = true;
        hideIdentifier = true;
        hideTitle = false;
        hideDescription = false;        
        hideVersion = false;
        hideStatus = false;
        hideBarcode = true;
        break;
      case "tablet":
        hideCheckbox = true;
        hideActionIcons = true;
        hideIdentifier = true;
        hideTitle = false;
        hideDescription = false;        
        hideVersion = false;
        hideStatus = false;
        hideBarcode = false;
        break;
      case "web":
        hideCheckbox = true;
        hideActionIcons = true;
        hideIdentifier = true;
        hideTitle = false;
        hideDescription = false;        
        hideVersion = false;
        hideStatus = false;
        hideBarcode = false;
        break;
      case "desktop":
        hideCheckbox = true;
        hideActionIcons = true;
        hideIdentifier = true;
        hideTitle = false;
        hideDescription = false;        
        hideVersion = false;
        hideStatus = false;
        hideBarcode = false;
        break;
      case "videowall":
        hideCheckbox = true;
        hideActionIcons = true;
        hideIdentifier = true;
        hideTitle = false;
        hideDescription = false;        
        hideVersion = false;
        hideStatus = false;
        hideBarcode = false;s
        break;            
    }
  }


  // ------------------------------------------------------------------------
  // Helper Functions

  function handleRowClick(id){
    console.log('Clicking row ' + id)
    if(props.onRowClick){
      props.onRowClick(id);
    }
  }

  function removeRecord(_id){
    console.log('Remove valueSet ', _id)
    if(props.onRemoveRecord){
      props.onRemoveRecord(_id);
    }
  }
  function handleActionButtonClick(id){
    if(typeof props.onActionButtonClick === "function"){
      props.onActionButtonClick(id);
    }
  }
  function cellClick(id){
    if(typeof props.onCellClick === "function"){
      props.onCellClick(id);
    }
  }
  function handleMetaClick(patient){
    let self = this;
    if(props.onMetaClick){
      props.onMetaClick(self, patient);
    }
  }

  // ------------------------------------------------------------------------
  // Column Rendering

  function renderToggleHeader(){
    if (!props.hideCheckbox) {
      return (
        <TableCell className="toggle" style={{width: '60px'}} >Toggle</TableCell>
      );
    }
  }
  function renderToggle(){
    if (!props.hideCheckbox) {
      return (
        <TableCell className="toggle" style={{width: '60px'}}>
            {/* <Checkbox
              defaultChecked={true}
            /> */}
        </TableCell>
      );
    }
  }
  function renderActionIconsHeader(){
    if (!props.hideActionIcons) {
      return (
        <TableCell className='actionIcons' style={{width: '100px'}}>Actions</TableCell>
      );
    }
  }
  function renderActionIcons(valueSet ){
    if (!props.hideActionIcons) {
      let iconStyle = {
        marginLeft: '4px', 
        marginRight: '4px', 
        marginTop: '4px', 
        fontSize: '120%'
      }

      return (
        <TableCell className='actionIcons' style={{minWidth: '120px'}}>
          {/* <FaTags style={iconStyle} onClick={ onMetaClick.bind(valueSet)} />
          <GoTrashcan style={iconStyle} onClick={ removeRecord.bind(valueSet._id)} />   */}
        </TableCell>
      );
    }
  } 

  function renderTitle(title){
    if (!props.hideTitle) {
      return (
        <TableCell className='title'>{ title }</TableCell>
      );
    }
  }
  function renderTitleHeader(){
    if (!props.hideTitle) {
      return (
        <TableCell className='title'>Title</TableCell>
      );
    }
  }

  function renderBarcode(id){
    if (!props.hideBarcode) {
      return (
        <TableCell><span className="barcode helveticas">{id}</span></TableCell>
      );
    }
  }
  function renderBarcodeHeader(){
    if (!props.hideBarcode) {
      return (
        <TableCell>System ID</TableCell>
      );
    }
  }

  //---------------------------------------------------------------------
  // Pagination

  let rows = [];
  const [page, setPage] = useState(0);
  const [rowsPerPageToRender, setRowsPerPage] = useState(rowsPerPage);


  let paginationCount = 101;
  if(props.count){
    paginationCount = props.count;
  } else {
    paginationCount = rows.length;
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  let paginationFooter;
  if(!props.disablePagination){
    paginationFooter = <TablePagination
      component="div"
      rowsPerPageOptions={[5, 10, 25, 100]}
      colSpan={3}
      count={paginationCount}
      rowsPerPage={rowsPerPageToRender}
      page={page}
      onChangePage={handleChangePage}
      style={{float: 'right', border: 'none'}}
    />
  }
  
  
  //---------------------------------------------------------------------
  // Table Rows



  let tableRows = [];
  let valueSetsToRender = [];
  let internalDateFormat = "YYYY-MM-DD";

  if(props.showMinutes){
    internalDateFormat = "YYYY-MM-DD hh:mm";
  }
  if(props.internalDateFormat){
    internalDateFormat = props.dateFormat;
  }


  if(props.valueSets){
    if(props.valueSets.length > 0){              
      props.valueSets.forEach(function(valueSet){
        valueSetsToRender.push(flattenValueSet(valueSet, internalDateFormat));
      });  
    }
  }

  if(valueSetsToRender.length === 0){
    console.log('No valueSets to render');
    // footer = <TableNoData noDataPadding={ props.noDataMessagePadding } />
  } else {
    for (var i = 0; i < valueSetsToRender.length; i++) {

      let selected = false;
      if(valueSetsToRender[i].id === selectedValueSetId){
        selected = true;
      }
      tableRows.push(
        <TableRow 
          className="valueSetRow" 
          key={i} 
          onClick={ handleRowClick.bind(this, valueSetsToRender[i]._id)} 
          hover={true} 
          style={{cursor: 'pointer', height: '52px'}} 
          selected={selected}
        >
          { renderToggle() }
          { renderActionIcons(valueSetsToRender[i]) }
          { renderTitle(valueSetsToRender[i].title) }          
          
          
          { renderBarcode(valueSetsToRender[i].id)}
        </TableRow>
      );       
    }
  }

  return(
    <div>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            { renderToggleHeader() }
            { renderActionIconsHeader() }
            { renderTitleHeader() }
            
            
            { renderBarcodeHeader() }
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

ValueSetsTable.propTypes = {
  barcodes: PropTypes.bool,
  valueSets: PropTypes.array,
  selectedValueSetId: PropTypes.string,

  query: PropTypes.object,
  paginationLimit: PropTypes.number,
  showMinutes: PropTypes.bool,

  hideCheckbox: PropTypes.bool,
  hideActionIcons: PropTypes.bool,
  hideBarcode: PropTypes.bool,

  onCellClick: PropTypes.func,
  onRowClick: PropTypes.func,
  onMetaClick: PropTypes.func,
  onRemoveRecord: PropTypes.func,
  onActionButtonClick: PropTypes.func,
  actionButtonLabel: PropTypes.string,

  formFactorLayout: PropTypes.string
};
ValueSetsTable.defaultProps = {
  hideCheckbox: true,
  hideActionIcons: true,
  hideBarcode: true,
  selectedValueSetId: false,
  rowsPerPage: 5
}

export default ValueSetsTable; 