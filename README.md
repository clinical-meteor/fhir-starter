## [material-fhir-ui](http://clinical.meteorapp.com)  
[![npm package](https://img.shields.io/npm/v/material-ui.svg?style=flat-square)](https://www.npmjs.org/package/material-ui)

Material-FHIR UI is a set of [React](http://facebook.github.io/react/) components that implement [HL7 FHIR Resources](https://www.hl7.org/fhir/resourcelist.html) using
[Google's Material Design](https://www.google.com/design/spec/material-design/introduction.html)
specification.  It is intended as an extension to the [Material UI](http://www.material-ui.com/) component library.  

We intend to track normative level resources only; which as of R4 are primarily the Patient and Observation tables and detail cards.  Stay tuned for R5 though!    

If you're interested in non-normative resources, feel free to peruse the `/client/react` directories of any of the `hl7-resource-*` repositories in the [clinical-meteor](https://github.com/clinical-meteor) organization.  



## Prerequisites

[Fast Healthcare Interoperatbility Resources](https://www.hl7.org/fhir/resourcelist.html)  
[Material - User Interface](http://material-ui.com/#/get-started/prerequisites)  
[Semantically Awesome Style Sheets](http://sass-lang.com/)  
[React - Component Rendering](http://facebook.github.io/react/)  

## Installation

Material-FHIR-UI is available as an [npm package](https://www.npmjs.org/package/material-ui).

```sh
npm install material-fhir-ui
```

To save the package to your Meteor app's `package.json` file, run the following:
```sh
meteor npm install --save material-fhir-ui
```


### Roboto Font

Material-UI was designed with the [Roboto](http://www.google.com/fonts/specimen/Roboto)
font in mind. So be sure to include it in your project. Here are
[some instructions](http://www.google.com/fonts#UsePlace:use/Collection:Roboto:400,300,500)
on how to do so.

<!-- ## FHIR API  

- [Patient](./api.Patient.md)   
- [Observation](./api.Observation.md)   -->

## Theming  

Material-FHIR-UI components require a theme to be provided. The quickest way to get up and running is by using the `MuiThemeProvider` to inject the theme into your application context. Following that, you can to use any of the components as demonstrated in the documentation. Here is a quick example to get you started:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyAwesomeReactComponent from './MyAwesomeReactComponent';

import { PatientCard } from 'material-fhir-ui';

const App = () => (
  <MuiThemeProvider>
    <PatientCard />
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```

**Patient Table Example**
```jsx
import React from 'react';
import { PatientTable } from 'material-fhir-ui';

const MyFhirWorkflowComponent = () => (
  <div>
    <PatientTable 
      noDataMessagePadding={100}
      patients={ Patients.find().fetch() }
      paginationLimit={ t100 }
      appWidth={ Session.get('appWidth') }
      actionButtonLabel="Send"
      onRowClick={ function(patientId){ 
        Session.set('selectedPatientId', patientId);
      }}
      />
      <hr />
      <PatientDetail 
        id='patientDetails' 
        fhirVersion="3.0.1"
        patient={ Patients.findOne("").fetch() }
        patientId={ this.data.selectedPatientId }
        onDelete={ function(patientId){
          Patients.remove({_id: patientId})
        }}
        onUpsert={ function(context){          
          let newPatient = context.state.patient;
          newPatient.resourceType = "Patient";
          Patients.insert(newPatient)      
        }}
        onCancel={ this.onCancelUpsertPatient } 
      />
  </div>
);

export default MyFhirWorkflowComponent;
```

Please refer to each component's documentation page to see how they should be imported.

## Currently Supported Api      

[PatientTable](./fhir-components/patients/PatientTable.jsx)    
[PatientDetail](./fhir-components/patients/PatientDetail.jsx)    



## Examples

Please see the [meteor-on-fhir](https://github.com/clinical-meteor/meteor-on-fhir) boilerplate for a base build of using Material FHIR components.


## License
This project is licensed under the terms of the
[MIT license](https://github.com/callemall/material-ui/blob/master/LICENSE)

