import React, {useState} from 'react';
import {Button, Form, FormFeedback, FormGroup, Input, Label} from 'reactstrap';
import {connect} from "react-redux";
import {generateVisitorId} from "../../services/access.service";
import swal from 'sweetalert';

function GenerateVisitorIDForm(props: any) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [visitorEmail, setVisitorEmail] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [formErrors, setFormErrors] = useState({
        email: ''
    })

    function handleFirstNameChange(e: any) {
        e.preventDefault();
        setFirstName(e.target.value);
    }

    function handleLastNameChange(e: any) {
        e.preventDefault();
        setLastName(e.target.value);
    }

    function handleEmailChange(e: any) {
        e.preventDefault();
        setVisitorEmail(e.target.value);
        isValidEmail() ? setFormErrors({
            email: 'valid',
        }) : setFormErrors({
            email: 'Invalid email address',
        })
    }

    function handleContactChange(e: any) {
        e.preventDefault();
        setContactNo(e.target.value);
    }

    function isValidEmail(): boolean {
        if(!visitorEmail){return true}
        const sQtext = '[^\\x0d\\x22\\x5c\\x80-\\xff]';
        const sDtext = '[^\\x0d\\x5b-\\x5d\\x80-\\xff]';
        const sAtom = '[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+';
        const sQuotedPair = '\\x5c[\\x00-\\x7f]';
        const sDomainLiteral = '\\x5b(' + sDtext + '|' + sQuotedPair + ')*\\x5d';
        const sQuotedString = '\\x22(' + sQtext + '|' + sQuotedPair + ')*\\x22';
        const sDomain_ref = sAtom;
        const sSubDomain = '(' + sDomain_ref + '|' + sDomainLiteral + ')';
        const sWord = '(' + sAtom + '|' + sQuotedString + ')';
        const sDomain = sSubDomain + '(\\x2e' + sSubDomain + ')*';
        const sLocalPart = sWord + '(\\x2e' + sWord + ')*';
        const sAddrSpec = sLocalPart + '\\x40' + sDomain; // complete RFC822 email address spec
        const sValidEmail = '^' + sAddrSpec + '$'; // as whole string
        const reValidEmail = new RegExp(sValidEmail);

        const isValid = reValidEmail.test(visitorEmail);
        return isValid;
    }

    function handleFormSubmit(e: any) {
        e.preventDefault();
        if(isValidEmail()){
            generateVisitorId(props.user.user.id, props.user.user.email,
                firstName, lastName,
                contactNo, visitorEmail, props.user.accessToken).then(res => {
                    console.log(res);
                    swal({
                        title: 'Success',
                        text: 'ID generated successfully.',
                        icon: 'success',
                        timer: 3000
                    })
            }).catch(err => {
                swal({
                    title: 'Error',
                    text: err.response.data.error,
                    icon: 'error',
                    timer: 3000
                })
            })
        }
    }

    return (
        <Form onSubmit={handleFormSubmit}>
            <FormGroup>
                <Label for="firstName">
                    First name of visitor:
                </Label>
                <Input type="text" id="firstName" onChange={handleFirstNameChange} required/>
            </FormGroup>
            <FormGroup>
                <Label for="lastName">
                    Last name of visitor:
                </Label>
                <Input type="text" id="lastName" onChange={handleLastNameChange} required/>
            </FormGroup>
            <FormGroup>
                <Label for="email">
                    Email of visitor:
                </Label>
                <Input type="text" invalid={!isValidEmail()} id="email" onChange={handleEmailChange} required/>
                <FormFeedback>{formErrors.email}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="contact">
                    Contact no. of visitor:
                </Label>
                <Input type="text" id="contact" onChange={handleContactChange} required/>
            </FormGroup>
            <div className="text-center">
                <Button type="submit" color="outline-primary">Generate ID Card</Button>
            </div>
        </Form>
    )
}

const mapStateToProps = (state: any) => ({
    ...state,
    user: state.UserReducer
})

export default connect(mapStateToProps)(GenerateVisitorIDForm);

