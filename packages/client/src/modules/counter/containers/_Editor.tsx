// import * as ReactQuill from 'react-quill'
// import 'react-quill/dist/quill.snow.css';
//
// class Editor extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = { text: '', editor: null } // You can also pass a Quill Delta here
//     this.handleChange = this.handleChange.bind(this)
//   }
//
//   public componentDidMount() {
//     this.setState({ editor: ReactQuill });
//   }
//
//   public handleChange(value) {
//     this.setState({ text: value })
//   }
//
//
//   public render() {
//     const ClientEditor = this.state.editor;
//
//     return (
//       <div>
//         {this.state.editor ? (
//           <ClientEditor
//             value={this.state.text}
//             onChange={this.handleChange}
//           />
//         ) : null}
//       </div>
//     )
//   }
// }
//
// export default Editor;
