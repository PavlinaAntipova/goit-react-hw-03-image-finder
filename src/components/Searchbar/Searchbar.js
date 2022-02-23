import React, { Component } from "react";
import PropTypes from 'prop-types';

import s from "./Searchbar.module.css"


class Searchbar extends Component {
    state = {
        query: "",
    }

    onChange = (e) => {
        const normalizeQuery = e.target.value.trim().toLocaleLowerCase();
        this.setState({ query:  normalizeQuery});
    }

    resetState = () => {
        this.setState({ query: "" });
    }

    render() {
        const { query } = this.state;
        const { updateSearchQuery, resetState } = this.props;

        return (
            <header className={s.header}>
                <h1 className={s.mainTitle}>Find.<span>Photo</span></h1>
                <form className={s.form} onSubmit={e => {
                    e.preventDefault();

                    if (!query) {
                        alert("write down your request");
                        return;
                    }
                    resetState();
                    updateSearchQuery(query);
                    this.resetState();
            }}>
                    

                    <input className={s.input}
                        onChange={this.onChange}
                    type="text"
                    autoComplete="off"
                    autoFocus
                        placeholder="Search images and photos"
                        value={query}
                    />
                    <button className={s.button} type="submit">
                    Search
                </button>
            </form>
        </header>);
    }
}

export default Searchbar;

Searchbar.propTypes = {
    updateSearchQuery: PropTypes.func,
    resetState: PropTypes.func
}