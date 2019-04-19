import React, {Component} from 'react';
import {
    Navbar, NavbarBrand, Container
} from 'reactstrap';
import { Link } from 'react-router-dom';

class AppNavbar extends Component {
    render() {
        return (
            <Navbar dark expand="md" color="primary">
                <Container>
                    <NavbarBrand className="text-light">
                        <Link to="/">
                            Access Activation App
                        </Link>
                    </NavbarBrand>
                </Container>
            </Navbar>
        );
    }
}

export default AppNavbar;