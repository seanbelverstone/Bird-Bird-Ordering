import jwt from "jsonwebtoken";
require("dotenv").config();

module.exports = {
	
	validate: (request, response) => {
		
		if (request.body.username === request.body.secretUsername && request.body.password === request.body.secretPassword) {
			console.log("Yahoo logged in");
			const token = jwt.sign(request.body, "your_jwt_secret", {
				expiresIn: "6hr"
			});
			const complete = true;
			return response.json({
				token,
				complete
			})
			
		} else {
			const complete = false;
			return response.json({
				complete
			})
			
		}
	}

}