import React from 'react';
import '../../assets/styles/home/sellout.scss';
import { Container, Row, Col } from 'reactstrap';
import Easy from '../../assets/images/Easy.svg';
import Secure from '../../assets/images/Secure.svg'
import crossPlatform from '../../assets/images/cross-palatform.svg';

interface ISelloutProps {}

export const Sellout = (props: ISelloutProps) => {
    return(
        <section className="sellout">
        <Container>
            <Row>
                <Col xs="12" sm="6" className="text-center content-left">
                    <img src={Easy} alt="easy" width="250px"/>
                </Col>
                <Col xs="12" sm="6" className="text-center">
                    <div className="h-100 d-flex align-items-center flex-column justify-content-center">
                    <h2 className="text-primary ">
                        Easy to use
                    </h2>
                    <h3 className="text-secondary">
                        So easy that, you don't need to become a robot.
                    </h3>
                    </div>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col xs="12" sm="6" className="text-center content-left">
                    <div className="h-100 d-flex align-items-center flex-column justify-content-center">
                    <h2 className="text-primary ">
                        Secure
                    </h2>
                    <h3 className="text-secondary">
                        Industry proven security measures included. Hackers Beware!
                    </h3>
                    </div>
                </Col>
                <Col xs="12" sm="6" className="text-center">
                    <img src={Secure} alt="easy" width="250px"/>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col xs="12" sm="6" className="text-center content-left">
                    <img src={crossPlatform} alt="easy" width="250px"/>
                </Col>
                <Col xs="12" sm="6" className="text-center">
                    <div className="h-100 d-flex align-items-center flex-column justify-content-center">
                    <h2 className="text-primary ">
                        Cross Platform
                    </h2>
                    <h3 className="text-secondary">
                        Works everywhere - Mobile, Web, Desktop and anywhere else you would want.
                    </h3>
                    </div>
                </Col>
            </Row>
        </Container>
        </section>
    )
}