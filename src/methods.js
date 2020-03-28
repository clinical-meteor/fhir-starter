import _ from 'lodash';
let get = _.get;

function generateDateQuery(chainPrefix, start_date, end_date){
  let dateQuery = '';

  if(chainPrefix){
    dateQuery = chainPrefix;
  }
  if(start_date){
    dateQuery = dateQuery + 'date=gt' + start_date
  }
  if(start_date && end_date){
    dateQuery = dateQuery + '&';
  }
  if(chainPrefix){
    dateQuery = dateQuery + chainPrefix;
  }

  if(end_date){
    dateQuery = dateQuery + 'date=lt' + end_date
  }
  if(start_date || end_date){
    dateQuery = dateQuery;
  }

  return dateQuery;
}

function pluckName(fhirPatientResource){
  // patient name has gone through a number of revisions, and we need to search a few different spots, and assemble as necessary  
  let resultingNameString = "";

  let nameText = get(fhirPatientResource, 'name[0].text', '');
  if(nameText.length > 0){
    // some systems will store the name as it is to be displayed in the name[0].text field
    // if that's present, use it
    resultingNameString = get(fhirPatientResource, 'name[0].text', '');    
  } else {
    // the majority of systems out there are SQL based and make a design choice to store as 'first' and 'last' name
    // critiques of that approach can be saved for a later time
    // but suffice it to say that we need to assemble the parts

    if(get(fhirPatientResource, 'name[0].prefix[0]')){
      resultingNameString = get(fhirPatientResource, 'name[0].prefix[0]')  + ' ';
    }

    if(get(fhirPatientResource, 'name[0].given[0]')){
      resultingNameString = resultingNameString + get(fhirPatientResource, 'name[0].given[0]')  + ' ';
    }

    if(get(fhirPatientResource, 'name[0].family')){
      // R4 - droped the array of family names; one authoritative family name per fhirPatientResource
      resultingNameString = resultingNameString + get(fhirPatientResource, 'name[0].family')  + ' ';
    } else if (get(fhirPatientResource, 'name[0].family[0]')){
      // DSTU2 and STU3 - allows an array of family names
      resultingNameString = resultingNameString + get(fhirPatientResource, 'name[0].family[0]')  + ' ';
    }
    
    if(get(fhirPatientResource, 'name[0].suffix[0]')){
      resultingNameString = resultingNameString + ' ' + get(fhirPatientResource, 'name[0].suffix[0]');
    }
  }

  // remove any whitespace from the name
  return resultingNameString.trim();
}

function stringifyAddress(address){
  let assembledAddress = '';

  // var assembledAddress = "3928 W. Cornelia Ave, Chicago, IL";
  let assembledAddress = '';
  if(get(address, 'line[0]')){
    assembledAddress = get(address, 'line[0]');
  }
  if(get(address, 'city')){
    assembledAddress = assembledAddress + ', ' + get(address, 'city');
  }
  if(get(address, 'state')){
    assembledAddress = assembledAddress + ', ' + get(address, 'state');
  }
  if(get(address, 'postalCode')){
    assembledAddress = assembledAddress + ', ' + get(address, 'postalCode');
  }
  if(get(address, 'country')){
    assembledAddress = assembledAddress + ', ' + get(address, 'country');
  }

  return assembledAddress;
}


export default { generateDateQuery, pluckName, stringifyAddress };