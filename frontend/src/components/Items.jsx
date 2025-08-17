import React, { useEffect, useState } from 'react';
import api from "../api.js";
import ItemForm from './ItemForm';

const ItemList = () => {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const response = await api.get('/items');
      setItems(response.data.items);
    } catch (error) {
      console.error("Error fetching items", error);
    }
  };

  const addItem = async (itemName) => {
    try {
      await api.post('/items', { name: itemName });
      fetchItems();
    } catch (error) {
      console.error("Error adding item", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="item-list-container">
      <ItemForm addItem={addItem} />
      <ul className="item-list">
        {items.length === 0 ? (
          <p className="empty-text">No items yet. Add one above! ✨</p>
        ) : (
          items.map((item, index) => (
            <li key={index} className="item-card">{item.name}</li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ItemList;
