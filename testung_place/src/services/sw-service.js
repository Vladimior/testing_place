import axios from "axios";
//  base url The Star Wars API
const _baseDataUrl = 'https://swapi.dev/api/';
// base url get img
const _baseImgUrl = 'https://starwars-visualguide.com/assets/img/';

const SwService = {
    // get person via id (returns object with the following properties name, gender, birthYear, eyeColor, image'url')
    getPerson: async (id) => {
        try {
            const response = await axios.get(`${_baseDataUrl}people/${id}/`);
            const { name, gender, birth_year: birthYear, eye_color: eyeColor } = response.data;
            const image = `${_baseImgUrl}characters/${id}.jpg`;
            return { name, gender, birthYear, eyeColor, image };
        } catch (error) {
            console.error(`Error fetching person ${id}`, error);
            throw error;
        }
    },
    // get planets via id (returns object with the following properties name, climate, gravity, terrain, image'url')
    getPlanets: async (id) => {
        try {
            const response = await axios.get(`${_baseDataUrl}planets/${id}/`);
            const { name, climate, gravity, terrain } = response.data;
            const image = `${_baseImgUrl}planets/${id}.jpg`;
            return { name, climate, gravity, terrain, image };
        } catch (error) {
            console.error(`Error fetching planets ${id}`, error);
            throw error;
        }
    },
    // get starships via id (returns object with the following properties name, model, length, passengers, image'url')
    getStarships: async (id) => {
        try {
            const response = await axios.get(`${_baseDataUrl}starships/${id}/`);
            const { name, model, length, passengers } = response.data;
            const image = `${_baseImgUrl}starships/${id}.jpg`;
            return { name, model, length, passengers, image };
        } catch (error) {
            console.error(`Error fetching starships ${id}`, error);
            throw error;
        }
    },
};

export default SwService;