import React from 'react';
import { getStorage, ref, uploadBytes,getDownloadURL  } from "firebase/storage";
import './UploadFile.css';


class UploadFile extends React.Component {
    constructor(props) {
      super(props);
      this.state = {previewImg:null};
      if(this.props.preview){
        this.state = {previewImg:this.props.preview};
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.fileInput = React.createRef();
      this.handleFileSelection = this.handleFileSelection.bind(this);
    }

    handleFileSelection(event){
      let previewURL = URL.createObjectURL(event.target.files[0]);
      this.setState({previewImg: previewURL});
    }

    handleSubmit(event) {
      event.preventDefault();
      const storage = getStorage();
      let userId = localStorage.getItem("user");
      const storageRef = ref(storage, userId + Date.now().toString() + '.jpg');
      // 'file' comes from the Blob or File API
    uploadBytes(storageRef, this.fileInput.current.files[0]).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
            this.props.onImageUploaded(downloadURL);
            alert('Foto cargada con éxito');
        });
        
  });
    }
  
    render() {
        const preview = this.state.previewImg != null ? <img src={this.state.previewImg} className="imgPreview" alt="ProductImg"/> : <span/>;
      return (
        <form onSubmit={this.handleSubmit}>
            <div className="imgSection">
            {preview}
            </div>
          <label>
            Selecciona una foto del producto:  
            <input type="file" accept="image/jpeg" ref={this.fileInput} onChange={this.handleFileSelection}/>
          </label>
          <br />
          <button type="submit">Subir</button>
        </form>
      );
    }
  }
  export default UploadFile;