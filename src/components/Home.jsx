import React, { useEffect } from 'react'
import { FaBook, FaBookOpen, FaCheckCircle, FaUser } from 'react-icons/fa'
import { connect } from 'react-redux'
import { get_dashboard_data } from '../redux/actions/dashboard'
import { set_page_title } from '../redux/actions/mainLayout'

 function Home({dashboardData, get_dashboard_data, set_page_title}) {

    useEffect(()=>{
        set_page_title("Dashboard")
        get_dashboard_data();
    },[])

    return (
        <div class="grey-bg container-fluid">
            <section id="minimal-statistics">
                <div class="row">
                    <div class="col-12 mt-3 mb-1">
                        <h4 class="text-uppercase">Library Management System</h4>
                        
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-3 col-sm-6 col-12">
                        <div class="card">
                            <div class="card-content">
                                <div class="card-body">
                                    <div class="media d-flex">
                                        <div class="align-self-center">
                                            <FaUser className='text-secondary' style={{ height: '100px', width: '100px' }} />
                                        </div>
                                        <div class="media-body text-right">
                                            <h3>{dashboardData.totalMembers || 0}</h3>
                                            <span>Total Members</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-sm-6 col-12">
                        <div class="card">
                            <div class="card-content">
                                <div class="card-body">
                                    <div class="media d-flex">
                                        <div class="align-self-center">
                                            <FaBook className='text-secondary' style={{ height: '100px', width: '100px' }} />
                                        </div>
                                        <div class="media-body text-right">
                                            <h3>{dashboardData.availableBooks || 0}</h3>
                                            <span>Total Books Available</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-sm-6 col-12">
                        <div class="card">
                            <div class="card-content">
                                <div class="card-body">
                                    <div class="media d-flex">
                                        <div class="align-self-center">
                                            <FaCheckCircle className='text-secondary' style={{ height: '100px', width: '100px' }} />
                                        </div>
                                        <div class="media-body text-right">
                                            <h3>{dashboardData.totalBooks || 0}</h3>
                                            <span>Total Books</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-sm-6 col-12">
                        <div class="card">
                            <div class="card-content">
                                <div class="card-body">
                                    <div class="media d-flex">
                                        <div class="align-self-center">
                                            <FaBookOpen className='text-secondary' style={{ height: '100px', width: '100px' }} />
                                        </div>
                                        <div class="media-body text-right">
                                            <h3>{dashboardData.totalIssued || 0}</h3>
                                            <span>Issued Total</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </section>
        </div>
    )
}

const mapStateToProps = (state=>({
    dashboardData:state.dashboard.dashboardData
}))
export default connect(mapStateToProps,{get_dashboard_data, set_page_title})(Home)