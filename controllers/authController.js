import jwt from "jsonwebtoken";

module.exports = {
	
	validate: (request, response) => {
		if (request.username === process.env.USERNAME && request.password === process.env.PASSWORD) {
			console.log("Yahoo logged in")
		} else {
			console.log("nope, sorry")
		}
	}

}