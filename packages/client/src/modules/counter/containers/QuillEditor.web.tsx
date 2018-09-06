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

  public handleChange(value: any) {
    this.setState({ text: value });
  }

  public render() {
    const ReactQuill = this.ReactQuill;
    const modules = {
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'code', 'image'],
        ['clean']
      ]
    };

    const formats = [
      'header',
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'list',
      'bullet',
      'indent',
      'link',
      'image'
    ];

    if (ReactQuill) {
      return <ReactQuill onChange={this.handleChange} value={this.state.value} modules={modules} formats={formats} />;
    } else {
      return <textarea />;
    }
  }
}

export default QuillEditor;
