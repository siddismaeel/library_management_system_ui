import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { get_book, save_book } from '../redux/actions/book';
import Select from 'react-dropdown-select';
import { setAlert } from '../redux/actions/alert';
import { set_page_title } from '../redux/actions/mainLayout';

function AddBook({ book, save_book, get_book, set_page_title, setAlert }) {

    const { id } = useParams();
    const navigate = useNavigate();
    const forSubmitting = useRef();
    const formDataRef = useRef();
    const startYear = 1950;
    const endYear = new Date().getFullYear(); // Current year
    const years = Array.from({ length: endYear - startYear + 1 }, (_, index) => startYear + index);
    const options = years.map(year => ({ value: year, label: year }))

    const [formData, setFormData] = useState({
        bookId: id,
        title: '',
        authorName: '',
        publisher: '',
        yearOfPublication: 2024,
        totalCopies: 0,
        availableCopies: 0
    })

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = async (e) => {
        e.preventDefault();
        if(formData.availableCopies < 0){
            setAlert("Available copies cannot be less than zero", "danger");
            return;
        }

        if (forSubmitting.current) return;

        forSubmitting.current = true;
        const res = await save_book(JSON.stringify(formData));
        if (res) {
            navigate(-1);
        }

        forSubmitting.current = false;
    }

    const getFormData = (book) => {

        return {
            bookId: book.id || id,
            title: book.title || formData.title,
            authorName: book.authorName || formData.authorName,
            publisher: book.publisher || formData.publisher,
            yearOfPublication: book.yearOfPublication || formData.yearOfPublication,
            totalCopies: book.totalCopies || formData.totalCopies,
            availableCopies: book.availableCopies || formData.availableCopies
        }
    }
    useEffect(() => {
        let availableCopies = 0;
        if (formData.bookId === '0') {
            availableCopies = formData.totalCopies
        } else {
            const issuedCopies = formDataRef.current ? Number(formDataRef.current.totalCopies) - Number(formDataRef.current.availableCopies) : 0
            availableCopies = (Number(formData.totalCopies)) - issuedCopies;
        }

        setFormData({ ...formData, availableCopies: availableCopies })
    }, [formData.totalCopies])
    useEffect(() => {
        if (id !== '0') {
            formDataRef.current = { ...getFormData(book) }
            setFormData({ ...getFormData(book) })
        }
    }, [book])
    useEffect(() => {
        if (id !== '0') {
            set_page_title("Update Book")
            get_book(id);
        }else{
            set_page_title("Add Book")
        }
    }, [])
    return (
        <div className='mx-4 my-4'>
            <Form onSubmit={onSubmit} >
                <Row>
                    <Col lg="4">
                        <Form.Group className="mb-3" controlId="addMember" >
                            <Form.Label>Book Title</Form.Label>
                            <Form.Control
                                type="Text"
                                name='title'
                                value={formData.title}
                                onChange={onChange}
                                required
                                placeholder="Enter Book Title" />
                        </Form.Group>
                    </Col>
                    <Col lg="4">
                        <Form.Label>Author Name</Form.Label>
                        <Form.Control
                            type="Text"
                            name='authorName'
                            value={formData.authorName}
                            onChange={onChange}
                            required
                            placeholder="Enter Author Name" />
                    </Col>
                    <Col lg="4">
                        <Form.Label>Publisher</Form.Label>
                        <Form.Control
                            type="text"
                            name='publisher'
                            onChange={onChange}
                            value={formData.publisher}
                            placeholder="Enter Publisher" />
                    </Col>
                    <Col lg="4">
                        <Form.Label>Publication Year</Form.Label>

                        <Select options={options}
                            values={options.filter(option => option.value === formData.yearOfPublication)}
                            onChange={(values) => {

                                setFormData({ ...formData, yearOfPublication: values[0] ? values[0].value : 0 })
                            }} />

                    </Col>
                    <Col lg="4">
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Total Copies</Form.Label>
                            <Form.Control
                                name='totalCopies'
                                type="Number"
                                onChange={onChange}
                                required
                                value={formData.totalCopies}
                                placeholder="Enter Copies" />
                        </Form.Group>
                    </Col>
                    <Col lg="4">
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Avalable Copies</Form.Label>
                            <Form.Control
                                name='availableCopies'
                                type="Number"
                                disabled
                                value={formData.availableCopies}/>
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
                    <Button
                        variant="primary"
                        type="submit">
                        Submit
                    </Button>
                </div>
            </Form>



        </div>
    )
}

const mapStateToprops = (state => ({
    book: state.book.book
}))
export default connect(mapStateToprops, { save_book, get_book, setAlert, set_page_title })(AddBook)
