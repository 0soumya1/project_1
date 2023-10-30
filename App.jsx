import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Button, PaperProvider} from 'react-native-paper';
import style from './style';

const App = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const itemList = [
    {price: 70, name: 'pizza'},
    {price: 30, name: 'dosa'},
    {price: 40, name: 'burger'},
    {price: 50, name: 'momos'},
    {price: 60, name: 'biryani'},
    {price: 20, name: 'paneer'},
  ];
  // console.log(itemList);

  useEffect(() => {
    console.log(cart, 'cart');
  }, [cart]);

  // const handleAddToCart = item => {
  //   // console.log(item, "item")
  //   item.qty = 1;
  //   item.amount = item.price;
  //   setCart([...cart, item]);
  //   handleTotal([...cart, item])
  // };

  const handleAddToCart = item => {
    item.qty = 1;
    item.amount = item.price;
    if (cart.length == 0) {
      setCart([item]);
      handleTotal([...cart, item]);
    } else {
      let exist = cart.some(a => a.name == item.name);
      if (!exist) {
        setCart([...cart, item]);
        handleTotal([...cart, item]);
      }
    }
  };

  const handleQtyInc = i => {
    let arr = [...cart];
    arr[i].qty = arr[i].qty + 1;
    arr[i].amount = arr[i].qty * arr[i].price;
    handleTotal(arr);
    setCart(arr);
  };

  const handleQtyDec = i => {
    let arr = [...cart];
    if (arr[i].qty > 1) {
      arr[i].qty = arr[i].qty - 1;
      arr[i].amount = arr[i].qty * arr[i].price;
      handleTotal(arr);
      setCart(arr);
    }
  };

  const handleRemoveItem = i => {
    let arr = [...cart];
    arr.splice(i, 1);
    handleTotal(arr);
    setCart(arr);
  };

  const handleTotal = arr => {
    let sum = 0;
    arr.map(a => {
      sum = sum + a.amount;
    });
    setTotal(sum);
  };

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Text>ItemList</Text>

        {itemList.length > 0 && (
          <FlatList
            data={itemList}
            renderItem={({item}) => (
              <View style={style.card}>
                <Text>{item?.name}</Text>
                <Text>₹{item?.price}</Text>
                <Button onPress={() => handleAddToCart(item)}>Add</Button>
              </View>
            )}
          />
        )}
        {cart.length > 0 && (
          <>
            <View style={style.card}>
              <Text>Cart:</Text>
              <Text>Total:{total}</Text>
              <Button onPress={() => setCart([])}>Clear Cart</Button>
            </View>

            <FlatList
              data={cart}
              renderItem={({item, index}) => (
                <View style={style.card}>
                  <Text>{item.name}</Text>
                  <Text>qty: {item.qty}</Text>
                  <Text>price: {item.price}</Text>

                  <Button onPress={() => handleQtyInc(index)}>+</Button>
                  <Button onPress={() => handleQtyDec(index)}>-</Button>
                  <Button onPress={() => handleRemoveItem(index)}>X</Button>
                </View>
              )}
            />
          </>
        )}
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App;
