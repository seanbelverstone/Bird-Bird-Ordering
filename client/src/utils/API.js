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
				specialInstructions})
		},
	
	getAllOrders: () => {
		return axios.get("/api/order/all")
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