import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';

// Fix nock issue with axios for testing
const host = 'http://localhost';
axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;

export default function(query, variables) {
  return new Promise((resolve, reject) => {
    axios.post('http://localhost:4000/graphql', { query, variables })
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
}
