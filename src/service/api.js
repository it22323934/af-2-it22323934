import axios from 'axios';

const API_BASE = 'https://restcountries.com/v3.1';

export const fetchAllCountries = async () => {
  const response = await axios.get(`${API_BASE}/all`);
  return response.data;
};

export const fetchCountryByName = async (name) => {
  const response = await axios.get(`${API_BASE}/name/${name}`);
  return response.data;
};

export const fetchCountriesByRegion = async (region) => {
  const response = await axios.get(`${API_BASE}/region/${region}`);
  return response.data;
};

export const fetchCountryByCode = async (code) => {
  const response = await axios.get(`${API_BASE}/alpha/${code}`);
  return response.data[0];
};