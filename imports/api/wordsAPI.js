import { Meteor } from "meteor/meteor";
import axios from "axios";

if (Meteor.isServer) {
	Meteor.methods({
		"getData"(param) {
			const wordsAPI = axios.create({
				baseURL: "https://wordsapiv1.p.rapidapi.com/words/",
				headers: {
					"X-RapidAPI-Key": Meteor.config.apiKey
				}
			});

			return wordsAPI
				.get(param)
				.then(res => {
					return res.data;
				});
		}
	});
}
