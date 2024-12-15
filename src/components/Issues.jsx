import { connect } from "react-redux"
import { useEffect, useState } from "react"
import CustomTable from "./CustomTable"
import { get_total_issued } from "../redux/actions/transaction"
import { Link, useNavigate } from "react-router-dom"
import { FaEdit } from "react-icons/fa"
import { set_page_title } from "../redux/actions/mainLayout"

const Issues = ({ issues, get_total_issued, set_page_title }) => {


    const navigate = useNavigate();
    const [tableData, setTableData] = useState([]);
    const columns = [
        {
            name: 'Book Title',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Issued To',
            selector: row => row.issuedTo,
            sortable: true,
        },
        {
            name: 'Borrow Date',
            selector: row => row.borrowDate.substring(0, 10),
            sortable: true,
        },
        {
            name: 'Return Date',
            selector: row => (row.returnDate && row.returnDate.length > 10) ? row.returnDate.substring(0, 10) : '-',
            sortable: true,
        },
        {
            name: 'Due Date',
            selector: row => row.dueDate.substring(0, 10),
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.status || '-',
            sortable: true,
        },
        {
            name: 'Action',
            selector: row => <span><Link title="Edit Issue" to={`/issue-book/${row.id}`}><FaEdit /></Link></span>,
            sortable: true,
        },

    ]
    const action = () => {
        navigate('/issue-book/0')
    }
    useEffect(()=>{
       const tableData =  (issues || []).map(issue =>{
            return{
                id:issue.id,
                title:issue.book.title,
                issuedTo:issue?.issueTo.firstName + ' ' + issue?.issueTo.lastName,
                borrowDate:issue.borrowDate,
                dueDate:issue.dueDate,
                returnDate:issue.returnDate,
                status:issue.transactionType
            }
        })
        setTableData([...tableData])
    },[issues])
    useEffect(() => {
        set_page_title("Issued Books")
        get_total_issued();
    }, [])

    return (
        <div className='mx-4 my-4'>
            <CustomTable
                columns={[...columns]}
                data={[...tableData]}
                action={action}
            />
        </div>
    )
}

const mapStateToProps = (state => ({
    issues: state.transaction.issues
}))
export default connect(mapStateToProps, { get_total_issued, set_page_title })(Issues)