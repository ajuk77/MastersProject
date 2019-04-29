import React from 'react';
import {connect} from "react-redux";
import {Card, CardBody, CardHeader, Container} from "reactstrap";
import QrReader from 'react-qr-reader';
import {validateId, validateVisitorId} from "../../services/validate.service";
import swal from "sweetalert";


class ValidateID extends React.Component<any, any> {

    handleScan = (data: any) => {
        if (data) {
            const id = JSON.parse(data);
            switch (id.type) {
                case 'employee': {
                    validateId(id.uuid, this.props.user.accessToken).then((res: any) => {
                        swal({
                            title: 'Success',
                            icon: 'success',
                            text: 'Employee ID is valid',
                            timer: 3000
                        })
                    }).catch((err: any) => {
                        swal({
                            title: 'Error',
                            icon: 'error',
                            text: err.response.data.error,
                            timer: 3000
                        })
                    })
                    break;
                }
                case 'visitor': {
                    validateVisitorId(id.uuid, this.props.user.accessToken).then((res: any) => {
                        swal({
                            title: 'Success',
                            icon: 'success',
                            text: 'Employee ID is valid',
                            timer: 3000
                        })
                    }).catch((err: any) => {
                        swal({
                            title: 'Error',
                            icon: 'error',
                            text: err.response.data.error,
                            timer: 3000
                        })
                    })
                    break;
                }
                default: {
                    swal({
                        title: 'Error',
                        icon: 'error',
                        text: 'Not a valid ID',
                        timer: 3000
                    })
                }
            }
        }
    }
    handleError = (err: any) => {
        console.error(err)
    }


    render() {
        return (
            <section className="user-profile">
                <Container className="mt-4 login-container">
                    <Card className="bg-light medium-card text-center shadow border-0">
                        <CardHeader className="bg-primary text-light">Validate Card</CardHeader>
                        <CardBody>
                            <QrReader
                                delay={300}
                                onError={this.handleError}
                                onScan={this.handleScan}
                                style={{width: '100%'}}
                            />
                        </CardBody>
                    </Card>
                </Container>
            </section>
        )
    }
}

const mapStateToProps = (state: any) => ({
    ...state,
    user: state.UserReducer
})

export default connect(mapStateToProps)(ValidateID);
