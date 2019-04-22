import React from 'react';
import { Container } from 'reactstrap';
import LoginComponent from '../components/auth/LoginComponent';
import '../assets/styles/auth/login.scss'

export const AppLogin = (props: any) => {

    document.title = 'Access Activation App - Login'

    return (
        <section className="login">
            <Container className="login-container">
                <LoginComponent />
            </Container>
        </section>
    )
}