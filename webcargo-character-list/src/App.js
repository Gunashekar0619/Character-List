import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Select, Pagination, Grid } from '@mui/material';
import Character from './Character';
import './App.css';

const App = () => {
    const [characters, setCharacters] = useState([]);
    const [statusFilter, setStatusFilter] = useState('All');
    const [nameFilter, setNameFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const fetchCharacters = async (page) => {
        const response = await axios.get(
            `https://rickandmortyapi.com/api/character?page=${page}`
        );
        setCharacters(response.data.results);
        setTotalPages(response.data.info.pages); // Update total pages
    };

    useEffect(() => {
        fetchCharacters(currentPage);
    }, [currentPage]);

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    const filterCharacters = () => {
        return characters
            .filter((character) => {
                if (statusFilter === 'All') return true;
                return character.status === statusFilter;
            })
            .filter((character) => {
                if (nameFilter === '') return true;
                return character.name.toLowerCase().includes(nameFilter.toLowerCase());
            });
    };


    return (
        <div className="app">
            <h1>Rick and Morty Characters</h1>
            Filters
            <div className="filters">
                <div>
                    Status:
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="Alive">Alive</option>
                        <option value="Dead">Dead</option>
                    </select>

                    <Input
                        placeholder="Filter by name"
                        onChange={(e) => setNameFilter(e.target.value)}
                    />
                </div>


                <Pagination
                    className={"pagination"}
                    count={totalPages} // Use the total number of pages from API
                    page={currentPage}
                    onChange={handlePageChange}
                />
            </div>
            <Grid container spacing={2}>
                {filterCharacters().map((character) => (
                    <Grid item xs={12} sm={6} md={4} key={character.id}>
                        <Character
                            name={character.name}
                            image={character.image}
                            status={character.status}
                        />
                    </Grid>
                ))}
            </Grid>

        </div>
    );
};

export default App;