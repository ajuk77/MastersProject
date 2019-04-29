import React, {useEffect, useState} from 'react';
import {Button, Card, CardBody, CardHeader} from 'reactstrap';
import {connect} from 'react-redux';
import {IUserInfo} from "../../interfaces";
import {getEmployeeId} from "../../services/access.service";
import {QRCode} from 'react-qr-svg';
import moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import swal from 'sweetalert';

interface CurrentIdProps {
    user?: IUserInfo;
}

interface ICurrentIdState {
    uuid: string;
    activationStartTime: string;
    activationEndTime: string;
    idStatus: string;
    empId: string | number
}

class CurrentIdStatus extends React.Component<CurrentIdProps, ICurrentIdState>{

    constructor(props: CurrentIdProps) {
        super(props);
        this.state = {
            uuid: '',
            activationStartTime: '',
            activationEndTime: '',
            idStatus: '',
            empId: ''
        }
    }
    componentDidMount(): void {
        this.getIdCard();
    }

    getIdCard() {
        if (this.props.user && this.props.user.user.id) {
            getEmployeeId(this.props.user.user.id, this.props.user.accessToken).then((res) => {
                console.log(res.data.employee);
                const id = res.data.employee;
                this.setState({
                    uuid: id.uuid,
                    activationEndTime: id.activationEndTime,
                    activationStartTime: id.activationStartTime,
                    idStatus: id.state,
                    empId: id.employeeId
                })
            }).catch(err => {
                swal({
                    title: 'Error',
                    icon: 'error',
                    text: err.response.data.error,
                    timer: 3000
                })
                console.log(err);
            })
        }
    }

    convertTime(time: string) {
        const date = moment.utc(time).toDate();
        return moment(date).local().format('YYYY-MM-DD dddd HH:mm:ss A');
    }

    render(){
    return (
        <Card className="shadow-sm border-0 medium-card bg-light text-white text-center">
            <CardHeader className="bg-primary">
                Your current ID status: <span>{this.state.idStatus.toUpperCase()}</span>
                <span className="float-right">
                    <Button onClick={() => this.getIdCard()} size="sm" outline className="text-white" aria-label="Refresh">
                        <FontAwesomeIcon icon="sync"></FontAwesomeIcon>
                    </Button>
                </span>
            </CardHeader>
            <CardBody>
                <p className="card-text text-dark my-2 text-center">
                    Employee Id: {this.state.empId}
                </p>
                <QRCode value={JSON.stringify({uuid: this.state.uuid, type: 'employee', empId: this.state.empId})}
                        className="mt-4" bgColor="#FFFFFF"
                        fgColor="#000000"
                        level="Q"
                        style={{ width: 250
                        }}></QRCode>
                <p className="card-text mt-2 text-dark text-center">
                    Activation Start Time: {this.convertTime(this.state.activationStartTime)}
                </p>
                <p className="card-text text-dark text-center">
                    Activation End Time: {this.convertTime(this.state.activationEndTime)}
                </p>
            </CardBody>
        </Card>
    )
    }
}

const mapStateToProps = (state: any) => ({
    ...state,
    user: state.UserReducer
})

export default connect(mapStateToProps)(CurrentIdStatus);
