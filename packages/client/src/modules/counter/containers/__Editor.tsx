// import * as ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export class Editor extends Component {
  constructor(props) {
    super(props);

    state = { value: null };

    // if (document) {
    //
    //   this.ReactQuill = require('react-quill');
    // }
  }

  public componentDidMount() {
    this.setState({ value: '' });
    // this.ReactQuill = require('react-quill');
  }

  public render() {
    // const ReactQuill = this.ReactQuill;

    return <p>Yo</p>;
    // if (this.state.value != null && ReactQuill) {
    //   return <ReactQuill onChange={this.props.onChange} value={this.props.value} />;
    // } else {
    //   return <textarea />;
    // }
  }
}

export default Editor;
