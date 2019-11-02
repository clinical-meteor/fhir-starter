import React  from 'react';
// import { get } from 'lodash';

import _ from 'lodash';
let get = _.get;
let set = _.set;

function TableNoData(props){
  
  return (
    <div style={{
      width: '100%', 
      paddingTop: get(this, 'props.noDataPadding', 0) + 'px', 
      paddingBottom: get(this, 'props.noDataPadding', 0) + 'px', 
      textAlign: 'center'
      }} >
        <h3>No data.</h3>
        <span>Are you sure you're logged in?</span><br/>
        <span>Do you have an access token?</span><br/>
        <span>Is your search a wide enough scope?</span><br/>
        <span>Are you subscribed to this resource?</span><br/>
    </div>
  );
}

export default TableNoData;