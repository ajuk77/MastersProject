import React, {Component, Fragment} from 'react';
import {
    Card,
    CardBody, CardColumns,
    CardDeck, CardHeader,
    Container, Row,
} from 'reactstrap';
import GenerateId from "../components/dashboard/GenerateId";
import CurrentIdStatus from "../components/dashboard/CurrentIdStatus";

import '../assets/styles/dashboard/dashboard.scss';
import GetVisitors from "../components/dashboard/GetVisitors";

class AppDashboard extends Component {

    componentDidMount() {
        document.title = 'Access Activation App - Dashboard';
    }
    render() {
        return (
            <section className="dashboard">
                <Container>
                    <Row>
                    <CardColumns className="mt-4">
                        <CurrentIdStatus/>
                        <Card className="shadow-sm medium-card border-0 bg-light text-white text-center">
                            <GenerateId/>
                        </Card>
                        <Card className="shadow-sm medium-card border-0 bg-light text-white text-center visitors-card">
                            <GetVisitors/>
                        </Card>
                    </CardColumns>
                    </Row>
                </Container>
            </section>
        )
    }
}

export default AppDashboard;
