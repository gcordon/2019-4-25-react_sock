import React, { Component } from 'react';
import './logo.css'
import LOGO from "./job.png"

class logo extends Component {
    render() {
        return (
            <div className="logo-container">
                <img src={LOGO} alt="logo" />
            </div>
        );
    }
}

export default logo;