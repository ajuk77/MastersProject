import React, { useState, Fragment } from 'react';
import { Card, CardHeader, CardBody, Form, FormGroup, Label, Button, Input, FormFeedback, Alert } from 'reactstrap';
import { loginEmployee } from '../../services';
import { connect } from 'react-redux';
import { IUserInfo } from '../../interfaces';
import { loginUser } from '../../store/actions/UserActions';
import { Action } from 'redux';

interface ILoginComponentProps {
    loginUser?: any;
    dispatch?: any;
}

function LoginComponent(props: ILoginComponentProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [formErrors, setFormErrors] = useState({
        alert: '',
        email: '',
        password: ''
    })

    function handleEmailChange(e: any) {
        e.preventDefault();
        setEmail(e.target.value);
        isValidEmail() ? setFormErrors({
            email: 'valid',
            password: formErrors.password,
            alert: formErrors.alert
        }) : setFormErrors({
            email: 'Invalid email address',
            password: formErrors.password,
            alert: formErrors.alert
        })

    }

    function handlePasswordChange(e: any) {
        e.preventDefault();
        setPassword(e.target.value);
        isValidPassword() ? setFormErrors({
            email: formErrors.email,
            password: 'valid',
            alert: formErrors.alert
        }): setFormErrors({
            email: formErrors.email,
            password: 'Invalid Password',
            alert: formErrors.alert
        })
    }

    function isValidEmail(): boolean {
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
        
        const isValid = reValidEmail.test(email);
        return isValid;
    }

    function isValidPassword(): boolean {
        if(!password){return true}
        return password.length > 3;
    }

    function onSubmit(e: any) {
        e.preventDefault();
        if(isValidEmail() && isValidPassword()) {
            loginEmployee(email, password).then(res => {
                props.loginUser({
                        user: res.data.employee,
                        accessToken: res.data.token
                })
                window.location.href = '/dashboard';
            }).catch(err => {
                console.log(err);
                setFormErrors({
                    alert: err.response.data.error,
                    email: formErrors.email,
                    password: formErrors.password
                })
            })
        }
    }

    return(
        <Fragment>
            <Card className="shadow mt-4 medium-card bg-light border-0 text-dark">
                <CardHeader className="bg-primary text-white">Sign In</CardHeader>
                <CardBody>
                    {(formErrors.alert) ? (<Alert color="danger">{formErrors.alert}</Alert>) : null}
                    <Form onSubmit={(e) => onSubmit(e)}>
                        <FormGroup>
                            <Label for="email">Email:</Label>
                            <Input name="email" invalid={!isValidEmail()} onChange={handleEmailChange} placeholder="eg. john.doe@example.com" required></Input>
                            <FormFeedback>{formErrors.email}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password:</Label>
                            <Input name="password" type="password" invalid={!isValidPassword()} onChange={handlePasswordChange} placeholder="Password" required></Input>
                            <FormFeedback>{formErrors.password}</FormFeedback>
                        </FormGroup>
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <Button block>Sign in</Button>
                            <a className="small mt-2 text-decoration-none" href="/register" >Don't have an account?</a>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </Fragment>
    )
}

const mapStateToProps = (state: any) => ({
    ...state,
    user: state.UserReducer
  })

const mapDispatchToProps = (dispatch: React.Dispatch<Action>) => ({
        loginUser: (payload: IUserInfo) => dispatch(loginUser(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
