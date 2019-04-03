import axios from "axios";
import KEY from "wordAPI_config.js";

export default axios.create({
	baseURL: "https://wordsapiv1.p.rapidapi.com/",
	headers: {
		"X-RapidAPI-Key": KEY
	}
});
