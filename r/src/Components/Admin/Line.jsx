import { useState, useEffect, } from "react";
import BackContext from "../BackContext";
import axios from "axios";
import { useContext } from "react";
function Line({ line }) {
    const [deleteLine, setDeleteLine] = useState(null);
    const { reloadIdeas } = useContext(BackContext)
    const handleDelete = () => {
        setDeleteLine(line);
    }
    useEffect(() => {
        if (null === deleteLine) return;
        axios.delete('http://localhost:3003/meister/' + deleteLine.id)
            .then(() => reloadIdeas())
    }, [deleteLine]);
    return (
        <li className="list-group-item">
            <div className="item">
                <div className="content">
                    <b style={{ minWidth: "15vh" }}>{line.meistras}</b>
                    <i style={{ minWidth: "10vh" }}>{line.vardas} </i>
                    <i style={{ minWidth: "10vh" }}>{line.pavarde} </i>
                    <i style={{ minWidth: "10vh" }}>{line.spec} </i>
                    <i style={{ minWidth: "10vh" }}>{line.servisas} </i>
                    <i style={{ minWidth: "9vh" }}>{line.miestas} </i>
                    <i style={{ minWidth: "9vh" }}>{line.rank} </i>
                    {
                        line.photo ? <div className="photo-bin"><img src={line.photo} alt={line.title} /></div> : null
                    }

                </div>

            </div>
            <button style={{ float: "right" }} type="button" className="btn btn-outline-danger ml-2" onClick={handleDelete}>delete</button>
        </li>
    );
}

export default Line;