import React from 'react';
import { IUserInfo } from '../interfaces';
import { Container, Card, CardBody, CardHeader } from 'reactstrap';
import { connect } from 'react-redux';
import  {QRCode} from 'react-qr-svg';

interface IUserProfileProps {
    user?: any;
}

function UserProfile(props: IUserProfileProps) {
    document.title = 'Access Activation App - Profile'
    return (
        <section className="user-profile">
            <Container className="mt-4 login-container">
                <Card className="bg-light medium-card text-center shadow border-0">
                    <CardHeader className="bg-secondary text-white">
                        <h4 className="mb-0">Employee ID: {props.user.id}</h4>
                    </CardHeader>
                    <CardBody>
                        
                        <h2>{props.user.firstName} {props.user.lastName}</h2>
                        <QRCode className="mt-4" bgColor="#FFFFFF"
                            fgColor="#000000"
                            level="Q"
                            style={{ width: 256 }}
                            value="some text" />
                        <h3 className="mt-4">
                            {props.user.email}
                        </h3>
                        <h3 className="mt-4">
                       {props.user.contactNo}
                        </h3>
                    </CardBody>
                </Card>
            </Container>
        </section>
    )
}

const mapStateToProps = (state: any) => ({
    ...state,
    user: state.UserReducer.user
})

export default connect(mapStateToProps)(UserProfile);