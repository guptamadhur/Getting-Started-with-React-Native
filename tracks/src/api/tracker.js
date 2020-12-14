import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

let url;
if (__DEV__) {
  url = 'http://7ac9071eddeb.ngrok.io';
} else {
  url = 'https://sleepy-savannah-10606.herokuapp.com';
}

const instance = axios.create({
  baseURL: url
});

instance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

export default instance;
