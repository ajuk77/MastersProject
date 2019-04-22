import React from 'react';
import { Container } from 'reactstrap';
import { Register } from '../components/auth/RegisterEmployee';

import '../assets/styles/auth/register.scss';

interface IRegisterProps {
}

export const RegisterEmployee = (props: IRegisterProps) => {
    document.title = 'Access Activation App - Register'
    return (
        <Container className="register-container">
            <Register></Register>
        </Container>
    )
}