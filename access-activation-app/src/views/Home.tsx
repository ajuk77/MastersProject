import React, {Component, Fragment} from 'react';
import { Banner } from '../components/home/Banner';
import { Sellout } from '../components/home/Sellout';
import { Container } from 'reactstrap';

interface IAppHomeProps{}

class AppHome extends Component<IAppHomeProps> {
    
    componentDidMount() {
        document.title = 'Access Activation App - Home'
    }

    render() {
        return (
            <Container fluid>
                <Banner/>
                <Sellout/>
            </Container>
        )
    }
}

export default AppHome;