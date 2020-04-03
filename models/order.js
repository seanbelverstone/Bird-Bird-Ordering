module.exports = (sequelize, DataTypes) => {
	const Order = sequelize.define("Order", {
	  name: DataTypes.STRING,
	  telephone: DataTypes.INTEGER,
	  biscuitQuantity: DataTypes.INTEGER,
	  collectionDate: DataTypes.INTEGER,
	  collectionTime: DataTypes.DECIMAL,
	  totalCost: DataTypes.INTEGER,
	}, {});
  
	Order.sync({force: true});
	return Order;
  };