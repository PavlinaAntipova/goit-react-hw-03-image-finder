import React, { Component } from "react";
import PropTypes from 'prop-types';

import s from "./Button.module.css"

class Button extends Component {

    onLoadMore = () => {
        this.props.increasePage();
    }

    render() {
        return (
            <button className={s.button} onClick={() => { this.onLoadMore() }} type="button">Load More</button>
        );
    }
    
}

export default Button;

Button.propTypes = {
    increasePage: PropTypes.func,
    onLoadMore: PropTypes.func,
}