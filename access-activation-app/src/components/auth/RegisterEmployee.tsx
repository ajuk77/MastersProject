import React, { Fragment, useState } from 'react';
import { Card, CardBody, Form, FormGroup, Label, Input, Button, CardTitle, CardHeader, FormFeedback } from 'reactstrap';

import '../../assets/styles/auth/register.scss';
import { registerEmployee } from '../../services/auth.service';

interface IRegisterProps {
}


export const Register = (props: IRegisterProps) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    function handleFirstName(e: any) {
        setFirstName(e.target.value);
    }
    function handleLastName(e: any) {
        setLastName(e.target.value);
    }
    function handleEmail(e: any) {
        setEmail(e.target.value);
        isEmailValid() ? setFormErrors({
            email: '',
            password: formErrors.password,
            confirmPassword: formErrors.confirmPassword
        }) : setFormErrors({
            email: 'Entered email is invalid',
            password: formErrors.password,
            confirmPassword: formErrors.confirmPassword
        });
    }
    function handlePassword(e: any) {
        setPassword(e.target.value);
    }
    function handleConfirmPassword(e: any) {
        setConfirmPassword(e.target.value);
        (isPasswordValid()) ? setFormErrors({
            email: formErrors.email,
            password: '',
            confirmPassword: 'Passwords match'
        }) : setFormErrors({
            email: formErrors.email,
            password: 'Passwords do not match',
            confirmPassword: 'Passwords do not match'
        });
    }
    function handleContact(e: any) {
        setContactNo(e.target.value);
    }
    function isFormValid(): boolean {
       return isEmailValid() && isPasswordValid();
    }
    function onSubmit(e: any) {
        e.preventDefault();
        console.log({
            firstName,
            lastName,
            email,
            password,
            contactNo
        })
        registerEmployee({
            firstName,
            lastName,
            email,
            password,
            contactNo
        }).then(res => {
            console.log(res);
            alert('success');
        }).catch(err => {
            console.log(err);
        })
    }
    function isPasswordValid() {
        if(!password && !confirmPassword){return true}
        return password === confirmPassword && password.length > 3;
    }
    function isEmailValid() {
        if(!email){return true}
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
        return reValidEmail.test(email);
    }

    return (
        <Fragment>
            <Card className="shadow mt-4 medium-card bg-light border-0 text-dark">
                <CardHeader className="bg-primary text-white">Register</CardHeader>
                <CardBody>
                    <Form onSubmit={(e) => onSubmit(e)}>
                        <FormGroup>
                            <Label for="firstName">First name:</Label>
                            <Input type="text" onChange={handleFirstName} name="firstName" placeholder="eg. John" required></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="lastName">Last name:</Label>
                            <Input type="text" onChange={handleLastName} name="lastName" placeholder="eg. Doe" required></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email:</Label>
                            <Input type="email" invalid={!isEmailValid()} onChange={handleEmail} name="email" placeholder="eg. john.doe@example.com" required></Input>
                            <FormFeedback>{formErrors.email}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password:</Label>
                            <Input type="password" invalid={!isPasswordValid()} onChange={handlePassword} name="password" placeholder="Password" required></Input>
                            <FormFeedback>{formErrors.password}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="confirmPassword">Confirm Password:</Label>
                            <Input type="password" invalid={!isPasswordValid()} onChange={handleConfirmPassword} name="confirmPassword" placeholder="Password" required></Input>
                            <FormFeedback>{formErrors.confirmPassword}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="contact">Contact No:</Label>
                            <Input type="text" onChange={handleContact} name="contact" placeholder="Contact no" required></Input>
                        </FormGroup>
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <Button block color="secondary" type="submit">Register</Button>
                            <a href="/login" className="mt-2 small text-decoration-none">Already have an account?</a>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </Fragment>
    )
}