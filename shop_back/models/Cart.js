import { DataTypes, Model } from "sequelize";
import sequelize from "../services/sequelize";
import Users from "./Users";

class Cart extends Model {

}

Cart.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

    totalQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },

    totalPrice: {
        // type: DataTypes.DECIMAL(10, 2)
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
    },

    // status: {
    //     type: DataTypes.ENUM('pending', 'shipped', 'delivered'),
    //     allowNull: false
    // }

  // userId: {}


}, {
    sequelize,
    tableName: 'cart',
    modelName: 'cart',

});

Cart.belongsTo(Users, {
    foreignKey: 'userId',
    as: 'userCart',
    onUpdate: 'cascade',
    onDelete: 'cascade',
});

Users.hasOne(Cart, {
    foreignKey: 'userId',
    as: 'cartUser',
    onUpdate: 'cascade',
    onDelete: 'cascade',
})

export default Cart;


//
// const Sequelize = require('sequelize');
// const sequelize = new Sequelize('database', 'username', 'password', {
//     host: 'localhost',
//     dialect: 'mysql'
// });
//
// const Cart = sequelize.define('cart', {
//     id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     quantity: {
//         type: Sequelize.INTEGER,
//         allowNull: false
//     },
//     total_price:{
//         type: Sequelize.DECIMAL(10, 2),
//         allowNull: false
//     }
// });
//
// Product.hasMany(Cart);
// Cart.belongsTo(Product);
// User.hasMany(Cart);
// Cart.belongsTo(User);
//
// Cart.prototype.addProduct = function(product,quantity) {
//     return this.update({
//         quantity: this.quantity + quantity,
//         total_price: this.total_price + (quantity * product.price)
//     });
// };
//
// Cart.prototype.removeProduct = function(product) {
//     return this.update({
//         quantity: this.quantity - 1,
//         total_price: this.total_price - product.price
//     });
// };
//

