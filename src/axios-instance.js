import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burgerbuilder-940e7.firebaseio.com/'
});

export default instance;