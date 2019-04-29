import React, {Component, Fragment, useRef, useState} from 'react';
import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardHeader,
    Modal,
    ModalBody,
    ModalHeader
} from 'reactstrap';
import {connect} from 'react-redux';
import {generateId} from "../../services/access.service";
import {IUserInfo} from "../../interfaces";
import swal from "sweetalert";
import GenerateVisitorIDForm from "./GenerateVIsitorForm";

interface IGenerateIdProps {
    user?: IUserInfo;
}


function GenerateId(props: IGenerateIdProps) {

    const [modal, setModal] = useState(false);

    function generateNewID(e: any) {
        e.preventDefault();
        if(props.user && props.user.user.id) {
            generateId(props.user.user.id, props.user.user.email, props.user.accessToken).then(
                res => {
                    swal({
                        title: "Success",
                        text: "ID generated successfully.",
                        icon: "success",
                        timer: 3000
                    })
                }
            ).catch(err => {
                console.log(err);
                swal({
                    title: "Failed",
                    text: err.response.data.error,
                    icon: "error",
                    timer: 3000
                })
            })

        }
    }

    function toggleModal() {
        setModal(!modal);
    }

    return(
        <Fragment>
            <CardHeader className="bg-primary">
                Generate New ID
            </CardHeader>
            <CardBody>
                <ButtonGroup>
                    <Button onClick={(e) => generateNewID(e)} outline color="primary">Generate New ID</Button>
                    <Button outline onClick={toggleModal} color="secondary">Generate New Visitor ID</Button>
                </ButtonGroup>
            </CardBody>
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Generate Visitor ID</ModalHeader>
                <ModalBody>
                    <GenerateVisitorIDForm/>
                </ModalBody>
            </Modal>
        </Fragment>
    )
}

const mapStateToProps = (state: any) => ({
    ...state,
    user: state.UserReducer
})

export default connect(mapStateToProps)(GenerateId);
