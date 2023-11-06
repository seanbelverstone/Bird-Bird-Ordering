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

	updateComplete: (id, type, updatedValue) => {
		console.log(`ID: ${id} ${type}: ${updatedValue}`)
		return axios.patch(`/api/order/${id}`, {
			id,
			[type]: updatedValue
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