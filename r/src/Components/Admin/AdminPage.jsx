
import List from "./List";
import { useState, useEffect } from "react";
import { authConfig } from '../Functions/auth';
import axios from 'axios';
import FrontContext from "../BackContext";
import Nav from "../Nav";

function AdminPage() {
    
    const [ideas, setIdeas] = useState(null);
    const reloadIdeas=()=>{
        axios.get('http://localhost:3003/meister', authConfig())
        .then(res => setIdeas(res.data));
    }
    reloadIdeas()
    return (
        <FrontContext.Provider value={{
            ideas,
            setIdeas,
            reloadIdeas
        }}>
            <Nav />
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <List />
                    </div>
                </div>
            </div>
        </FrontContext.Provider>

    )
}
export default AdminPage;