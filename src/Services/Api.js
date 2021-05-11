const axios = require('axios');

export default class Api {

	static get = async (url) => {
		return new Promise((resolve, reject) => {
		    axios.get(url).then(function (response) {
			    resolve(response.data);
			}).catch(function (error) {
			    reject(error);
			}).finally(function () {
			    // always executed
			});

		});

	};

	static post = async (url, data) => {

		return new Promise((resolve, reject) => {
			axios.post(url, data).then(function (response) {
				console.log("response",response)
				resolve(response.data);
			}).catch(function (error) {
				console.log('post api error', error);
				reject(error.message);
			});
		});
	};
}