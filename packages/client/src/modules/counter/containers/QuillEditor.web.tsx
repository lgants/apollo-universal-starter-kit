import React from 'react';
import 'react-quill/dist/quill.snow.css';

export class QuillEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: null };

    this.ReactQuill = null;
  }

  public componentDidMount() {
    this.setState({ value: '' });
    this.ReactQuill = require('react-quill');
  }

  public render() {
    const ReactQuill = this.ReactQuill;

    if (ReactQuill) {
      return <ReactQuill onChange={() => {}} value={this.state.value} />;
    } else {
      return <textarea />;
    }
  }
}

export default QuillEditor;
