import { connect } from "react-redux"
import { get_members } from "../redux/actions/member"
import { useEffect } from "react"
import CustomTable from "./CustomTable"
import { Link, useNavigate } from "react-router-dom"
import { FaEdit } from "react-icons/fa"
import { set_page_title } from "../redux/actions/mainLayout"

const Members = ({ members, get_members, set_page_title }) => {


    const navigate = useNavigate();
    const columns =[
        {
            name: 'First Name',
            selector: row => row.firstName,
            sortable: true,
        },
        {
            name: 'Last Name',
            selector: row => row.lastName,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row =><span title={row.email}>{row.email}</span>,
            sortable: true,
        },
        {
            name: 'Phone Number',
            selector: row => <span title={row.phoneNumber}>{row.phoneNumber}</span>,
            sortable: true,
        },
        {
            name: 'Membership Date',
            selector: row => row.membershipDate && row.membershipDate.substring(0,10),
            sortable: true,
        },
        {
            name: 'Total Issued',
            selector: row => row.issuedBooks ? row.issuedBooks.length : 0,
            sortable: true,
        },
        {
            name: 'Action',
            selector: row => <Link to={`/add-member/${row.id}`}><FaEdit/></Link>,
            sortable: true,
        },

    ]

    const action = ()=>{
        navigate('/add-member/0')
    }

    useEffect(() => {
        set_page_title("Members")
        get_members();
    }, [])

    return (
        <div className='mx-4 my-4'>
            <CustomTable
                columns={[...columns]}
                data={[...members]}
                action={action}
            />
        </div>
    )
}

const mapStateToProps = (state => ({
    members: state.member.members
}))
export default connect(mapStateToProps, { get_members, set_page_title })(Members)