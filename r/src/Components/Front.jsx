
import List from "./List/List";
import { useState, useEffect } from "react";
import { authConfig } from './Functions/auth';
import axios from 'axios';
import Context from "./BackContext";
import Nav from "./Nav";

function Front() {
    const [ideas, setIdeas] = useState(null);
    useEffect(() => {
        axios.get('http://localhost:3003/meister', authConfig())
            .then(res => setIdeas(res.data));
    }, []);

    
    
    return (
        <Context.Provider value={{
            ideas,
            setIdeas,
        }}>
            <Nav />
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <List />
                    </div>
                </div>
            </div>
        </Context.Provider>

    )
}
export default Front;