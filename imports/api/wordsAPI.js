import axios from "axios";
import apiKey from "./wordsAPI_config.js";

export default axios.create({
	baseURL: "https://wordsapiv1.p.rapidapi.com/",
	headers: {
		"X-RapidAPI-Key": apiKey.KEY
	}
});
