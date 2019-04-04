import { Meteor } from "meteor/meteor";
import axios from "axios";
import apiKey from "./wordsAPI_config.js";

if (Meteor.isServer) {
	Meteor.methods({
		"getData"(param) {
			const wordsAPI = axios.create({
				baseURL: "https://wordsapiv1.p.rapidapi.com/",
				headers: {
					"X-RapidAPI-Key": apiKey.KEY
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
