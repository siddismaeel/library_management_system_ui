import React, { useState } from 'react'
import './side-navbar.css';
import { Link } from 'react-router-dom';
import { FaBook, FaBookOpen } from 'react-icons/fa';
import { connect } from 'react-redux';

function SideNavbar({ pagetTitle, children }) {

    const [isSidebarActive, toggleSidebar] = useState(false);

    return (
        <div className="wrapper d-flex align-items-stretch position-fixed">
            <nav id="sidebar" className={`${isSidebarActive ? 'active' : ''}`}>
                <h1><Link to="#" className="logo"><FaBook />LIB</Link></h1>
                <ul className="list-unstyled components mb-5">
                    <li className={`Active`}>
                        <Link to="/"><span className="fa fa-home"></span> Home</Link>
                    </li>
                    <li>
                        <Link to="/members"><span className="fa fa-user"></span> Members</Link>
                    </li>
                    <li>
                        <Link to="/get-books"><span className="fa fa-sticky-note"></span> Books</Link>
                    </li>
                    <li>
                        <Link to="/issues"><span><FaBookOpen/></span> Issues</Link>

                    </li>
                </ul>
            </nav>

            <div id="content" className="p-4 p-md-1" >

                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">

                        <button type="button" id="sidebarCollapse" onClick={() => toggleSidebar(!isSidebarActive)} className="btn btn-primary">
                            <i className="fa fa-bars"></i>
                            <span className="sr-only">Toggle Menu</span>
                        </button>
                        <div className='ml-2 font-weight-bold text-muted'>
                            {pagetTitle}
                        </div>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="nav navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/members">Members</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/get-books">Books</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/issues">Issues</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className='card card-shadow' id='main-content' >
                    {children}
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state => ({
    pagetTitle: state.mainLayout.pageTitle
})

)
export default connect(mapStateToProps, {})(SideNavbar)
