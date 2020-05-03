module.exports = (sequelize, DataTypes) => {
	
	const Order = sequelize.define("Order", {
	  name: DataTypes.STRING,
	  telephone: DataTypes.STRING,
	  biscuitQuantity: DataTypes.INTEGER,
	  collectionDate: DataTypes.DATEONLY,
	  collectionTime: DataTypes.TIME,
	  totalCost: DataTypes.INTEGER,
	}, {});
  
	Order.sync();
	return Order;
  };

//   Maybe change date and time to dateTime
// Add in email
// Add in special notes