import { useState} from "react";
import axios from "axios";

function Line({ line }) {

    const [sum, setSum] = useState(0);

    const confirm = () => {
      
        console.log({sum:parseInt(sum),id: line.id});
        axios.put('http://localhost:3003/rate/',{ sum:parseInt(sum),id: line.id})
        
        
    }
    return (
        <li className="list-group-item">
            <div className="item">
                <div className="content">
                <b style={{ minWidth: "17vh" }}>{line.meistras}</b>
                    <i style={{ minWidth: "12vh" }}>{line.vardas} </i>
                    <i style={{ minWidth: "15vh" }}>{line.pavarde} </i>
                    <i style={{ minWidth: "15vh" }}>{line.spec} </i>
                    <i style={{ minWidth: "15vh" }}>{line.servisas} </i>
                    <i style={{ minWidth: "9vh" }}>{line.miestas} </i>
                    <i style={{ minWidth: "3vh" }}>{line.rank} </i>
                    {
                        line.photo ? <div className="photo-bin"><img style={{ width: "80px"}} src={line.photo} alt={""} /></div> : null
                    }
                </div>
                <div className="form-group" style={{ float: "right",width: "100px" }}>
                    <input type="text" style={{ width: "80px"}}onChange={e => setSum(e.target.value)} value={sum} />
                    <button type="button" className="btn btn-outline-primary" onClick={confirm}>
                    <img style={{ width: "27px"}} src="data:image/png;base64,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"></img>
                        Rate</button>
                </div>
            </div>
        </li>
    );
}

export default Line;