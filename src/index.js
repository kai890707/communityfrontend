import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import PageEditor from './Editor/Layout';

// import { Editor } from 'react-draft-wysiwyg'; import
// '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'; const
// TEMPLATEROUTE = R.map((template,index) => {     return (          <Route
// path={template.path} exact component={template.component}/>       );   })
ReactDOM.render(
    <App/>, document.getElementById('root'));
// If you want to start measuring performance in your app, pass a function to
// log results (for example: reportWebVitals(console.log)) or send to an
// analytics endpoint. Learn more: https://bit.ly/CRA - vitals reportWebVitals();