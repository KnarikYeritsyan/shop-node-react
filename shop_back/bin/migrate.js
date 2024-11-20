// // import { Users, Brands, Basket, Products, Categories } from "../models";
// import { Users, Basket } from "../models";
//
// // const models= {Users, Brands, Basket, Products, Categories};
// const models= {Users,Basket};
// async function main() {
//
//   for (const i in  models)  {
//     console.log(i);
//   //  Users,
//     // Brands,
//     // Basket,
//     // Products,
//     // Categories
//  // ])  {
//     await models[i].sync({alert:true});
//   }
//
// process.exit();
//
//   // await Users.sync({ alter: true, logging: true });
//   // await Brands.sync({ alter: true, logging: true });
//
// }
//
// main().catch(console.error);


import {
  Users,
  Brands,
  Cart,
  Products,
  Categories,
  ProductItems,
  CartItems,
  Ratings,
  Orders,
  OrderItems,
  Favorites,
} from "../models";


async function main() {

  for (const Model of  [
     Users,
    Brands,
    Cart,
    Categories,
    Products,
    ProductItems,
    CartItems,
    Ratings,
    Orders,
    OrderItems,
    Favorites,

  ])  {
    console.log(Model)
    await Model.sync({alter:true, logging: true});
  }

  process.exit();

}

main().catch(console.error);