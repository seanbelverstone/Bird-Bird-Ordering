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
	
	getOrders: function(
		
	)
}