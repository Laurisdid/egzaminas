import { useRef } from "react";
import { useState } from "react";
import getBase64 from "../Functions/getBase64";
import axios from "axios";
import Nav from "../Nav";


function Create() {
  const [meistras, setMeistras] = useState("Meistras")
  const [vardas,setVardas ] = useState("vardas")
  const [pavarde,setPavarde ] = useState("pavarde")
  const [spec,setSpec ] = useState("specealybe")
  const [servisas,setServisas ] = useState("servisas")
  const [miestas,setMiestas ] = useState("miestas")
  const [photoPrint, setPhotoPrint] = useState(null);
  const fileInput = useRef();

  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
      .then(photo => setPhotoPrint(photo))
      .catch(_ => {
      })
  }

  const handleCreate = () => {
    const data = {
      meistras,
      vardas,
      pavarde,
      spec,
      servisas,
      miestas,
      photo: photoPrint

    };
      axios.post('http://localhost:3003/meister',data)
    setMeistras("Meistras");
    setVardas("Vardas");
    setPavarde("Pavarde");
    setSpec("specealybe");
    setServisas("Servisas ");
    setMiestas("Miestas");

    
    setPhotoPrint(null)
    fileInput.current.value = null

  };

  return (
    <div className="container">
     <Nav/> 
      <div className="card mt-4">
        
        <div className="card-header">
          <h2>Prideti meistra</h2>
        </div><div className="col-12">
        <div className="card-body">

          <div className="form-group">
            <label>meistras</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setMeistras(e.target.value)}
              value={meistras}
            />
            <small className="form-text text-muted">Irasykite meistro pavadinima</small>
          </div>
          <div className="form-group">
            <label>vardas</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setVardas(e.target.value)}
              value={vardas}
            />
            <small className="form-text text-muted">Irasykite meistro varda</small>
          </div>

          <div className="form-group">
            <label>pavarde</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setPavarde(e.target.value)}
              value={pavarde}
            />
            <small className="form-text text-muted">Irasykite meistro pavarde</small>
          </div>

          <div className="form-group">
            <label>specealybe</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setSpec(e.target.value)}
              value={spec}
            />
            <small className="form-text text-muted">Irasykite meistro Specelybe</small>
          </div>
          <div className="form-group">
            <label>servisas</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setServisas(e.target.value)}
              value={servisas}
            />
            <small className="form-text text-muted">Irasykite meistro servisa</small>
          </div>
          <div className="form-group">
            <label>Miestas</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setMiestas(e.target.value)}
              value={miestas}
            />
            <small className="form-text text-muted">Irasykite meistro Miesta</small>
          </div>

          <div className="form-group">
            <label>Photo</label>
            <input ref={fileInput} type="file" className="form-control" onChange={doPhoto} />
            <small className="form-text text-muted">Upload Photo.</small>
          </div>
          <div className="photo-bin">
            <img src={photoPrint} alt={photoPrint} />
          </div>
          <button
            type="button"
            className="btn btn-outline-primary with-loader"
            onClick={handleCreate}
          >
            <span className="text">Create</span>
          </button>
        </div>
      </div></div>
      </div>
    
  );
}

export default Create;
