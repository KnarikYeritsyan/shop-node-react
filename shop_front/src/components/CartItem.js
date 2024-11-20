// import React from 'react';
//
// function CartItem(props) {
//     return (
//         <div></div>
//     );
// }
//
// export default CartItem;

import React, { useState } from 'react';

function ShoppingCartPage() {
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1', price: 9.99, quantity: 1 },
    { id: 2, name: 'Item 2', price: 14.99, quantity: 1 },
    { id: 3, name: 'Item 3', price: 19.99, quantity: 1 },
  ]);

  const handleQuantityChange = (id, newQuantity) => {
    setItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = id => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <h1>Shopping Cart</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={e => handleQuantityChange(item.id, e.target.value)}
                />
              </td>
              <td>{item.price * item.quantity}</td>
              <td>
                <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <strong>Total:</strong> {total}
      </div>
    </div>
  );
}

export default ShoppingCartPage;