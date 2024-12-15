import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { add_member, get_member } from '../redux/actions/member';
import { set_page_title } from '../redux/actions/mainLayout';

function AddMember({ member, add_member, get_member, set_page_title }) {

    const { id } = useParams();
    const navigate = useNavigate();
    const forSubmitting = useRef();
    const formRef = useRef();
    const [formData, setFormData] = useState({
        memberId: id,
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        membershipDate: ''
    })

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = async (e) => {
        e.preventDefault();
        if (forSubmitting.current) return;

        forSubmitting.current = true;
        const res = await add_member(JSON.stringify(formData));
        if (res) {
            navigate(-1);
        }

        forSubmitting.current = false;
    }

    const getFormData = (member) => {

        return {
            memberId: member.memberId || id,
            firstName: member.firstName || formData.firstName,
            lastName: member.lastName || formData.lastName,
            email: member.email || formData.email,
            phoneNumber: member.phoneNumber || formData.phoneNumber,
            membershipDate: member.membershipDate ? member.membershipDate.substring(0, 10) : formData.membershipDate
        }
    }
    useEffect(() => {
        if (id !== '0') {
            setFormData({ ...getFormData(member) })
        }
    }, [member])
    useEffect(() => {
        
        if (id !== '0') {
            set_page_title("Update Member")
            get_member(id);
        }else{
            set_page_title("Add Member")
        }
    }, [])
    return (
        <div className='mx-4 my-4'>
            <Form onSubmit={onSubmit} ref={formRef}>
                <Row>
                    <Col lg="4">
                        <Form.Group className="mb-3" controlId="addMember" >
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="Text"
                                name='firstName'
                                value={formData.firstName}
                                onChange={onChange}
                                required
                                placeholder="Enter First Name" />
                        </Form.Group>
                    </Col>
                    <Col lg="4">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="Text"
                            name='lastName'
                            value={formData.lastName}
                            onChange={onChange}
                            required
                            placeholder="Enter Last Name" />
                    </Col>
                    <Col lg="4">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type="text"
                            name='phoneNumber'
                            onChange={onChange}
                            value={formData.phoneNumber}
                            placeholder="Enter Pnone number" />
                    </Col>
                    <Col lg="4">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            name='email'
                            type="Text"
                            required
                            onChange={onChange}
                            value={formData.email}
                            placeholder="Enter Email" />
                    </Col>
                    <Col lg="4">
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Membership Date</Form.Label>
                            <Form.Control
                                name='membershipDate'
                                type="date"
                                onChange={onChange}
                                required
                                value={formData.membershipDate}
                                placeholder="Sect Membership Date" />
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
    member: state.member.member
}))
export default connect(mapStateToprops, { add_member, get_member,set_page_title })(AddMember)
