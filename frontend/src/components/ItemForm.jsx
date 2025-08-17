import React, { useState } from 'react';

const ItemForm = ({ addItem }) => {
  const [itemName, setItemName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (itemName.trim()) {
      addItem(itemName.trim());
      setItemName('');
    }
  };

  return (
    <form className="item-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        placeholder="Enter an item..."
      />
      <button type="submit">＋</button>
    </form>
  );
};

export default ItemForm;
