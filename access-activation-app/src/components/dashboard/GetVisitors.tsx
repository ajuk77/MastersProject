import React from 'react';
import {Button, CardBody, CardHeader, Modal, ModalBody, ModalHeader, Table} from "reactstrap";
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {getVisitors} from "../../services/access.service";
import swal from "sweetalert";
import moment from "moment";
import GenerateVisitorIDForm from "./GenerateVIsitorForm";
import {QRCode} from "react-qr-svg";


class GetVisitors extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            visitors: [],
            modal: false,
            activeVisitor: {}
        }
        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount(): void {
        this.getVisitors();
    }

    getVisitors() {
        getVisitors(this.props.user.user.id, this.props.user.accessToken).then(res => {
            this.setState({
                visitors: res.data.visitor
            });
        }).catch(err => {
            swal({
                title: 'Error',
                icon: 'error',
                text: err.response.data.error,
                timer: 3000
            })
            console.log(err);
        });
    }

    displayVisitor(e: any, visitor: any) {
        e.preventDefault();
        this.setState({
            activeVisitor: visitor
        })
        this.toggleModal();
    }

    getTime(time: any) {
        const date = moment.utc(time).toDate();
        return moment(date).local().format('DD/mm/YYYY');
    }

    getAccessDate(time: any) {
        const date = moment.utc(time).toDate();
        return moment(date).local().format('dddd, MMMM DD, YYYY h:mm A');
    }

    toggleModal() {
        this.setState((prevState: any) => ({
            modal: !prevState.modal
        }))
    }

    getTableContent(){
        const fields = this.state.visitors.map((visitor: any, index: number) => {
            return (
                <tr key={index} onClick={(e) => this.displayVisitor(e, visitor)} className="open-modal">
                    <td>
                        {visitor.lastName}
                    </td>
                    <td>
                        {this.getTime(visitor.activationStartTime)}
                    </td>
                    <td>
                        {visitor.state}
                    </td>
                </tr>
            )
        })
        return fields;
    }

    render() {
        return (
            <React.Fragment>
                <CardHeader className="bg-primary">
                    Your past visitors <span className="float-right">
                    <Button onClick={() => this.getVisitors()} size="sm" outline className="text-white"
                            aria-label="Refresh">
                        <FontAwesomeIcon icon="sync"></FontAwesomeIcon>
                    </Button>
                </span>
                </CardHeader>
                <CardBody className="table-expand">
                    <Table hover responsive>
                        <thead>
                            <tr>
                                <th>
                                    Last Name
                                </th>
                                <th>
                                    Activation Date
                                </th>
                                <th>
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.getTableContent()}
                        </tbody>
                    </Table>
                    <Modal isOpen={this.state.modal} className="border-0" toggle={this.toggleModal}>
                        <ModalHeader className="text-center text-white bg-secondary">
                            Visitor
                        </ModalHeader>
                        <ModalBody className="text-center">
                            <p>{this.state.activeVisitor.firstName} {this.state.activeVisitor.lastName}</p>
                            <QRCode value={JSON.stringify({uuid: this.state.activeVisitor.uuid, type: 'visitor', empId: this.state.activeVisitor.employeeId})}
                                    className="mt-4" bgColor="#FFFFFF"
                                    fgColor="#000000"
                                    level="Q"
                                    style={{ width: 250
                                    }}></QRCode>
                            <p className="mt-2">Authorized Employee: {this.state.activeVisitor.employeeId}</p>
                            <p>{this.getAccessDate(this.state.activeVisitor.activationStartTime)}</p>
                        </ModalBody>
                    </Modal>
                </CardBody>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: any) => ({
    ...state,
    user: state.UserReducer
})

export default connect(mapStateToProps)(GetVisitors);
