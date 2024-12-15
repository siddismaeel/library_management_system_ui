import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { get_books } from '../redux/actions/book'
import CustomTable from './CustomTable'
import { Link, useNavigate } from 'react-router-dom'
import { FaEdit } from 'react-icons/fa'

function Books({ books, get_books }) {


    const navigate = useNavigate();
    const columns = [
        {
            name: 'Book Title',
            selector: row => row.title,
            sortable: true,
            className: 'text-center'
        },
        {
            name: 'Publisher',
            selector: row => row.publisher,
            sortable: true,
        },
        {
            name: 'Available Cpies',
            selector: row => row.availableCopies,
            sortable: true,
        },
        {
            name: 'Total Copies',
            selector: row => row.totalCopies,
            sortable: true,
        },
        {
            name: 'Year of Publication',
            selector: row => row.yearOfPublication,
            sortable: true,
        },
        {
            name: 'Action',
            selector: row => <Link to={`/add-book/${row.id}`}><FaEdit /></Link>,
            sortable: true,
        }
    ]
    const action = () => {
        navigate('/add-book/0');
    }
    useEffect(() => {
        get_books();
    }, [])

    return (
        <div className='mx-4 my-4'>
            <CustomTable
                columns={[...columns]}
                data={[...books]}
                action={action}
            />
        </div>
    )
}

const mapStateToProps = (state => ({
    books: state.book.books
}))
export default connect(mapStateToProps, {
    get_books
})(Books)
