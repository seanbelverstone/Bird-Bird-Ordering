module.exports = (sequelize, DataTypes) => {
	
	const Order = sequelize.define("Order", {
	  name: DataTypes.STRING,
	  telephone: DataTypes.STRING,
	  email: DataTypes.STRING,
	  biscuitQuantity: DataTypes.DECIMAL,
	  gravy: DataTypes.BOOLEAN,
	  jam: DataTypes.BOOLEAN,
	  totalCost: DataTypes.DECIMAL(10,2),
	  pickupDateTime: DataTypes.STRING,
	  specialInstructions: DataTypes.STRING
	}, {});
  
	Order.sync();
	return Order;
  };