import React, { Component, useEffect, useState } from "react";
import { MdInsertDriveFile } from "react-icons/md";
import { distanceInWords } from "date-fns";
import pt from "date-fns/locale/pt";
import DropZone from "react-dropzone";
import socket from "socket.io-client";

import "./styles.css";

import api from "../../services/api";

// function Box(props) {
//   const [box, setBox] = useState({});
//   const [boxId, setBoxId] = useState(props.match.params.id);

//   useEffect(() => {
//     getBoxData();
//   }, []);

//   useEffect(() => {
//     subscribeToNewFiles();
//   }, [box]);

//   function subscribeToNewFiles() {
//     const io = socket("http://localhost:3333");

//     io.emit("connectRoom", boxId);
//     io.on("file", data => {
//       if (box.files) {
//         const newBox = { ...box, files: [data, ...box.files] };

//         setBox(newBox);
//       }
//     });
//   }

//   async function getBoxData() {
//     const response = await api.get(`/api/box/${boxId}`);

//     setBox(response.data.box);
//   }

//   function renderDropZone() {
//     return ({ getRootProps, getInputProps }) => (
//       <div className="upload" {...getRootProps()}>
//         <input {...getInputProps()} />

//         <p>Arraste arquivos ou clique aqui!</p>
//       </div>
//     );
//   }

//   function renderBoxes() {
//     if (box.files && box.files.length > 0) {
//       return box.files.map(file => {
//         return (
//           <li key={file._id}>
//             <a className="fileInfo" href={file.url} target="_blank">
//               <MdInsertDriveFile size={24} color="#A5CFFF" />
//               <strong>{file.title}</strong>
//             </a>

// <span>
//   Há{" "}
//   {distanceInWords(file.createdAt, new Date(), {
//     locale: pt
//   })}
// </span>
//           </li>
//         );
//       });
//     } else {
//       return (
//         <li
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center"
//           }}
//         >
//           Não há arquivos nesse box!
//         </li>
//       );
//     }
//   }

//   function handleUpload(files) {
//     files.forEach(file => {
//       const data = new FormData();

//       data.append("file", file);

//       api.post(`/api/file/${boxId}/files`, data);
//     });
//   }

//   return (
//     <div id="box-container">
//       <header>
//         <img src="" alt="" />
//         <h1>{box.title}</h1>
//       </header>

//       <DropZone onDropAccepted={handleUpload}>{renderDropZone()}</DropZone>

//       <ul>{renderBoxes()}</ul>
//     </div>
//   );
// }

// export default Box;

export default class Box extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boxId: this.props.match.params.id,
      box: {}
    };
  }

  componentDidMount = async () => {
    this.subscribeToNewFiles();

    const response = await api.get(`/boxes/${this.state.boxId}`);

    this.setState({ box: response.data });
  };

  subscribeToNewFiles = () => {
    const io = socket("http://localhost:3333");

    io.emit("connectRoom", this.state.boxId);

    io.on("file", data => {
      this.setState({
        box: { ...this.state.box, files: [data, ...this.state.box.files] }
      });
    });
  };

  handleUpload = files => {
    files.forEach(file => {
      const data = new FormData();

      data.append("file", file);

      api.post(`/boxes/${this.state.boxId}/files`, data);
    });
  };

  render() {
    const { box } = this.state;
    return (
      <div id="box-container">
        <header>
          <img src="" alt="" />
          <h1>{box.title}</h1>
        </header>

        <DropZone onDropAccepted={this.handleUpload}>
          {({ getRootProps, getInputProps }) => (
            <div className="upload" {...getRootProps()}>
              <input {...getInputProps()} />

              <p>Arraste arquivos ou clique aqui!</p>
            </div>
          )}
        </DropZone>
        <ul>
          {box.files &&
            box.files.map(file => (
              <li key={file._id}>
                <a className="fileInfo" href={file.url} target="_blank">
                  <MdInsertDriveFile size={24} color="#A5CFFF" />
                  <strong>{file.title}</strong>
                </a>

                <span>
                  Há{" "}
                  {distanceInWords(file.createdAt, new Date(), {
                    locale: pt
                  })}
                </span>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
