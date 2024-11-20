import { DataTypes, Model } from "sequelize";
import sequelize from "../services/sequelize";



import Users from "./Users";
import ProductItems from "./ProductItems";

class Orders extends Model {

};

Orders.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    // userId: {},
    // productItemId: {},
    // paymentMethod: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    // },

    orderItems: {
        type: DataTypes.JSON,
        allowNull: false,
    },

    totalPrice: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },

    country: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    status: {
        type: DataTypes.ENUM('completed', 'pending', 'canceled'),
        allowNull: false,
        defaultValue: 'pending'
    },

}, {
    sequelize,
    tableName: 'orders',
    modelName: 'orders',
});

Orders.belongsTo(Users, {
    foreignKey: 'userId',
    as: 'order_user',
    onUpdate: 'cascade',
    onDelete: 'cascade',
});

Users.hasMany(Orders, {
    foreignKey: 'userId',
    as: 'user_order',
    onUpdate: 'cascade',
    onDelete: 'cascade',
});

// Orders.belongsTo(ProductItems, {
//     foreignKey: 'productItemId',
//     as: 'order_productItem',
//     onUpdate: 'cascade',
//     onDelete: 'cascade',
// });
//
// ProductItems.hasMany(Orders, {
//     foreignKey: 'productItemId',
//     as: 'productItem_order',
//     onUpdate: 'cascade',
//     onDelete: 'cascade',
// })

export default Orders;