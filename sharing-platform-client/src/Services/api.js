import axios from 'axios';

const API_BASE_URL = 'https://api.example.com'; // Replace with your actual API base URL

// Fetch listings
export const fetchListings = async () => {
    const response = await axios.get(`${API_BASE_URL}/listings`);
    return response.data;
};

// Create a new listing
export const createListing = async (data) => {
    const response = await axios.post(`${API_BASE_URL}/listings`, data);
    return response.data;
};

// Update an existing listing
export const updateListing = async (id, data) => {
    const response = await axios.put(`${API_BASE_URL}/listings/${id}`, data);
    return response.data;
};

// Delete a listing
export const deleteListing = async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/listings/${id}`);
    return response.data;
};
