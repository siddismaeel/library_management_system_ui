import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { get_books_for_dropdown, save_book } from '../redux/actions/book';
import Select from 'react-dropdown-select';
import { setAlert } from '../redux/actions/alert';
import { get_member_dropdown } from '../redux/actions/member';
import { clear_issue, get_issuance, issue_book, return_book } from '../redux/actions/transaction';
import { set_page_title } from '../redux/actions/mainLayout';

function IssueBook({ issue,
    membersForDropdown,
    booksForDropdown,
    get_books_for_dropdown,
    issue_book, get_issuance,
    return_book,
    get_member_dropdown,
    set_page_title,
    clear_issue,
    setAlert }) {

    const { id } = useParams();
    const navigate = useNavigate();
    const forSubmitting = useRef();
    const formDataRef = useRef();

    const memberOptions = membersForDropdown.map(member => ({ value: member.id, label: member.firstName + ' ' + member.lastName }))
    const bookOptions = booksForDropdown.map(book => ({ value: book.id, label: book.title }))

    const [formData, setFormData] = useState({
        tranctionId: id,
        bookId: 0,
        memberId: 0,
        borrowDate: '',
        returnDate: '',
        dueDate: '',
        transactionType: 'ISSUE'
    })

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    const returnBook = async ()=>{
        if(formData.returnDate === ''){
            setAlert("Please select a return date.", "danger");
            return;
        }
        const res = await return_book(JSON.stringify(formData))
        if(res){
            navigate(-1);
        }

    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if (forSubmitting.current) return;

        forSubmitting.current = true;
        const res = await issue_book(JSON.stringify(formData));
        if (res) {
            navigate(-1);
        }

        forSubmitting.current = false;
    }

    const getFormData = (issue) => {

        return {
            tranctionId: issue.id || id,
            bookId: issue.book ? issue.book.id : formData.bookId,
            memberId: issue.issueTo ? issue.issueTo.id : formData.memberId,
            borrowDate: issue.borrowDate ? issue.borrowDate.substring(0, 10) : formData.borrowDate,
            returnDate: issue.returnDate ? issue.returnDate.substring(0, 10) : formData.returnDate,
            dueDate: issue.dueDate ? issue.dueDate.substring(0, 10) : formData.dueDate,
            transactionType: issue.transactionType || formData.transactionType
        }
    }

    useEffect(() => {
        if (id !== '0') {
            formDataRef.current = { ...getFormData(issue) }
            setFormData({ ...getFormData(issue) })
        }
    }, [issue])
    useEffect(() => {

        set_page_title("Issue Book")
        if (id !== '0') {
            get_issuance(id);
        }

        get_member_dropdown();
        get_books_for_dropdown();

        return clear_issue;
    }, [])
    return (
        <div className='mx-4 my-4'>
            <Form onSubmit={onSubmit} >
                <Row>
                    <Col lg="4">
                        <Form.Group className="mb-3" controlId="addMember" >
                            <Form.Label>Select Book</Form.Label>
                            <Select options={bookOptions}
                                required={true}
                                values={bookOptions.filter(option => option.value === formData.bookId)}
                                onChange={(values) => {
                                    setFormData({ ...formData, bookId: values[0] ? values[0].value : 0 })
                                }} />
                        </Form.Group>
                    </Col>
                    <Col lg="4">
                        <Form.Label>Select Member</Form.Label>
                        <Select options={memberOptions}
                            required={true}
                            values={memberOptions.filter(option => option.value === formData.memberId)}
                            onChange={(values) => {
                                setFormData({ ...formData, memberId: values[0] ? values[0].value : 0 })
                            }} />
                    </Col>
                    <Col lg="4">
                        <Form.Label>Borrow Date</Form.Label>
                        <Form.Control
                            type="date"
                            required
                            name='borrowDate'
                            onChange={onChange}
                            value={formData.borrowDate} />
                    </Col>
                    <Col lg="4">
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control
                            type="date"
                            required
                            name='dueDate'
                            onChange={onChange}
                            value={formData.dueDate} />
                    </Col>
                    <Col lg="4">
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Return Date</Form.Label>
                            <Form.Control
                                type="date"
                                name='returnDate'
                                onChange={onChange}
                                value={formData.returnDate} />
                        </Form.Group>
                    </Col>
                    <Col lg="4">
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                type="text"
                                disabled
                                name='transactionType'
                                value={formData.transactionType} />
                        </Form.Group>
                    </Col>
                </Row>
                <div className='d-flex flex-row justify-content-between'>
                    <Button
                        onClick={() => navigate(-1)}
                        variant="primary"
                        type="reset">
                        Back
                    </Button>
                    <div className='d-flex flex-row justify-content-center'>
                        <Button
                            variant="success"
                            className='mx-2'
                            disabled={id === '0' || formData.transactionType === "RETURNED"}
                            onClick={returnBook}
                        >
                            Return Book
                        </Button>
                        <Button
                            disabled={formData.transactionType === "RETURNED"}
                            variant="primary"
                            type="submit">
                            Submit
                        </Button>
                    </div>
                </div>
            </Form>

        </div>
    )
}

const mapStateToprops = (state => ({
    issue: state.transaction.issue,
    membersForDropdown: state.member.membersForDropdown,
    booksForDropdown: state.book.booksForDropdown
}))
export default connect(mapStateToprops, {
    get_books_for_dropdown,
    get_member_dropdown,
    issue_book,
    get_issuance,
    return_book,
    clear_issue,
    set_page_title,
    setAlert
})(IssueBook)
