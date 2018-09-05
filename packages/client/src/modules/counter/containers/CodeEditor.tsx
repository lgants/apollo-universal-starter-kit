import React from 'react';
import AceEditor from 'react-ace';
// import * as ace from 'brace';

export const CodeEditor = () => {
  if (typeof window !== 'undefined') {
    /* tslint:disable */
    var brace = require('brace');
    // var { AceEditor } = require('brace');
    require('brace/mode/java');
    require('brace/mode/javascript');
    require('brace/theme/github');
    require('brace/theme/monokai');
    /* tslint:enable */
  }
  return (
    <AceEditor
      mode="python"
      theme="github"
      onChange={() => {}}
      name="UNIQUE_ID_OF_DIV"
      enableBasicAutocompletion={true}
      enableLiveAutocompletion={true}
    />
  );
};

// editorProps={{ $blockScrolling: true }}

export default CodeEditor;
