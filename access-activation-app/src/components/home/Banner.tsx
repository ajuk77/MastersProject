import React from 'react';
import '../../assets/styles/home/banner.scss';
import { Button, Container } from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Typer from 'react-typing-effect';

interface IBannerProps {
}

export const Banner = (props: IBannerProps) => {
    return(
        <section className="banner">
            <header className="viewport-header">
            <div className="image-wrap"></div>
            <div className="banner-overlay"></div>
            <div className="banner-content text-light">
                <div className="text-center">
                    <h2 className="banner-title">Access Activation Application</h2>
                    <h3 className="mt-2">
                        Replace ID cards with a solution that is
                    </h3>
                    <h2 className="mt-3">
                    {/* Add typer content here */}
                        <Typer speed="100" text={['Reliable.', 'Robust.', 'Secure.']}></Typer>
                    </h2>
                    <Button size="lg" aria-label="Learn More" color="primary" className="mt-4 shadow-sm">Learn more <FontAwesomeIcon icon="chevron-circle-right"/></Button>
                </div>
            </div>
            </header>
        </section>
    )
}