import React from 'react';
import { Container, Nav, NavItem, NavLink } from 'reactstrap';

interface IFooterProps {
}

export const Footer = (props: IFooterProps) => {
    return (
        <section className="footer mt-4 bg-accent p-4">
            <Container className="text-right text-light">
                <h5>Access Activation Application</h5>
                <small>Copyrights &copy; 2019 All rights reserved.</small>
            </Container>
        </section>
    )
}