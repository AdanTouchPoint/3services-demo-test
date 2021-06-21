import React, {useEffect, useState} from 'react'
import Button from "react-bootstrap/cjs/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup"
import Col from "react-bootstrap/cjs/Col";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Loader from "react-loader-spinner";

const EmailForm = ({setShowThankYou, setShowFindForm, dataUser, setDataUser, showEmailForm, setShowEmailForm, emailData, setEmailData}) => {
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState(false)
    const [showLoadSpin, setShowLoadSpin] = useState(false)
    const handleChange = e => {
        e.preventDefault()
        setDataUser({
            ...dataUser,
            [e.target.name]: e.target.value.replace(/\n\r?/g, '<br/>' )
        })
        setEmailData({
            ...dataUser,
            ...emailData,
            [e.target.name]: e.target.value.replace(/\n\r?/g, '<br/>' )
        })
    }
    const {userName} = dataUser
    const send = async e => {
        e.preventDefault()
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);
        if (//firstName.trim() === '' || lastName.trim() === '' || //
            userName.trim() === '') {
            setError(true)
            return
        }
        setError(false)
        const payload = await axios.post('https://mailer-mailjet.herokuapp.com/email', {dataUser, emailData})
        await setShowLoadSpin(false)
        if (payload.status === 200) {
            setShowEmailForm(true)
            setShowThankYou(false)
            dataUser.id = ''
        }
    }
    const back = e => {
        e.preventDefault()
        setShowFindForm(false)
        setShowEmailForm(true)
    }
    return (
        <div className={'emailContainer'} hidden={showEmailForm}>
            {error ? <Alert variant={'danger'}>
                All fields are required!
            </Alert> : null}
            <Form onSubmit={send} noValidate validated={validated}>
                <div className={'formEmail'}>
                    <Col>
                        <Form.Group
                            controlId="name">
                            <Form.Label>
                                *First name and last name
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Name"
                                name="userName"
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group
                            controlId="email">
                            <Form.Label>
                                *Email
                            </Form.Label>
                            <Form.Control
                                type="email"
                                placeholder={emailData.emailUser}
                                onChange={handleChange}
                                name="emailUser"
                                readOnly
                            />
                        </Form.Group>
                    </Col>
                </div>
                <Col>
                    <Form.Label>
                        TO: REPRESENTATIVE INFORMATION
                    </Form.Label>
                </Col>
                <div className={'formEmail'}>
                    <Col>
                        <Form.Group>
                            <Form.Control
                                as={'input'}
                                readOnly
                                type="text"
                                placeholder={emailData.name}
                                name="nameTo"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Control
                                as={'input'}
                                readOnly
                                type="text"
                                placeholder={`${emailData.city} - ${emailData.state}`}
                                name="state-city"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <InputGroup>
                            <Form.Control
                                readOnly
                                type="text"
                                name="cp"
                                placeholder={dataUser.zipCode}
                            />
                        </InputGroup>
                    </Col>
                </div>
                <div style={{paddingTop: '5px'}}>
                    <Col>
                        <Form.Group>
                            <Form.Label>
                                Subject
                            </Form.Label>
                            <Form.Control
                                onChange={handleChange}
                                as="input"
                                type="text"
                                name="subject"
                                defaultValue={dataUser.subject}
                            />
                        </Form.Group>
                    </Col>
                </div>
                <Col>
                    <Form.Group style={{paddingTop: '20px'}}>
                        <Form.Control
                            as="textarea"
                            rows={8}
                            defaultValue={dataUser.text}
                            onChange={handleChange}
                            name="text"
                        />
                    </Form.Group>
                </Col>
                <Loader
                    visible={showLoadSpin}
                    type="Puff"
                    color="#000000"
                    height={100}
                    width={100}
                    timeout={5000} //5 secs
                />
            </Form>
            <div className={'container'} style={{textAlign: 'center'}}>
                <Button
                    type={'submit'}
                    style={{margin: '20px'}}
                    variant={'dark'}
                    onClick={send}>
                    Send
                </Button>
                <Button
                    style={{margin: '20px'}}
                    variant={'dark'}
                    onClick={back}>
                    Back
                </Button>
            </div>
        </div>
    )
}

export default EmailForm;


