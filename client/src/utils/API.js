import axios from "axios";

export default {

	createOrder: function(
		name, 
		telephone, 
		email, 
		biscuitQuantity,
		totalCost,
		pickupDateTime,
		specialInstructions) {
			return axios.post("/api/order", {
				name, 
				telephone, 
				email, 
				biscuitQuantity, 
				totalCost, 
				pickupDateTime, 
				specialInstructions})
		},
	
	getAllOrders: () => {
		return axios.get("/api/order/all")
	}
}