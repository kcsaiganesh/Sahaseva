import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const LocationAutocomplete = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setQuery(value);
        autocompleteLocation(value);
    };

    const autocompleteLocation = async (value) => {
        const encodedQuery = encodeURIComponent(value);
        const url = `https://nominatim.openstreetmap.org/search/${encodedQuery}?format=jsonv2`;

        try {
            const response = await axios.get(url);
            const suggestions = response.data;

            setSuggestions(suggestions);
        } catch (error) {
            console.error('Error autocompleting location:', error);
        }
    };

    return (
        <Autocomplete
            freeSolo
            options={suggestions}
            getOptionLabel={(option) => option.display_name}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Location"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Enter a location"
                />
            )}
            renderOption={(props, option) => (
                <li {...props}>{option.display_name}</li>
            )}
        />
    );
};

export default LocationAutocomplete;
