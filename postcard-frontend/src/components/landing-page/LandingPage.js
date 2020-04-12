import React from 'react';
import './landing-page.css';
import { Link } from 'react-router-dom';
import {Carousel} from 'react-bootstrap';

import first from "../../assets/birthday-wallpaper.jpg";
import second from "../../assets/happy-new-year-text.jpg";
import third from "../../assets/photo-of-2020.jpg";

const LandingPage = () => {
    return (
        <div className="mt-lg-5">
            <Carousel1/>
            <div className="container">
                <div>
                    <p className="text-middle">
                        Personalize your own postcard <br/>
                        Show your friends and family, how much you care!
                    </p>
                    <Link to={"/login"}><button className="btn btn-info create-btn">Create postcard</button></Link>

                </div>

            </div>
        </div>
    );
};

const Carousel1 = () => {
    return (<div className="slider-bg">
            <Carousel>
                <Carousel.Item>
                    <img className="custom-img" src={first} alt="first"/>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="custom-img" src={second} alt="second"/>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="custom-img" src={third} alt="third"/>
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default LandingPage;
