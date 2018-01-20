import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            {/* <div className="navbar-brand">
                Emotional UT
            </div> */}
            <div className="navbar-menu">
                <div className="navbar-start">
                    <Link to="/" className="navbar-item">Emotional UT</Link>
                </div>

                <div className="navbar-end">
                    <Link to="/interview/create" className="navbar-item">Create</Link>

                </div>
            </div>
        </nav>
    );
}

export default Navigation;
