module.exports = (sequelize, DataTypes) => {
	
	const Order = sequelize.define("Order", {
	  name: DataTypes.STRING,
	  telephone: DataTypes.STRING,
	  email: DataTypes.STRING,
	  biscuitQuantity: DataTypes.DECIMAL(2,1),
	  jam: DataTypes.TINYINT(1),
	  gravy: DataTypes.TINYINT(1),
	  totalCost: DataTypes.DECIMAL(10,2),
	  pickupDateTime: DataTypes.STRING,
	  completed: DataTypes.TINYINT(1)
	}, {});
  
	Order.sync();
	return Order;
  };