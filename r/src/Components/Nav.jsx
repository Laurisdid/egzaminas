import { NavLink, Link } from "react-router-dom";

function Nav() {

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <nav className="nav">
                            <NavLink to="/" className="nav-link" style={
                                ({ isActive }) =>
                                    isActive ? {
                                        color: 'crimson'
                                    } : null
                            }>List of Meisters</NavLink>
                            <NavLink to="/admin/" className="nav-link" style={
                                ({ isActive }) =>
                                    isActive ? {
                                        color: 'crimson'
                                    } : null
                            }>Admin page</NavLink>
                            <NavLink to="/create" className="nav-link" style={
                                ({ isActive }) =>
                                    isActive ? {
                                        color: 'crimson'
                                    } : null
                            }>Create meister</NavLink>
                            <Link to="/login" className="nav-link" style={{ marginLeft: "3%" }}>Login</Link>
                            <Link to="/logout" className="nav-link" style={{ marginLeft: "15%" }}>Logout</Link>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Nav;