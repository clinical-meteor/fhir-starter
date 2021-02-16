import _ from 'lodash';
let get = _.get;
let set = _.set;
let has = _.has;
let findIndex = _.findIndex;

import moment from 'moment';
  
//========================================================================================
// Helper Functions  

function determineSubjectDisplayString(resourceRecord){
  let subjectDisplayString = '';
  if(get(resourceRecord, 'subject')){
    if(get(resourceRecord, 'subject.display', '')){
      rsubjectDisplayString = get(resourceRecord, 'subject.display', '');
    } else {
      rsubjectDisplayString = get(resourceRecord, 'subject.reference', '');
    }
  }  
  if(get(resourceRecord, 'patient')){
    if(get(resourceRecord, 'patient.display', '')){
      rsubjectDisplayString = get(resourceRecord, 'patient.display', '');
    } else {
      rsubjectDisplayString = get(resourceRecord, 'patient.reference', '');
    }
  }  
  return subjectDisplayString;
}

//========================================================================================
// Flatten Algorithms

export function flattenAllergyIntolerance(allergy){
  let result = {
    patientDisplay: '',
    asserterDisplay: '',
    identifier: '',
    type: '',
    category: '',
    clinicalStatus: '',
    verificationStatus: '',
    snomedCode: '',
    snomedDisplay: '',
    evidenceDisplay: '',
    barcode: '',
    criticality: '',
    severity: '',
    patient: '',
    recorder: '', 
    reaction: '',
    substance: '',
    onset: '',
    recordedDate: ''
  };

  result.identifier = get(allergy, 'identifier[0].value');
  result.clinicalStatus = get(allergy, 'clinicalStatus');
  result.verificationStatus = get(allergy, 'verificationStatus');
  result.type = get(allergy, 'type');
  result.category = get(allergy, 'category[0]');

  if(has(allergy, 'substance.coding[0].display')){
    result.substance = get(allergy, 'substance.coding[0].display');
  } else {
    result.substance = get(allergy, 'substance.text');
  }

  if(get(allergy, 'code.coding[0]')){            
    result.snomedCode = get(allergy, 'code.coding[0].code');
    result.snomedDisplay = get(allergy, 'code.coding[0].display');
  }

  // DSTU2 v1.0.2
  result.patient = get(allergy, 'patient.display');
  result.recorder = get(allergy, 'recorder.display');
  result.reaction = get(allergy, 'reaction[0].description', '');
  result.onset = moment(get(allergy, 'reaction[0].onset')).format("YYYY-MM-DD");
  result.recordedDate = moment(get(allergy, 'recordedDate')).format("YYYY-MM-DD");

  // DSTU v4
  if(get(allergy, 'onsetDateTime')){
    result.onset = moment(get(allergy, 'onsetDateTime')).format("YYYY-MM-DD");
  }
  if(get(allergy, 'reaction[0].manifestation[0].text')){
    result.reaction = get(allergy, 'reaction[0].manifestation[0].text', '');
  }
  if(get(allergy, 'reaction[0].severity')){
    result.reaction = get(allergy, 'reaction[0].severity', '');
  }

  if(get(allergy, 'criticality')){
    switch (get(allergy, 'criticality')) {
      case "CRITL":
        result.criticality = 'Low Risk';         
        break;
      case "CRITH":
        result.criticality = 'High Risk';         
        break;
      case "CRITU":
        result.criticality = 'Unable to determine';         
        break;        
      default:
        result.criticality = get(allergy, 'criticality');    
      break;
    }
  };

  return result;
}


export function flattenAuditEvent(auditEvent){
  let result = {
    _id: auditEvent._id,
    id: auditEvent.id,
    typeDisplay: '',
    typeCode: '',
    subtypeDisplay: '',
    subtypeCode: '',
    action: '',
    outcome: '',
    outcomeDesc: '',

    agentName: '',
    sourceSite: '',
    entityName: '',

    recorded: ''
  };


  result.typeDisplay = get(auditEvent, 'type.display', '');
  result.typeCode = get(auditEvent, 'type.code', '');

  result.subtypeDisplay = get(auditEvent, 'subtype[0].display', '');
  result.subtypeCode = get(auditEvent, 'subtype[0].code', '');

  result.action = get(auditEvent, 'action', '');
  result.outcome = get(auditEvent, 'outcome', '');
  result.outcomeDesc = get(auditEvent, 'outcomeDesc', '');

  result.agentName = get(auditEvent, 'agent[0].name', '');
  result.sourceSite = get(auditEvent, 'source[0].site', '');
  result.entityName = get(auditEvent, 'entity[0].name', '');

  // there's an off-by-1 error between momment() and Date() that we want
  // to account for when converting back to a string
  result.recorded = moment(auditEvent.recorded).format("YYYY-MM-DD")

  return result;
}


export function flattenBundle(bundle){
  let result = {
    _id: bundle._id,
    id: bundle.id,
    active: true,
    type: '',
    links: 0,
    entries: 0,
    total: 0,
    timestamp: ''
  };

  result.type = get(bundle, 'type', '');
  if(Array.isArray(bundle.links)){
    result.links = bundle.links.length;
  }
  if(Array.isArray(bundle.entry)){
    result.entries = bundle.entry.length;
  }
  result.total = get(bundle, 'total', 0);

  // there's an off-by-1 error between momment() and Date() that we want
  // to account for when converting back to a string
  result.timestamp = moment(bundle.timestamp).format("YYYY-MM-DD hh:mm:ss")

  return result;
}


export function flattenCarePlan(plan){
  // careplans: CarePlans.find({'subject.reference': Meteor.userId}).map(function(plan){
  // todo: replace tertiary logic

  // console.log('flattenCarePlan', plan)

  let result = {
    _id: '',
    id: '',
    subject: '',
    author: '',
    template: '',
    category: '',
    am: '',
    pm: '',
    activities: 0,
    goals: 0,
    addresses: 0,
    start: '',
    end: '',
    title: '',
    identifier: '',
    status: ''
  };

  result.id = get(plan, 'id', '');
  result._id = get(plan, '_id', '');

  if (get(plan, 'template')) {
    result.template = plan.template.toString();
  }

  result.subject = determineSubjectDisplayString(plan);

  result.author = get(plan, 'author[0].display', '')
  result.start = moment(get(plan, 'period.start')).format("YYYY-MM-DD hh:mm a");
  result.end = moment(get(plan, 'period.start')).format("YYYY-MM-DD hh:mm a");
  result.category = get(plan, 'category[0].text', '')  
  result.status = get(plan, 'status', '')    

  if(Array.isArray(plan.category)){
    plan.category.forEach(function(planCategory){
      if(get(planCategory, 'text')){
        result.category = planCategory.text;
      }
    })
  }

  result.identifier = get(plan, 'identifier[0].value', '')    

  if (get(plan, 'activity')) {
    result.activities = plan.activity.length;
  }
  if (get(plan, 'goal')) {
    result.goals = plan.goal.length;
  }
  if (get(plan, 'addresses')) {
    result.addresses = plan.addresses.length;
  }

  if(!result.title){
    result.title = get(plan, 'title', '')    
  }
  if(!result.title){
    result.title = get(plan, 'description', '')    
  }
  if(!result.title){
    result.title = get(plan, 'category[0].coding[0].display', '')    
  }


  return result;
}

export function flattenComposition(composition){
  let result = {
    _id: '',
    id: '',
    meta: '',
    identifier: '',
    status: '',
    typeCode: '',
    typeDisplay: '',
    categoryDisplay: '',
    subject: '',
    subjectReference: '',
    encounter: '',
    encounterReference: '',
    author: '',
    authorReference: '',
    relatesToCode: '',
    relatesToIdentifier: '',
    relatesToDisplay: '',
    relatesToReference: '',
    date: '',

    sectionsCount: 0,
  };

  result.id = get(composition, 'id', '');
  result._id = get(composition, '_id', '');

  result.identifier = get(composition, 'identifier[0].value', '')    
  result.status = get(composition, 'status', '');
  result.date = moment(get(composition, 'date', '')).format("YYYY-MM-DD hh:mm");
  result.typeCode = get(composition, 'type.coding[0].code', '');
  result.typeDisplay = get(composition, 'type.coding[0].display', '');
  result.categoryDisplay = get(composition, 'category[0].text', '');


  if(has(composition, 'subject')){
    result.subject = get(composition, 'subject.display', '');
  } else {
    result.subject = get(composition, 'subject.reference', '');
  }
  result.subjectReference = get(composition, 'subject.reference', '');

  if(has(composition, 'encounter')){
    result.encounter = get(composition, 'encounter.display', '');
  } else {
    result.encounter = get(composition, 'encounter.reference', '');
  }
  result.encounterReference = get(composition, 'encounter.reference', '');

  if(has(composition, 'author')){
    result.author = get(composition, 'author.display', '');
  } else {
    result.author = get(composition, 'author.reference', '');
  }
  result.authorReference = get(composition, 'author.reference', '');


  result.relatesToCode = get(composition, 'relatesTo[0].code', '');
  result.relatesToIdentifier = get(composition, 'relatesTo[0].targetIdentifier.value', '');
  result.relatesToDisplay = get(composition, 'relatesTo[0].targetReference.display', '');
  result.relatesToReference = get(composition, 'relatesTo[0].targetReference.reference', '');
  
  let sectionArray = get(composition, 'section', []);
  if(Array.isArray(sectionArray)){
    result.sectionsCount = sectionArray.length;
  }

  return result;
}

export function flattenCondition(condition, internalDateFormat){
  let result = {
    _id: '',
    id: '',
    meta: '',
    identifier: '',
    clinicalStatus: '',
    patientDisplay: '',
    patientReference: '',
    asserterDisplay: '',
    verificationStatus: '',
    severity: '',
    snomedCode: '',
    snomedDisplay: '',
    evidenceDisplay: '',
    barcode: '',
    onsetDateTime: '',
    abatementDateTime: ''
  };

  if(!internalDateFormat){
    internalDateFormat = "YYYY-MM-DD";
  }

  result._id = get(condition, '_id', '');
  result.id = get(condition, 'id', '');
  result.identifier = get(condition, 'identifier[0].value', '');

  if(get(condition, 'patient')){
    result.patientDisplay = get(condition, 'patient.display', '');
    result.patientReference = get(condition, 'patient.reference', '');
  } else if (get(condition, 'subject')){
    result.patientDisplay = get(condition, 'subject.display', '');
    result.patientReference = get(condition, 'subject.reference', '');
  }
  result.asserterDisplay = get(condition, 'asserter.display', '');


  if(get(condition, 'clinicalStatus.coding[0].code')){
    result.clinicalStatus = get(condition, 'clinicalStatus.coding[0].code', '');  //R4
  } else {
    result.clinicalStatus = get(condition, 'clinicalStatus', '');                 // DSTU2
  }

  if(get(condition, 'verificationStatus.coding[0].code')){
    result.verificationStatus = get(condition, 'verificationStatus.coding[0].code', '');  // R4
  } else {
    result.verificationStatus = get(condition, 'verificationStatus', '');                 // DSTU2
  }

  result.snomedCode = get(condition, 'code.coding[0].code', '');
  result.snomedDisplay = get(condition, 'code.coding[0].display', '');

  result.evidenceDisplay = get(condition, 'evidence[0].detail[0].display', '');
  result.barcode = get(condition, '_id', '');
  result.severity = get(condition, 'severity.text', '');

  result.onsetDateTime = moment(get(condition, 'onsetDateTime', '')).format("YYYY-MM-DD");
  result.abatementDateTime = moment(get(condition, 'abatementDateTime', '')).format("YYYY-MM-DD");

  console.log('flattenCondition().result', result)
  return result;
}



export function flattenCommunication(communication, internalDateFormat){
  let result = {
    _id: communication._id,
    subject: '',
    subjectReference: '',
    recipient: '',
    identifier: '',
    telecom: '',
    sent: '',
    received: '',
    category: '',
    payload: '',
    status: ''
  };

  if(get(communication, 'sent')){
    result.sent = moment(get(communication, 'sent')).add(1, 'days').format("YYYY-MM-DD hh:mm")
  }
  if(get(communication, 'received')){
    result.received = moment(get(communication, 'received')).add(1, 'days').format("YYYY-MM-DD")
  }

  let telecomString = "";
  let communicationString = "";

  if(typeof get(communication, 'recipient[0].reference') === "string"){
    communicationString = get(communication, 'recipient[0].reference', '');
  } else if(typeof get(communication, 'recipient.reference') === "string"){
    communicationString = get(communication, 'recipient.reference', '');
  }
  
  if(communicationString.split("/")[1]){
    telecomString = communicationString.split("/")[1];
  } else {
    telecomString = communicationString;
  }

  if(telecomString.length > 0){
    result.telecom = telecomString;
  } else {
    result.telecom = get(communication, 'telecom[0].value', '');
  }

  result.subject = get(communication, 'subject.display') ? get(communication, 'subject.display') : get(communication, 'subject.reference')
  result.recipient = get(communication, 'recipient[0].display') ? get(communication, 'recipient[0].display') : get(communication, 'recipient[0].reference')
  result.identifier = get(communication, 'identifier[0].type.text');
  result.category = get(communication, 'category[0].text');
  result.payload = get(communication, 'payload[0].contentString');
  result.status = get(communication, 'status');

  return result;
}

export function flattenCommunicationRequest(communicationRequest, internalDateFormat){
  let result = {
    _id: communicationRequest._id,
    id: '',
    authoredOn: '',
    subject: '',
    subjectReference: '',
    recipient: '',
    identifier: '',
    telecom: '',
    sent: '',
    received: '',
    category: '',
    payload: '',
    status: '',
    requester: ''
  };

  if(get(communicationRequest, 'sent')){
    result.sent = moment(get(communicationRequest, 'sent')).add(1, 'days').format("YYYY-MM-DD hh:mm")
  }
  if(get(communicationRequest, 'received')){
    result.received = moment(get(communicationRequest, 'received')).add(1, 'days').format("YYYY-MM-DD")
  }

  if(get(communicationRequest, 'authoredOn')){
    result.authoredOn = moment(get(communicationRequest, 'authoredOn')).format("YYYY-MM-DD hh:mm")
  }

  let telecomString = "";
  let communicationRequestString = "";

  if(typeof get(communicationRequest, 'recipient[0].reference') === "string"){
    communicationRequestString = get(communicationRequest, 'recipient[0].reference', '');
  } else if(typeof get(communicationRequest, 'recipient.reference') === "string"){
    communicationRequestString = get(communicationRequest, 'recipient.reference', '');
  }
  
  if(communicationRequestString.split("/")[1]){
    telecomString = communicationRequestString.split("/")[1];
  } else {
    telecomString = communicationRequestString;
  }

  if(telecomString.length > 0){
    result.telecom = telecomString;
  } else {
    result.telecom = get(communicationRequest, 'telecom[0].value', '');
  }

  result.subject = get(communicationRequest, 'subject.display') ? get(communicationRequest, 'subject.display') : get(communicationRequest, 'subject.reference')
  result.recipient = get(communicationRequest, 'recipient[0].display') ? get(communicationRequest, 'recipient[0].display') : get(communicationRequest, 'recipient[0].reference')
  result.identifier = get(communicationRequest, 'identifier[0].value');
  result.category = get(communicationRequest, 'category[0].text');
  result.payload = get(communicationRequest, 'payload[0].contentString');
  result.status = get(communicationRequest, 'status');
  result.id = get(communicationRequest, 'id');

  result.requester = get(communicationRequest, 'requester.display');

  return result;
}

export function flattenCommunicationResponse(communicationResponse, internalDateFormat){
  let result = {
    _id: communicationResponse._id,
    subject: '',
    subjectReference: '',
    recipient: '',
    identifier: '',
    telecom: '',
    sent: '',
    received: '',
    category: '',
    payload: '',
    status: ''
  };

  if(get(communicationResponse, 'sent')){
    result.sent = moment(get(communicationResponse, 'sent')).add(1, 'days').format("YYYY-MM-DD hh:mm")
  }
  if(get(communicationResponse, 'received')){
    result.received = moment(get(communicationResponse, 'received')).add(1, 'days').format("YYYY-MM-DD")
  }

  let telecomString = "";
  let communicationResponseString = "";

  if(typeof get(communicationResponse, 'recipient[0].reference') === "string"){
    communicationResponseString = get(communicationResponse, 'recipient[0].reference', '');
  } else if(typeof get(communicationResponse, 'recipient.reference') === "string"){
    communicationResponseString = get(communicationResponse, 'recipient.reference', '');
  }
  
  if(communicationResponseString.split("/")[1]){
    telecomString = communicationResponseString.split("/")[1];
  } else {
    telecomString = communicationResponseString;
  }

  if(telecomString.length > 0){
    result.telecom = telecomString;
  } else {
    result.telecom = get(communicationResponse, 'telecom[0].value', '');
  }

  result.subject = get(communicationResponse, 'subject.display') ? get(communicationResponse, 'subject.display') : get(communicationResponse, 'subject.reference')
  result.recipient = get(communicationResponse, 'recipient[0].display') ? get(communicationResponse, 'recipient[0].display') : get(communicationResponse, 'recipient[0].reference')
  result.identifier = get(communicationResponse, 'identifier[0].type.text');
  result.category = get(communicationResponse, 'category[0].text');
  result.payload = get(communicationResponse, 'payload[0].contentString');
  result.status = get(communicationResponse, 'status');

  return result;
}

export function flattenDevice(device, internalDateFormat){
  let result = {
    _id: '',
    id: '',
    meta: '',
    status: '',
    identifier: '',
    deviceType: '',
    deviceModel: '',
    manufacturer: '',
    serialNumber: '',
    costOfOwnership: '',
    lotNumber: '',
    deviceName: ''
  };

  if(!internalDateFormat){
    internalDateFormat = "YYYY-MM-DD";
  }

  result._id = get(device, '_id', '');
  result.id = get(device, 'id', '');
  result.identifier = get(device, 'identifier[0].value', '');

  result.status = get(device, 'status', '');
  result.deviceType = get(device, 'type.text', '');
  result.deviceModel = get(device, 'model', '');
  result.manufacturer = get(device, 'manufacturer', '');
  result.serialNumber = get(device, 'identifier[0].value', '');
  result.lotNumber = get(device, 'lotNumber', '');
  result.note = get(device, 'note[0].text', '');
  result.deviceName = get(device, 'deviceName[0].name', '');

  console.log('result', JSON.stringify(result))
  return result;
}

export function flattenDiagnosticReport(report, fhirVersion){  
  var result = {
    _id: '',
    id: '',
    subjectDisplay: '',
    code: '',
    status: '',
    issued: '',
    performerDisplay: '',
    identifier: '',
    category: '',
    effectiveDate: ''
  };
  
  if (report){
    result.id = get(report, 'id');
    result._id = get(report, '_id');

    if(report.subject){
      if(report.subject.display){
        result.subjectDisplay = report.subject.display;
      } else {
        result.subjectDisplay = report.subject.reference;          
      }
    }
    if(fhirVersion === "v3.0.1"){
      if(get(report, 'performer[0].actor.display')){
        result.performerDisplay = get(report, 'performer[0].actor.display');
      } else {
        result.performerDisplay = get(report, 'performer[0].actor.reference');          
      }
    }
    if(fhirVersion === "v1.0.2"){
      if(report.performer){
        result.performerDisplay = get(report, 'performer.display');
      } else {
        result.performerDisplay = get(report, 'performer.reference'); 
      }      
    }

    if(get(report, 'category.coding[0].code')){
      result.category = get(report, 'category.coding[0].code');
    } else {
      result.category = get(report, 'category.text');
    }

    result.code = get(report, 'code.text', '');
    result.identifier = get(report, 'identifier[0].value', '');
    result.status = get(report, 'status', '');
    result.effectiveDate = moment(get(report, 'effectiveDateTime')).format("YYYY-MM-DD");
    result.issued = moment(get(report, 'issued')).format("YYYY-MM-DD"); 

    return result;  
  } 
}


export function flattenDocumentReference(documentReference, internalDateFormat){
  let result = {
    _id: '',
    id: '',
    meta: '',
    masterIdentifier: '',
    identifier: '',
    status: '',
    docStatus: '',
    typeDisplay: '',
    typeCode: '',
    category: '',
    subjectReference: '',
    subjectDisplay: '',
    date: '',

    description: '',
    author: '',
    authorReference: '',

    relatesToCode: '',
    relatesToReference: '',

    contentAttachment: '',
    contentFormat: '',
    contentTitle: '',
    contentSize: '',
    contentCount: 0
  };

  if(!internalDateFormat){
    internalDateFormat = "YYYY-MM-DD";
  }

  result._id = get(documentReference, '_id', '');
  result.id = get(documentReference, 'id', '');
  result.identifier = get(documentReference, 'identifier[0].value', '');
  result.status = get(documentReference, 'status', '');
  result.docStatus = get(documentReference, 'docStatus', '');
  result.description = get(documentReference, 'description', '');

  result.masterIdentifier = get(documentReference, 'masterIdentifier.value', '');

  result.subjectReference = get(documentReference, 'subject.reference', '');
  result.subjectDisplay = get(documentReference, 'subject.display', '');

  result.date = moment(get(documentReference, 'date')).format("YYYY-MM-DD");

  if(get(documentReference, 'category.coding[0].code')){
    result.category = get(documentReference, 'category.coding[0].code');
  } else {
    result.category = get(documentReference, 'category.text');
  }

  result.typeCode = get(documentReference, 'type.coding[0].code', '');
  result.typeDisplay = get(documentReference, 'type.text', '');

  result.author = get(documentReference, 'author[0].display', '')
  result.authorReference = get(documentReference, 'author[0].reference', '')

  result.relatesToCode = get(documentReference, 'relatesTo[0].code', '')
  result.relatesToReference = get(documentReference, 'relatesTo[0].target.reference', '')

  result.contentAttachment = get(documentReference, 'content[0].attachment.url', '')
  result.contentTitle = get(documentReference, 'content[0].attachment.title', '')
  result.contentSize = get(documentReference, 'content[0].attachment.size', '')
  result.contentFormat = get(documentReference, 'content[0].format.display', '')

  if(Array.isArray(documentReference.content)){
    result.contentCount = documentReference.content.length;
  }

  return result;
}

export function flattenEncounter(encounter, internalDateFormat){
  let result = {
    _id: '',
    id: '',
    meta: '',
    subject: '',
    subjectId: '',
    status: '',
    statusHistory: 0,
    periodStart: '',
    periodEnd: '',
    reasonCode: '', 
    reasonDisplay: '', 
    typeCode: '',
    typeDisplay: '',
    classCode: '',
    duration: ''
  };

  if(!internalDateFormat){
    internalDateFormat = get(Meteor, "settings.public.defaults.internalDateFormat", "YYYY-MM-DD");
  }

  result.id =  get(encounter, 'id');
  result._id =  get(encounter, '_id');

  result.subject = determineSubjectDisplayString(encounter);
  result.subjectId = get(encounter, 'subject.reference', '');

  result.status = get(encounter, 'status', '');
  result.reasonCode = get(encounter, 'reason[0].coding[0].code', '');
  result.reasonDisplay = get(encounter, 'reason[0].coding[0].display', '');
  result.typeCode = get(encounter, 'type[0].coding[0].code', '');
  result.typeDisplay = get(encounter, 'type[0].coding[0].display', '');

  if(get(encounter, 'class.code')){
    result.classCode = get(encounter, 'class.code', '');
  } else if(get(encounter, 'class')){
    result.classCode = get(encounter, 'class', '');
  }

  let statusHistory = get(encounter, 'statusHistory', []);

  result.statusHistory = statusHistory.length;

  let momentStart = moment(get(encounter, 'period.start', ''))
  if(get(encounter, 'period.start')){
    momentStart = moment(get(encounter, 'period.start', ''))
  } else if(get(encounter, 'performedPeriod.start')){
    momentStart = moment(get(encounter, 'performedPeriod.start', ''))
  }
  if(momentStart){
    result.periodStart = momentStart.format(internalDateFormat);
  } 


  let momentEnd;
  if(get(encounter, 'period.end')){
    momentEnd = moment(get(encounter, 'period.end', ''))
  } else if(get(encounter, 'performedPeriod.end')){
    momentEnd = moment(get(encounter, 'performedPeriod.end', ''))
  }
  if(momentEnd){
    result.periodEnd = momentEnd.format(internalDateFormat);
  } 

  if(momentStart && momentEnd){
    result.duration = Math.abs(momentStart.diff(momentEnd, 'minutes', true))
  }

  return result;
}



export function flattenImmunization(immunization, internalDateFormat){
  let result = {
    _id: '',
    id: '',
    meta: '',
    identifier: '',
    patientDisplay: '',
    patientReference: '',
    performerDisplay: '',
    performerReference: '',
    vaccineCode: '',
    vaccineDisplay: '',
    status: '',
    reported: '',
    date: ''
  };

  if(!internalDateFormat){
    internalDateFormat = "YYYY-MM-DD";
  }

  result._id =  get(immunization, 'id') ? get(immunization, 'id') : get(immunization, '_id');
  result.id = get(immunization, 'id', '');
  result.identifier = get(immunization, 'identifier[0].value', '');

  if(get(immunization, 'patient')){
    result.patientDisplay = get(immunization, 'patient.display', '');
    result.patientReference = get(immunization, 'patient.reference', '');
  } else if (get(immunization, 'subject')){
    result.patientDisplay = get(immunization, 'subject.display', '');
    result.patientReference = get(immunization, 'subject.reference', '');
  }

  if(get(immunization, 'performer')){
    result.performerDisplay = get(immunization, 'performer.display', '');
    result.performerReference = get(immunization, 'performer.reference', '');
  } 

  result.performerDisplay = get(immunization, 'asserter.display', '');

  if(get(immunization, 'status.coding[0].code')){
    result.status = get(immunization, 'status.coding[0].code', '');  //R4
  } else {
    result.status = get(immunization, 'status', '');                 // DSTU2
  }

  result.vaccineCode = get(immunization, 'vaccineCode.coding[0].code', '');

  if(get(immunization, 'vaccineCode.coding[0].display')){
    result.vaccineDisplay = get(immunization, 'vaccineCode.coding[0].display', '');  //R4
  } else {
    result.vaccineDisplay = get(immunization, 'vaccineCode.text', '');                 // DSTU2
  }

  result.barcode = get(immunization, '_id', '');

  if(get(immunization, 'occurrenceDateTime')){
    result.date = moment(get(immunization, 'occurrenceDateTime')).format("YYYY-MM-DD");
  } else {
    result.date = moment(get(immunization, 'date')).format("YYYY-MM-DD");
  }
  result.reported = moment(get(immunization, 'reported', '')).format("YYYY-MM-DD");

  return result;
}


export function flattenList(list, extensionUrl){
  console.log('flattenList', list);
  
  let result = {
    _id: '',
    id: '',
    meta: '',
    identifier: '',
    status: '',
    mode: '',
    title: '',
    subjectDisplay: '',
    subjectReference: '',
    encounterDisplay: '',
    encounterReference: '',
    date: '',
    sourceDisplay: '',
    sourceReference: '',
    oderedByText: '',
    emptyReason: ''
  };


  result._id = get(list, '_id');
  result.id = get(list, 'id');
  result.identifier = get(list, 'identifier[0].value', '');
  result.status = get(list, 'status', '');
  result.mode = get(list, 'mode', '');
  result.title = get(list, 'title', '');
  result.subjectDisplay = get(list, 'subject.display', '');
  result.subjectReference = get(list, 'subject.reference', '');
  result.encounterDisplay = get(list, 'encounter.display', '');
  result.encounterReference = get(list, 'encounter.reference', '');
  result.date = get(list, 'date', '');
  result.sourceDisplay = get(list, 'source.display', '');
  result.sourceReference = get(list, 'source.reference', '');

  return result;
}

export function flattenLocation(location, simplifiedAddress, preferredExtensionUrl){
  console.log('flattenLocation', preferredExtensionUrl);
  
  let result = {
    _id: '',
    id: '',
    meta: '',
    identifier: '',
    name: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    type: '',
    latitude: '',
    longitude: '',
    selectedExtension: ''
  };

  result.severity = get(location, 'severity.text', '');

  if (get(location, '_id')){
    result._id = get(location, '_id');
  }
  if (get(location, 'name')) {
    result.name = get(location, 'name');
  }
  if (get(location, 'address')) {
    if(simplifiedAddress){
      result.address = FhirUtilities.stringifyAddress(get(location, 'address'), {noPrefix: true});
    } else {
      result.address = get(location, 'address');
    }
  }
  if (get(location, 'address.city')) {
    result.city = get(location, 'address.city');
  }
  if (get(location, 'address.state')) {
    result.state = get(location, 'address.state');
  }
  if (get(location, 'address.postalCode')) {
    result.postalCode = get(location, 'address.postalCode');
  }
  if (get(location, 'address.country')) {
    result.country = get(location, 'address.country');
  }
  if (get(location, 'type[0].text')) {
    result.type = get(location, 'type[0].text');
  }
  if (get(location, 'position.latitude')) {
    result.latitude = get(location, 'position.latitude', null);
  }
  if (get(location, 'position.longitude')) {
    result.longitude = get(location, 'position.longitude', null);
  }

  if (Array.isArray(get(location, 'extension'))) {

    let extensionIndex = findIndex(location.extension, {'url': preferredExtensionUrl});

    if(extensionIndex > -1){
      result.selectedExtension = location.extension[extensionIndex].valueDecimal.toString();
    }
  }

  return result;
}




export function flattenMeasure(measure, internalDateFormat){
  let result = {
    _id: '',
    id: '',
    meta: '',
    identifier: '',
    name: '',
    publisher: '',
    status: '',
    title: '',
    date: '',
    approvalDate: '',
    lastReviewDate: '',
    lastEdited: '',
    author: '',
    reviewer: '',
    endorser: '',
    scoring: '',
    type: '',
    riskAdjustment: '',
    rateAggregation: '',
    supplementalDataCount: '',
    context: '', 
    version: ''
  };

  if(!internalDateFormat){
    internalDateFormat = get(Meteor, "settings.public.defaults.internalDateFormat", "YYYY-MM-DD");
  }

  result._id =  get(measure, '_id');
  result.id = get(measure, 'id', '');
  result.identifier = get(measure, 'identifier[0].value', '');

  if(get(measure, 'lastReviewDate')){
    result.lastReviewDate = moment(get(measure, 'lastReviewDate', '')).format(internalDateFormat);
  }
  if(get(measure, 'approvalDate')){
    result.approvalDate = moment(get(measure, 'approvalDate', '')).format(internalDateFormat);
  }
  if(get(measure, 'date')){
    result.lastEdited = moment(get(measure, 'date', '')).format(internalDateFormat);
  }

  result.publisher = get(measure, 'publisher', '');
  result.name = get(measure, 'name', '');
  result.title = get(measure, 'title', '');
  result.description = get(measure, 'description', '');
  result.status = get(measure, 'status', '');
  result.version = get(measure, 'version', '');

  result.context = get(measure, 'useContext[0].valueCodeableConcept.text', '');

  result.editor = get(measure, 'editor[0].name', '');
  result.reviewer = get(measure, 'reviewer[0].name', '');
  result.endorser = get(measure, 'endorser[0].name', '');

  result.scoring = get(measure, 'scoring.coding[0].display', '');
  result.type = get(measure, 'type[0].coding[0].display', '');

  result.riskAdjustment = get(measure, 'riskAdjustment', '');
  result.rateAggregation = get(measure, 'rateAggregation', '');
  
  let supplementalData = get(measure, 'supplementalData', []);
  result.supplementalDataCount = supplementalData.length;

  let cohorts = get(measure, 'group[0].population', []);
  result.cohortCount = cohorts.length;


  return result;
}


export function flattenMeasureReport(measureReport, measuresCursor, internalDateFormat, measureShorthand, measureScoreType){
  let result = {
    _id: '',
    id: '',
    meta: '',
    identifier: '',
    type: '',
    measureUrl: '',
    measureTitle: '',
    date: '',
    subject: '',
    reporter: '',
    periodStart: '',
    periodEnd: '',
    groupCode: '',
    populationCode: '',
    populationCount: '',
    measureScore: '',
    stratifierCount: '',
    numerator: '',
    denominator: ''
  };

  if(!internalDateFormat){
    internalDateFormat = get(Meteor, "settings.public.defaults.internalDateFormat", "YYYY-MM-DD");
  }

  result._id = get(measureReport, '_id');
  result.id = get(measureReport, 'id', '');
  result.identifier = get(measureReport, 'identifier[0].value', '');
  result.type = get(measureReport, 'type', '');

  result.measureUrl = get(measureReport, 'measure', ''); 

  if(measuresCursor && result.measureUrl){
    let measure = measuresCursor.findOne({id: FhirUtilities.pluckReferenceId(result.measureUrl)});
    if(measureShorthand){
      result.measureTitle = get(measure, 'id');
    } else {
      result.measureTitle = get(measure, 'title');
    }
  }

  result.date = moment(get(measureReport, 'date', '')).format(internalDateFormat);
  if(get(measureReport, 'reporter.display', '')){
    result.reporter = get(measureReport, 'reporter.display', '');
  } else {
    result.reporter = FhirUtilities.pluckReferenceId(get(measureReport, 'reporter.reference', ''));
  }

  if(get(measureReport, 'subject.display', '')){
    result.subject = get(measureReport, 'subject.display', '');
  } else {
    result.subject = FhirUtilities.pluckReferenceId(get(measureReport, 'subject.reference', ''));
  }

  result.periodStart = moment(get(measureReport, 'period.start', '')).format(internalDateFormat);
  result.periodEnd = moment(get(measureReport, 'period.end', '')).format(internalDateFormat);

  result.groupCode = get(measureReport, 'group[0].coding[0].code', '');
  result.populationCode = get(measureReport, 'group[0].population[0].coding[0].code', '');
  result.populationCount = get(measureReport, 'group[0].population[0].count', '');

  if(get(measureReport, 'group[0].population')){
    let population = get(measureReport, 'group[0].population');
    population.forEach(function(pop){
      if(get(pop, 'code.text') === "numerator"){
        result.numerator = get(pop, 'count');
      }
      if(get(pop, 'code.text') === "denominator"){
        result.denominator = get(pop, 'count');        
      }
    })
  }

  if(has(measureReport, 'group[0].measureScore.value')){
    result.measureScore = get(measureReport, 'group[0].measureScore.value', '');
  } else if(has(measureReport, 'group[0].population')){
    if(Array.isArray(get(measureReport, 'group[0].population'))){
      measureReport.group[0].population.forEach(function(pop){
        if(Array.isArray(get(pop, 'code.coding'))){
          pop.code.coding.forEach(function(coding){
            if(coding.code === measureScoreType){
              result.measureScore = pop.count;
            }
          })
        }        
      })
    }
  }

  let stratifierArray = get(measureReport, 'group[0].stratifier', []);
  result.stratifierCount = stratifierArray.length;

  return result;
}



export function flattenMedicationOrder(medicationOrder, dateFormat){
  let result = {
    _id: '',
    id: '',
    status: '',
    identifier: '',
    patientDisplay: '',
    patientReference: '',
    prescriberDisplay: '',
    asserterDisplay: '',
    clinicalStatus: '',
    snomedCode: '',
    snomedDisplay: '',
    evidenceDisplay: '',
    barcode: '',
    dateWritten: '',
    dosageInstructionText: '',
    medicationCodeableConcept: '',
    medicationCode: '',
    dosage: ''
  };

  result._id = get(medicationOrder, '_id');
  result.id = get(medicationOrder, 'id', '');

  if(!dateFormat){
    dateFormat = get(Meteor, "settings.public.defaults.dateFormat", "YYYY-MM-DD");
  }

  if (get(medicationOrder, 'medicationReference.display')){
    result.medicationCodeableConcept = get(medicationOrder, 'medicationReference.display');
  } else if(get(medicationOrder, 'medicationCodeableConcept')){
    result.medicationCodeableConcept = get(medicationOrder, 'medicationCodeableConcept.text');
    result.medicationCode = get(medicationOrder, 'medicationCodeableConcept.coding[0].code');
  } 

  result.status = get(medicationOrder, 'status');
  result.identifier = get(medicationOrder, 'identifier[0].value');
  result.patientDisplay = get(medicationOrder, 'patient.display');
  result.patientReference = get(medicationOrder, 'patient.reference');
  result.prescriberDisplay = get(medicationOrder, 'prescriber.display');
  result.dateWritten = moment(get(medicationOrder, 'dateWritten')).format(dateFormat);
  
  result.dosage = get(medicationOrder, 'dosageInstruction[0].text');
  result.barcode = get(medicationOrder, '_id');

  return result;
}

export function flattenMedicationStatement(statement, fhirVersion){
  console.log('flattenMedicationStatement', statement)

  var result = {
    '_id': '',
    'id': '',
    'medication': '',
    'medicationReference': '',
    'medicationDisplay': '',
    'reasonCodeCode': '',
    'reasonCodeDisplay': '',
    'basedOn': '',
    'effectiveDateTime': '',
    'dateAsserted': '',
    'informationSource': '',
    'subjectDisplay': '',
    'taken': '',
    'reasonCodeDisplay': '',
    'dosage': '',
  };

  result._id = get(statement, '_id');
  result.id = get(statement, 'id', '');

  // DSTU2
  if(fhirVersion === "DSTU2"){
    result.subjectDisplay = get(statement, 'patient.display');
    result.medicationReference = get(statement, 'medicationReference.reference');
    result.medicationDisplay = get(statement, 'medicationReference.display');
    result.medicationCode = get(statement, 'medicationReference.display');
    result.reasonCode = get(statement, 'reasonForUseCodeableConcept.coding[0].code');
    result.reasonCodeDisplay = get(statement, 'reasonForUseCodeableConcept.coding[0].display');
    result.identifier = get(statement, 'identifier[0].value');
    result.effectiveDateTime = moment(get(statement, 'effectiveDateTime')).format("YYYY-MM-DD");
    result.dateAsserted = moment(get(statement, 'dateAsserted')).format("YYYY-MM-DD");
    result.informationSource = get(statement, 'supportingInformation[0].display');
    result.reasonCodeDisplay = get(statement, 'reasonForUseCodeableConcept.coding[0].display');  
  } else if(fhirVersion === "STU3"){
    result.subjectDisplay = get(statement, 'subject.display');
    result.medicationReference = get(statement, 'medicationReference.reference');
    result.medicationDisplay = get(statement, 'medicationReference.display');
    result.medicationCode = get(statement, 'medicationCodeableConcept.coding[0].display');
    result.identifier = get(statement, 'identifier[0].value');
    result.effectiveDateTime = moment(get(statement, 'effectiveDateTime')).format("YYYY-MM-DD");
    result.dateAsserted = moment(get(statement, 'dateAsserted')).format("YYYY-MM-DD");
    result.informationSource = get(statement, 'informationSource.display');
    result.taken = get(statement, 'taken');
    result.reasonCodeDisplay = get(statement, 'reasonCode[0].coding[0].display');  
  } else { // assume R4
    result.subjectDisplay = get(statement, 'subject.display');
    result.medicationReference = get(statement, 'medicationReference.reference');
    result.medicationDisplay = get(statement, 'medicationReference.display');
    result.medicationCode = get(statement, 'medicationCodeableConcept.coding[0].display');
    result.reasonCode = get(statement, 'reasonCode.coding[0].code');
    result.reasonCodeDisplay = get(statement, 'reasonCode.coding[0].display');
    result.identifier = get(statement, 'identifier[0].value');
    result.effectiveDateTime = moment(get(statement, 'effectiveDateTime')).format("YYYY-MM-DD");
    result.dateAsserted = moment(get(statement, 'dateAsserted')).format("YYYY-MM-DD");
    result.informationSource = get(statement, 'informationSource.display');    
  }

  return result;
}


export function flattenObservation(observation, dateFormat, numeratorCode, denominatorCode, multiComponentValues, sampledData){
  let result = {
    _id: '',
    meta: '',
    category: '',
    codeValue: '',
    codeDisplay: '',
    valueString: '',
    value: '',
    units: '',
    system: '',
    comparator: '',
    quantityCode: '',
    observationValue: '',
    subject: '',
    subjectReference: '',
    status: '',
    device: '',
    deviceReference: '',
    createdBy: '',
    effectiveDateTime: '',
    issued: '',
    unit: '',
    numerator: '',
    denominator: '',

    sampledPeriod: 0,
    sampledMin: 0,
    sampledMax: 0
  };

  if(!dateFormat){
    dateFormat = get(Meteor, "settings.public.defaults.dateFormat", "YYYY-MM-DD hh a");
  }

  result._id =  get(observation, 'id') ? get(observation, 'id') : get(observation, '_id');

  if(get(observation, 'category[0].text')){
    result.category = get(observation, 'category[0].text', '');
  } else if (get(observation, 'category[0].coding[0].display')){
    result.category = get(observation, 'category[0].coding[0].display', '');
  }

  if(Array.isArray(get(observation, 'code.coding'))){
    observation.code.coding.forEach(function(encoding){
      
      // don't display categorical codes
      if(!["8716-3"].includes(get(encoding, 'code'))){
        result.codeValue = get(encoding, 'code', '');
        if(has(encoding, 'display')){
          result.codeDisplay = get(encoding, 'display', '');
        } else {
          result.codeDisplay = get(observation, 'code.text', '');
        }
      }  
    })
  } else {
    result.codeValue = get(observation, 'code.text', '');
    result.codeDisplay = get(observation, 'code.text', '');
  }   

  
  result.subject = get(observation, 'subject.display', '');
  result.subjectReference = get(observation, 'subject.reference', '');
  result.device = get(observation, 'device.display', '');
  result.deviceReference = get(observation, 'device.reference', '');
  result.status = get(observation, 'status', '');
  
  if(get(observation, 'effectiveDateTime')){
    result.effectiveDateTime =  moment(get(observation, 'effectiveDateTime')).format(dateFormat);
  }
  if(get(observation, 'issued')){
    result.effectiveDateTime =  moment(get(observation, 'issued')).format(dateFormat);    
  }

  result.category = get(observation, 'category.text', '');


  // SINGLE COMPONENT OBSERVATIONS
  result.unit = get(observation, 'code.valueQuantity.unit');
  result.system = get(observation, 'code.valueQuantity.system');
  result.value = get(observation, 'code.valueQuantity.value');
  result.quantityCode = get(observation, 'code.valueQuantity.code');

  // MULTICOMPONENT OBSERVATIONS
  if(Array.isArray(get(observation, 'component'))){
    result.valueString = observation.component.length + ' samplesets / sec';
    result.units = 'components / sec';
    // sometimes observations have multiple components
    // a great example is blood pressure, which includes systolic and diastolic measurements
    observation.component.forEach(function(componentObservation){
      // we grab the numerator and denominator and put in separate fields
      if(get(componentObservation, 'code.coding[0].code') === numeratorCode){
        result.numerator = get(componentObservation, 'valueQuantity.value') + get(componentObservation, 'code.valueQuantity.unit')
      }
      if(get(componentObservation, 'code.coding[0].code') === denominatorCode){
        result.denominator = get(componentObservation, 'valueQuantity.value') + get(componentObservation, 'code.valueQuantity.unit')
      }
    })

    // and if it's multiComponentValue, we string it all together into a nice string to be displayed
    if(multiComponentValues){
      result.unit = get(observation, 'valueQuantity.unit', '');  
      result.valueString = result.numerator + " / " + result.denominator + " " +  result.unit;
    }
    if(sampledData){
      result.units = 'samples/sec';
      result.sampledPeriod = get(observation.component[0], 'valueSampledData.period', 0);
      result.sampledMin = get(observation.component[0], 'valueSampledData.lowerLimit', 0);
      result.sampledMax = get(observation.component[0], 'valueSampledData.upperLimit', 0);
      result.valueString = get(observation, 'valueSampledData.period', 0);

      if(has(observation.component[0], 'valueSampledData.data')){
        let sampledData = get(observation.component[0], 'valueSampledData.data');
        if(sampledData){
          let sampledDataArray = sampledData.split(" ")
          result.sampledChecksum = sampledDataArray.length;  
        }
      }
    }

  } else {
    // most observations arrive in a single component
    // some values are a string, such as Blood Type, or pos/neg
    if(get(observation, 'valueString')){
      result.valueString = get(observation, 'valueString', '');
    } else if(get(observation, 'valueCodeableConcept')){
      result.valueString = get(observation, 'valueCodeableConcept.text', '');
    } else if(get(observation, 'valueSampledData')){      
      result.units = 'samples/sec';
      result.sampledPeriod = get(observation, 'valueSampledData.period', 0);
      result.sampledMin = get(observation, 'valueSampledData.lowerLimit', 0);
      result.sampledMax = get(observation, 'valueSampledData.upperLimit', 0);
      result.valueString = get(observation, 'valueSampledData.period', 0);
    } else {
      // other values are quantities with units
      // we need to place the quantity bits in the appropriate cells
      result.comparator = get(observation, 'valueQuantity.comparator', '');
      result.observationValue = Number.parseFloat(get(observation, 'valueQuantity.value', 0)).toFixed(2);;
      result.unit = get(observation, 'valueQuantity.unit', '');  

      // but we also want to string it together into a nice readable string
      result.valueString = result.comparator + " " + result.observationValue + " " + result.unit;
    }
  }

  if(result.valueString.length > 0){
    result.value = result.valueString;
  } else {
    if(result.comparator){
      result.value = result.comparator + ' ';
    } 
    result.value = result.value + result.observationValue + ' ' + result.unit;
  }

  return result;
}

export function flattenOrganization(organization, internalDateFormat){
  let result = {
    _id: '',
    id: '',
    meta: '',
    name: '',
    identifier: '',
    phone: '',
    addressLine: '',
    text: '',
    city: '',
    state: '',
    postalCode: '',
    fullAddress: ''
  };

  result._id = get(organization, '_id', '');
  result.id = get(organization, 'id', '');
  result.identifier = get(organization, 'identifier[0].value', '');

  result.name = get(organization, 'name', '')

  result.phone = FhirUtilities.pluckPhone(get(organization, 'telecom'));
  result.email = FhirUtilities.pluckEmail(get(organization, 'telecom'));

  result.addressLine = get(organization, 'address[0].line[0]');
  result.city = get(organization, 'address[0].city');
  result.state = get(organization, 'address[0].state');
  result.postalCode = get(organization, 'address[0].postalCode');
  result.country = get(organization, 'address[0].country');

  result.fullAddress = FhirUtilities.stringifyAddress(get(organization, 'address[0]'));

  return result;
}

export function flattenPatient(patient, internalDateFormat){
  let result = {
    _id: '',
    id: '',
    meta: '',
    identifier: '',
    active: true,
    gender: get(patient, 'gender'),
    name: '',
    mrn: '',
    birthDate: '',
    photo: "/thumbnail-blank.png",
    addressLine: '',
    state: '',
    postalCode: '',
    country: '',
    maritalStatus: '',
    preferredLanguage: '',
    species: '',
    resourceCounts: '',
    deceased: false
  };

  result._id = get(patient, '_id', '');
  result.id = get(patient, 'id', '');
  result.identifier = get(patient, 'identifier[0].value', '');

  result.identifier = get(patient, 'identifier[0].value', '');
  result.active = get(patient, 'active', true).toString();
  
  result.gender = get(patient, 'gender', '');

  // patient name has gone through a number of revisions, and we need to search a few different spots, and assemble as necessary  
  let resultingNameString = "";

  let nameText = get(patient, 'name[0].text', '');
  if(nameText.length > 0){
    // some systems will store the name as it is to be displayed in the name[0].text field
    // if that's present, use it
    resultingNameString = get(patient, 'name[0].text', '');    
  } else {
    // the majority of systems out there are SQL based and make a design choice to store as 'first' and 'last' name
    // critiques of that approach can be saved for a later time
    // but suffice it to say that we need to assemble the parts

    if(get(patient, 'name[0].prefix[0]')){
      resultingNameString = get(patient, 'name[0].prefix[0]')  + ' ';
    }

    if(get(patient, 'name[0].given[0]')){
      resultingNameString = resultingNameString + get(patient, 'name[0].given[0]')  + ' ';
    }

    if(get(patient, 'name[0].family')){
      // R4 - droped the array of family names; one authoritative family name per patient
      resultingNameString = resultingNameString + get(patient, 'name[0].family')  + ' ';
    } else if (get(patient, 'name[0].family[0]')){
      // DSTU2 and STU3 - allows an array of family names
      resultingNameString = resultingNameString + get(patient, 'name[0].family[0]')  + ' ';
    }
    
    if(get(patient, 'name[0].suffix[0]')){
      resultingNameString = resultingNameString + ' ' + get(patient, 'name[0].suffix[0]');
    }
  }

  // remove any whitespace from the name
  result.name = resultingNameString.trim();

  // there's an off-by-1 error between momment() and Date() that we want
  // to account for when converting back to a string
  // which is why we run it through moment()
  result.birthDate = moment(get(patient, "birthDate")).format("YYYY-MM-DD")

  result.photo = get(patient, 'photo[0].url', '');

  result.maritalStatus = get(patient, 'maritalStatus.text', '');

  let communicationArray = [];
  if(get(patient, 'communication') && Array.isArray(get(patient, 'communication'))){
    communicationArray = get(patient, 'communication');
    // first, we're going to try to loop through the communications array 
    // and find an authoritatively preferred language
    communicationArray.forEach(function(communication){
      if(get(communication, "preferred")){
        if(get(communication, "text")){
          // using the text field if possible
          result.preferredLanguage = get(communication, "text");
        } else {
          // but resorting to a code name, if needed
          result.preferredLanguage = get(communication, "coding[0].display");
        }
      }
    })
    // if we didn't find any langauge that is marked as preferred 
    if(result.preferredLanguage === ""){
      // then we try the same thing on the first language listed
      if(get(communicationArray[0], "text")){
        result.preferredLanguage = get(communicationArray[0], "text");
      } else if (get(communicationArray[0], "coding[0].display")) {
        result.preferredLanguage = get(communicationArray[0], "coding[0].display")
      }
    }
  }


  // is the patient dead?  :(
  result.deceased = get(patient, 'deceasedBoolean', '');

  // DSTU2 & STU3 
  result.species = get(patient, 'animal.species.text', '');


  // address
  result.addressLine = get(patient, 'address[0].line[0]')
  result.state = get(patient, 'address[0].state')
  result.postalCode = get(patient, 'address[0].postalCode')
  result.country = get(patient, 'address[0].country')

  // console.log('flattened', result)
  return result;
}

export function flattenPractitioner(practitioner, fhirVersion){
  console.log('PractitionersTable.flattenPractitioner()', practitioner)

  let result = {
    _id: '',
    id: '',
    name: '',
    phone: '',
    email: '',
    qualificationIssuer: '',
    qualificationIdentifier: '',
    qualificationCode: '',
    qualificationStart: null,
    qualificationEnd: null,
    text: '',
    line: '',
    city: '',
    state: '',
    postalCode: '',
    fullName: ''
  };

  result._id = get(practitioner, '_id', '');
  result.id = get(practitioner, 'id', '');


    //---------------------------------------------------------
    // TODO REFACTOR:  HumanName
    // parse name!
    // totally want to extract this

    // STU3 and R4
    if(Array.isArray(practitioner.name)){
      if(get(practitioner, 'name[0].text')){
        result.name = get(practitioner, 'name[0].text');
      } else {
        if(get(practitioner, 'name[0].suffix[0]')){
          result.name = get(practitioner, 'name[0].suffix[0]')  + ' ';
        }
    
        result.name = result.name + get(practitioner, 'name[0].given[0]') + ' ';
        
        if(get(practitioner, 'name[0].family[0]')){
          result.name = result.name + get(practitioner, 'name[0].family[0]');
        } else {
          result.name = result.name + get(practitioner, 'name[0].family');
        }
        
        if(get(practitioner, 'name[0].suffix[0]')){
          result.name = result.name + ' ' + get(practitioner, 'name[0].suffix[0]');
        }
      } 
    } else {
      // DSTU2
      if(get(practitioner, 'name.text')){
        result.name = get(practitioner, 'name.text');
      } else {
        if(get(practitioner, 'name.suffix[0]')){
          result.name = get(practitioner, 'name.suffix[0]')  + ' ';
        }
    
        result.name = result.name + get(practitioner, 'name.given[0]') + ' ';
        
        if(get(practitioner, 'name.family[0]')){
          result.name = result.name + get(practitioner, 'name.family[0]');
        } else {
          result.name = result.name + get(practitioner, 'name.family');
        }
        
        if(get(practitioner, 'name.suffix[0]')){
          result.name = result.name + ' ' + get(practitioner, 'name.suffix[0]');
        }
      } 
    }
  
  //---------------------------------------------------------

  if(has(practitioner, 'qualification[0]')){
    result.qualificationId = get(practitioner, 'qualification[0].identifier[0].value');
    result.qualificationCode = get(practitioner, 'qualification[0].code.coding[0].code');
    result.qualificationStart = moment(get(practitioner, 'qualification[0].period.start')).format("MMM YYYY");
    result.qualificationEnd = moment(get(practitioner, 'qualification[0].period.end')).format("MMM YYYY");
    result.issuer = get(practitioner, 'qualification[0].issuer.display');  
  }

  // TODO REFACTOR:  ContactPoint
  // totally want to extract this
  if(Array.isArray(practitioner.telecom)){
    let telecomArray = get(practitioner, 'telecom');
    telecomArray.forEach(function(telecomRecord){
      if(get(telecomRecord, 'system') === 'phone'){
        result.phone = get(telecomRecord, 'value');
      }
      if(get(telecomRecord, 'system') === 'email'){
        result.email = get(telecomRecord, 'value');
      }
    })
  }

  result.text = get(practitioner, 'address[0].text', '')
  result.line = get(practitioner, 'address[0].line[0]', '')
  result.city = get(practitioner, 'address[0].city', '')
  result.state = get(practitioner, 'address[0].state', '')
  result.postalCode = get(practitioner, 'address[0].postalCode', '')

  if(has(practitioner, 'name[0]')){
    result.fullName = FhirUtilities.assembleName(get(practitioner, 'name[0]'))
  }

  return result;
}


export function flattenProcedure(procedure, internalDateFormat){
  let result = {
    _id: '',
    id: '',
    meta: '',
    identifier: '',
    status: '',
    categoryDisplay: '',
    code: '',
    codeDisplay: '',
    subject: '',
    subjectReference: '',
    performerDisplay: '',
    performedStart: '',
    performedEnd: '',
    notesCount: '',
    bodySiteDisplay: ''
  };

  if(!internalDateFormat){
    internalDateFormat = "YYYY-MM-DD";
  }

  result._id = get(procedure, '_id');
  result.id = get(procedure, 'id', '');
  
  result.status = get(procedure, 'status', '');
  result.categoryDisplay = get(procedure, 'category.coding[0].display', '');
  result.identifier = get(procedure, 'identifier[0].value');
  result.code = get(procedure, 'code.coding[0].code');
  result.codeDisplay = get(procedure, 'code.coding[0].display');
  result.categoryDisplay = get(procedure, 'category.coding[0].display')    

  if(get(procedure, 'subject')){
    result.subject = get(procedure, 'subject.display', '');
    result.subjectReference = get(procedure, 'subject.reference', '');
  } else if(get(procedure, 'patient')){
    result.subject = get(procedure, 'patient.display', '');
    result.subjectReference = get(procedure, 'patient.reference', '');
  }

  result.performedStart = moment(get(procedure, 'performedDateTime')).format(internalDateFormat);      
  result.performerDisplay = get(procedure, 'performer.display');
  result.performerReference = get(procedure, 'performer.reference');
  result.bodySiteDisplay = get(procedure, 'bodySite.display');

  if(get(procedure, 'performedPeriod')){
    result.performedStart = moment(get(procedure, 'performedPeriod.start')).format(internalDateFormat);      
    result.performedEnd = moment(get(procedure, 'performedPeriod.end')).format(internalDateFormat);      
  }

  let notes = get(procedure, 'notes')
  if(notes && notes.length > 0){
    result.notesCount = notes.length;
  } else {
    result.notesCount = 0;
  }

  return result;
}

export function flattenQuestionnaire(questionnaire){
  let result = {
    _id: get(questionnaire, '_id'),
    id: get(questionnaire, 'id'),
    identifier: '',
    title: '',
    state: '',
    date: '',
    numItems: 0
  };

  result.id = get(questionnaire, 'id', '');

  result.date = moment(questionnaire.date).add(1, 'days').format("YYYY-MM-DD")
  result.title = get(questionnaire, 'title', '');
  result.status = get(questionnaire, 'status', '');
  result.identifier = get(questionnaire, 'identifier[0].value', '');

  if(Array.isArray(questionnaire.item)){
    result.numItems = questionnaire.item.length;
  }
  
  return result;
}

export function flattenQuestionnaireResponse(questionnaireResponse){
  let result = {
    _id: get(questionnaireResponse, '_id'),
    id: get(questionnaireResponse, 'id'),
    title: '',
    identifier: '',
    questionnaire: '',
    status: '',
    subjectDisplay: '',
    subjectReference: '',
    sourceDisplay: '',
    sourceReference: '',
    encounter: '',
    author: '',
    date: '',
    count: 0,
    numItems: 0,
    authored: ''
  };


  // there's an off-by-1 error between momment() and Date() that we want
  // to account for when converting back to a string
  result.date = moment(questionnaireResponse.authored).add(1, 'days').format("YYYY-MM-DD HH:mm")
  result.questionnaire = get(questionnaireResponse, 'questionnaire', '');
  result.encounter = get(questionnaireResponse, 'encounter.reference', '');
  result.subjectDisplay = get(questionnaireResponse, 'subject.display', '');
  result.subjectReference = get(questionnaireResponse, 'subject.reference', '');
  result.sourceDisplay = get(questionnaireResponse, 'source.display', '');
  result.sourceReference = get(questionnaireResponse, 'source.reference', '');
  result.author = get(questionnaireResponse, 'author.display', '');
  result.identifier = get(questionnaireResponse, 'identifier.value', '');
  result.status = get(questionnaireResponse, 'status', '');
  result.id = get(questionnaireResponse, 'id', '');
  result.identifier = get(questionnaireResponse, 'identifier[0].value', '');

  if(has(questionnaireResponse), 'authored'){
    result.authored = moment(get(questionnaireResponse, 'authored')).format("YYYY-MM-DD HH:mm");
  }

  if(Array.isArray(questionnaireResponse.item)){
    result.count = result.numItems = questionnaireResponse.item.length;
  }
  
  return result;
}


export function flattenTask(task, internalDateFormat){
  let result = {
    _id: '',
    meta: '',
    identifier: '',
    publisher: '',
    status: '',
    title: '',
    authoredOn: '',
    lastModified: '',
    focus: '',
    for: '',
    intent: '',
    code: '',
    requester: '',
    requesterReference: '',
    encounter: '',
    encounterReference: '',
    owner: '',
    ownerReference: ''
  };

  if(!internalDateFormat){
    internalDateFormat = get(Meteor, "settings.public.defaults.internalDateFormat", "YYYY-MM-DD");
  }

  result._id =  get(task, 'id') ? get(task, 'id') : get(task, '_id');
  result.id = get(task, 'id', '');
  result.identifier = get(task, 'identifier[0].value', '');

  if(get(task, 'authoredOn')){
    result.authoredOn = moment(get(task, 'authoredOn', '')).format(internalDateFormat);
  }
  if(get(task, 'lastModified')){
    result.lastModified = moment(get(task, 'lastModified', '')).format(internalDateFormat);
  }

  result.description = get(task, 'description', '');
  result.status = get(task, 'status', '');
  result.businessStatus = get(task, 'businessStatus.coding[0].display', '');
  result.intent = get(task, 'intent', '');
  result.focus = get(task, 'focus.display', '');
  result.for = get(task, 'for.display', '');
  result.requester = get(task, 'requester.display', '');
  result.code = get(task, 'code.text', '');

  result.requester = get(task, 'requester.display', '');
  result.requesterReference = get(task, 'requester.reference', '');
  result.encounter = get(task, 'encounter.display', '');
  result.encounterReference = get(task, 'encounter.reference', '');
  result.owner = get(task, 'owner.display', '');
  result.ownerReference = get(task, 'owner.reference', '');

  return result;
}


export function flattenValueSet(valueSet, internalDateFormat){
  let result = {
    _id: '',
    meta: '',
    identifier: '',
    title: '',
  };

  if(!internalDateFormat){
    internalDateFormat = get(Meteor, "settings.public.defaults.internalDateFormat", "YYYY-MM-DD");
  }

  result._id =  get(valueSet, 'id') ? get(valueSet, 'id') : get(valueSet, '_id');
  result.id = get(valueSet, 'id', '');
  result.identifier = get(valueSet, 'identifier[0].value', '');
  result.title = get(valueSet, 'title', '');


  return result;
}



export function flatten(collectionName, resource){
  console.log('Flattening record ' + resource.id + ' from the ' + collectionName + ' collection.');
  
  let notImplementedMessage = {text: "Not implemented  ."};
  switch (collectionName) {
    case "AllergyIntollerances":
      return flattenAllergyIntolerance(resource);
    case "Bundles":
      return flattenBundle(resource);
    case "CarePlans":
      return flattenCarePlan(resource);
    case "Conditions":
      return flattenCondition(resource);
    case "Consents":
      return notImplementedMessage;
    case "Claims":
      return notImplementedMessage;
    case "ClinicalDocuments":
      return notImplementedMessage;
    case "Communications":
      return flattenCommunication(resource);
    case "CommunicationResponses":
      return flattenCommunicationResponse(resource);
    case "CommunicationRequests":
      return flattenCommunicationRequest(resource);
    case "Contracts":
      return notImplementedMessage;
    case "ClinicalImpressionss":
      return notImplementedMessage;
    case "Communications":
      return flattenCommunication(resource)
    case "Devices":
      return flattenDevice(resource);
    case "DiagnosticReports":
      return flattenDiagnosticReport(resource);
    case "DocumentReference":
      return flattenDocumentReference(resource);
    case "Encounters":
      return flattenEncounter(resource);
    case "Goals":
      return notImplementedMessage;          
    case "Immunizations":
      return flattenImmunization(resource);          
    case "ImagingStudies":
      return notImplementedMessage;     
    case "Lists":
      return flattenList(resource);   
    case "Locations":
      return flattenLocation(resource);
    case "HospitalLocations":
      return flattenLocation(resource);
    case "Measures":
      return flattenMeasure(resource);
    case "MeasureReports":
      return flattenMeasureReport(resource);
    case "Medications":
      return notImplementedMessage;    
    case "MedicationOrders":
      return flattenMedicationOrder(resource);
    case "MedicationStatements":
      return dehydrateMedicationStatement(resource);
    case "MedicationRequests":
      return notImplementedMessage;     
    case "Observations":
      return flattenObservation(resource);
    case "Organizations":
      return flattenOrganization(resource);
    case "Patients":
      return flattenPatient(resource);
    case "Persons":
      return notImplementedMessage;        
    case "Practitioners":
      return flattenPractitioner(resource);
    case "Procedures":
      return flattenProcedure(resource);
    case "Questionnaires":
      return flattenQuestionnaire(resource);     
    case "QuestionnaireResponses":
      return flattenQuestionnaireResponse(resource);     
    case "RiskAssessments":
      return notImplementedMessage;     
    case "Sequences":
      return notImplementedMessage;     
    case "Tasks":
      return flattenTask(resource);
    case "ValueSets":
      return flattenValueSet(resource);
    default:
      break;
  }
}

export const FhirDehydrator = {
  dehydrateAllergyIntolerance: flattenAllergyIntolerance,
  dehydrateBundle: flattenBundle,
  dehydrateCarePlan: flattenCarePlan,
  dehydrateComposition: flattenComposition,
  dehydrateCommunication: flattenCommunication,
  dehydrateCommunicationRequest: flattenCommunicationRequest,
  dehydrateCommunicationResponse: flattenCommunicationResponse,
  dehydrateCondition: flattenCondition,
  dehydrateDevice: flattenDevice,
  dehydrateDiagnosticReport: flattenDiagnosticReport,
  dehydrateDocumentReference: flattenDocumentReference,
  dehydrateEncounter: flattenEncounter,
  dehydrateList: flattenList,
  dehydrateLocation: flattenLocation,
  dehydrateImmunization: flattenImmunization,
  dehydrateMeasureReport: flattenMeasureReport,
  dehydrateMeasure: flattenMeasure,
  dehydrateMedicationOrder: flattenMedicationOrder,
  dehydrateMedicationStatement: flattenMedicationStatement,
  dehydrateObservation: flattenObservation,
  dehydrateOrganization: flattenOrganization,
  dehydratePatient: flattenPatient,
  dehydratePractitioner: flattenPractitioner,
  dehydrateProcedure: flattenProcedure,
  dehydrateQuestionnaire: flattenQuestionnaire,
  dehydrateQuestionnaireResponse: flattenQuestionnaireResponse,
  dehydrateTask: flattenTask,
  dehydrateValueSet: flattenValueSet,
  flatten: flatten
}

export default {
  FhirDehydrator,
  flattenAllergyIntolerance,
  flattenBundle,
  flattenCarePlan,
  flattenComposition,
  flattenCondition,
  flattenCommunication,
  flattenCommunicationRequest,
  flattenCommunicationResponse,
  flattenDevice,
  flattenDiagnosticReport,
  flattenDocumentReference,
  flattenEncounter,
  flattenImmunization,
  flattenList,
  flattenLocation,
  flattenMeasureReport,
  flattenMeasure,
  flattenMedicationOrder,
  flattenMedicationStatement,
  flattenObservation,
  flattenOrganization,
  flattenPatient,
  flattenPractitioner,
  flattenProcedure,
  flattenQuestionnaire,
  flattenQuestionnaireResponse,
  flattenTask,
  flattenValueSet,
  flatten
}

