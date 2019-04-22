import React, { Component, Fragment } from 'react';
import {
    Navbar,
    NavbarBrand,
    Container,
    NavLink,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle
} from 'reactstrap';
import { Link, Router } from 'react-router-dom';
import '../../assets/styles/common/_navbar.scss';
import { connect } from 'react-redux';
import { logoutUser } from '../../store/actions/UserActions';
import { IUserInfo } from '../../interfaces';
import { AnyAction } from 'redux';

interface IState {
    isOpen: boolean;
}

interface INavbarProps {
    auth?: any;
    logoutUser?: any;
}

class AppNavbar extends Component<INavbarProps, IState> {

    state: IState;

    constructor(props: INavbarProps) {
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

    isLoggedIn() {
        if (!this.props.auth.accessToken) {
            return (
                <Fragment>
                    <NavItem>
                        <NavLink href="/">Home</NavLink >
                    </NavItem>
                    <NavItem>
                        <NavLink href="/login">Login</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/register">Register</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="">GitHub</NavLink>
                    </NavItem>
                </Fragment >
            )
        } else {
            return (
                <Fragment>
                    <NavItem>
                        <NavLink href="/">Home</NavLink >
                    </NavItem>
                    <NavItem>
                        <NavLink href="/dashboard">Dashboard</NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            {this.props.auth.user.firstName} {this.props.auth.user.lastName}
                        </DropdownToggle>
                        <DropdownMenu className="bg-light" right>
                            <DropdownItem href="/profile" className="text-primary">
                                User Profile
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={() => this.logoutUser()} className="text-primary">
                                Logout
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Fragment >
            )
        }
    }

    logoutUser() {
        this.props.logoutUser({
            accessToken: '',
            user: {
                firstName: '',
                lastName: '',
                contactNo: '',
                email: '',
                password: '',
                id: ''
            }
        })
    }

    render() {
        return (
            <Navbar dark expand="sm" color="primary" className="shadow-sm app-navbar">
                <NavbarBrand href="/" className="text-light">
                    Access Activation App
                </NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto text-center" navbar>
                        {this.isLoggedIn()}
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

const mapStateToProps = (state: any) => ({
    auth: state.UserReducer
})

const mapDispatchToProps = (dispatch: React.Dispatch<AnyAction>) => ({
    logoutUser: (payload: IUserInfo) => dispatch(logoutUser(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(AppNavbar);