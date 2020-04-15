module.exports = (sequelize, DataTypes) => {
	
	const Order = sequelize.define("Order", {
	  name: DataTypes.STRING,
	  telephone: DataTypes.STRING,
	  biscuitQuantity: DataTypes.INTEGER,
	  collectionDate: DataTypes.DATEONLY,
	  collectionTime: DataTypes.TIME,
	  totalCost: DataTypes.INTEGER,
	}, {});
  
	Order.sync({force: true});
	return Order;
  };