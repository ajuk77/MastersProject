import React, {Component, Fragment} from 'react';

class AppDashboard extends Component {

    componentDidMount() {
        document.title = 'Access Activation App - Dashboard';
    }
    render() {
        return (
            <section className="dashboard"></section>
        )
    }
}

export default AppDashboard;