## [fhir-starter](http://clinical.meteorapp.com)  
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

fhir-starter is available as an [npm package](https://www.npmjs.org/package/material-ui).

```sh
npm install fhir-starter
```

To save the package to your Meteor app's `package.json` file, run the following:
```sh
meteor npm install --save fhir-starter winston
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

fhir-starter components require a theme to be provided. The quickest way to get up and running is by using the `MuiThemeProvider` to inject the theme into your application context. Following that, you can to use any of the components as demonstrated in the documentation. Here is a quick example to get you started:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyAwesomeReactComponent from './MyAwesomeReactComponent';

import { PatientCard } from 'fhir-starter';

import {
  MuiThemeProvider,
  makeStyles,
  createMuiTheme,
} from '@material-ui/core/styles';


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
import { PatientsTable } from 'fhir-starter';

const MyFhirWorkflowComponent = () => (
  <div>
    <PatientsTable 
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

## Component Demos and API Examples      

[PatientCard](https://codesandbox.io/s/material-ui-on-fhir-demo-e9vc0)     
[PatientsTable](https://codesandbox.io/s/PatientsTable-ks1k8)    
[PatientDetail](https://codesandbox.io/s/patientdetail-q4r34)     

[ObservationTable](https://codesandbox.io/s/observationtable-tpi8v)     


## Logging  
Material FHIR UI has a peer dependency on the `winston` library.  The idea is that we wanted to slowly migrate away from using `console.log` messages.  While widely supported, they cause security and performance problems.  Our general approach in this refactor has been to attach the winston `logger` object on the global window scope, in essentially the same place that `console` is located.  The idea is that if the code could do a `console.log` it will also be able to do a `logger.log`.  Which begins our refactor.  Eventually, we plan on passing the `logger` object down through the render tree via the `props` object.  

```js

  // if you don't use winston, or otherwise wish to simply disable logging, 
  // attach the following to the global scope
  window.logger = {
    error: function(){},
    warn: function(){},
    info: function(){},
    verbose: function(){},
    debug: function(){},
    trace: function(){},
    data: function(){},
    log: function(){}
  }

  // otherwise, we import the necessary objects form winston
  import { createLogger, addColors, format, transports, config } from 'winston';

   // lets create a global logger
   const logger = createLogger({
    level: get(Meteor, 'settings.public.loggingThreshold') ,
    levels: {
      error: 0, 
      warn: 1, 
      info: 2, 
      verbose: 3, 
      debug: 4, 
      trace: 5, 
      data: 6 
    },
    transports: [
      new transports.Console({
        colorize: true,
        format: format.combine(
          hideDataLogLevel(),
          format.colorize(),
          format.simple(),
          format.splat(),
          format.timestamp()
        )
      })
    ],
    exitOnError: false
  });

  // introspection for the win
  logger.info('Starting the Winston Logging Service');
  logger.data('Winston Logging Service', {data: logger}, {source: "AppContainer.jsx"});

  // attaching to the global scope is not generally recommended
  // logging is one debatable exception to the general rule, however
  window.logger = global.logger = logger;
```

## License
This project is licensed under the terms of the
[MIT license](https://github.com/callemall/material-ui/blob/master/LICENSE)

## Conbtributing  
If you would like to develop more FHIR components using this pattern, please take a look at the [material-fhir-demo], which is the minimalist Meteor rig we use to build these components.  We intend to move towards Chromatic and Storybook in the future.  

https://github.com/meteor/chromatic/  
https://storybook.js.org/  
https://github.com/clinical-meteor/material-fhir-demo  


## Development  

```js
// LOCAL DEVELOPMENT
git clone https://github.com/clinical-meteor/fhir-starter packages/fhir-starter
meteor npm link packages/fhir-starter

cd packages/fhir-starter

yarn add rollup rollup-plugin-terser rollup-plugin-typescript2 typescript rollup-plugin-babel rollup-plugin-commonjs rollup-plugin-node-resolve rollup-plugin-replace rollup-plugin-progress @babel/core @babel/preset-env --only=dev 


// bump the fhir-starter/package.json version number
nano package.json

// bump the application's dependency on fhir-starter
nano ../../package.json

// get rollup working
yarn rollup --config rollup.config.js

// once you get the above working, use --watch to automatically recompile on file change
yarn rollup --config --watch


// resync
// sometimes you need to resync the package
yarn rollup --config
meteor reset
rm -rf node_modules
meteor npm install
meteor npm link packages/fhir-starter
```

## Deployment

- [How I set-up a React component library with Rollup](https://medium.com/grandata-engineering/how-i-set-up-a-react-component-library-with-rollup-be6ccb700333)- [Building and publishing a module with typescript and rollup.js](https://hackernoon.com/building-and-publishing-a-module-with-typescript-and-rollup-js-faa778c85396)  
- [Publishing an NPM package with rollup and babel](https://www.grzegorowski.com/publishing-npm-package-with-rollup-babel-and/)  
- [How to publish a JS library to NPM with rollup and typescript](https://medium.com/@ali.dev/how-to-publish-a-js-library-to-npm-with-rollup-typescript-8b51ede8f562)     
- [The crucial tool for modern frontend engineers](https://blog.hichroma.com/the-crucial-tool-for-modern-frontend-engineers-fb849b06187a)    

```js
cd packages/fhir-starter
rm -rf node_modules

npm update


// typical rollupt
yarn rollup --config

npm login

npm publish
```

## Other References

- [Design Systems for Developers](https://www.learnstorybook.com/design-systems-for-developers/?utm_source=discover-meteor&utm_medium=email&utm_campaign=launch)