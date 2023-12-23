import React, { useState } from 'react';
import './Search.css';
import { useNavigate } from 'react-router-dom';
import Metadata from '../layout/Metadata';

const Search = () => {
    const [keyWord, setKeyWord] = useState('');
    const navigate = useNavigate()

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyWord.trim()) {
            navigate(`/products/${keyWord}`)
        } else {
            navigate(`/products`)
        }
    };

    return (
        <>
            <Metadata title={"Search A Product -- ECOMMERCE"} />
            <form className="searchBox" onSubmit={searchSubmitHandler}>
                <input
                    type="text"
                    placeholder="Search a product..."
                    onChange={(e) => setKeyWord(e.target.value)}
                />
                <input type="submit" value="Search" />
            </form>
        </>
    );
};

export default Search;
