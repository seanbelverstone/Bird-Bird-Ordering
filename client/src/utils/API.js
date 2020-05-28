import axios from "axios";

export default {

	createOrder: (
		name, 
		telephone, 
		email, 
		biscuitQuantity,
		jam,
		gravy,
		totalCost,
		pickupDateTime,
		completed,
		specialInstructions) => {
			return axios.post("/api/order", {
				name, 
				telephone, 
				email, 
				biscuitQuantity, 
				gravy,
				jam,
				totalCost, 
				pickupDateTime,
				completed,
				specialInstructions})
		},
	
	getAllOrders: () => {
		return axios.get("/api/order/all")
	},

	getOneOrder: (id) => {
		return axios.get(`/api/order/${id}`)
	},

	updateComplete: (id, completed) => {
		console.log(`ID: ${id} COMPLETE?: ${completed}`)
		return axios.put(`/api/order/${id}`, {
			id,
			completed
		});
	},

	validateLogin: (username, password, secretUsername, secretPassword) => {
		return axios.post("/api/login", {
			username,
			password,
			secretUsername,
			secretPassword
		})
	}
}