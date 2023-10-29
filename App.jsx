import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Button} from 'react-native-paper';

const App = () => {
  const [cart, setCart] = useState([]);

  const itemList = [
    {qty: 1, price: 10, name: 'pizza'},
    {qty: 1, price: 10, name: 'dosa'},
    {qty: 1, price: 10, name: 'burger'},
    {qty: 1, price: 10, name: 'idli'},
    {qty: 1, price: 10, name: 'momos'},
    {qty: 1, price: 10, name: 'biryani'},
    {qty: 1, price: 10, name: 'paneer'},
    {qty: 1, price: 10, name: 'vada'},
    {qty: 1, price: 10, name: 'pav'},
    {qty: 1, price: 10, name: 'chai'},
  ];
  // console.log(itemList);

  const handleAddToCart = item => {
    // console.log(item, "item")
    setCart([...cart, item]);
  };

  useEffect(() => {
    console.log(cart, 'cart');
  }, [cart]);

  return (
    <View>
      {itemList.length > 0 && (
        <FlatList
          data={itemList}
          renderItem={({item}) => (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                padding: 1,
                margin: 2,
              }}>
              <Text>{item?.name}</Text>
              <Text>₹{item?.price}</Text>
              <TouchableOpacity onPress={() => handleAddToCart(item)}>
                <Text>Add</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <View style={{margin: '50px', padding: '50px'}}>
        <Text>Cart:</Text>
        <TouchableOpacity onPress={() => setCart([])}>
          <Text>clear Cart:</Text>
        </TouchableOpacity>
      </View>
      {cart.length > 0 && (
        <FlatList
          data={cart}
          renderItem={({item}) => (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                padding: 1,
                margin: 2,
              }}>
              <Text>{item.name}</Text>
              <Text>{item.price}</Text>
              {/* <TouchableOpacity onPress={() => setCart([...cart, item])}>
                <Text>add</Text>
              </TouchableOpacity> */}
            </View>
          )}
        />
      )}
    </View>
  );
};

export default App;
