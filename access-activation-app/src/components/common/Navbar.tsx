import React, { Component } from 'react';
import {
    Navbar,
    NavbarBrand,
    Container,
    NavLink,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem
} from 'reactstrap';
import { Link, Router } from 'react-router-dom';

interface IState {
    isOpen: boolean;
}

class AppNavbar extends Component {

    state: IState;

    constructor(props: any) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <Navbar dark expand="md" color="primary">
                <NavbarBrand href="/" className="text-light">
                    Access Activation App
                </NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto text-center" navbar>
                    <NavItem>
                        <NavLink href="/Login">Login</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/Register">Register</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="">GitHub</NavLink>
                    </NavItem>
                </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

export default AppNavbar;