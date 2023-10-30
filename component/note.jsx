// CART
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Button, TextInput} from 'react-native-paper';
import style from './style';

const App = () => {
  const [note, setNote] = useState('');
  const [heading, setHeading] = useState('');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    console.log('cart', cart);
  }, [cart]);

  const handleAddToCart = () => {
    let obj = {
      id: Math.random(),
      heading: heading,
      note: note,
      date: new Date(),
    };
    setCart([...cart, obj]);
   
  };

  // console.log(new Date().substring(0, 10), "abcd");

  const handleComplete = i => {
    let arr = [...cart];
    arr[i].complete = true;
    setCart(arr);
  };
  const handleRemoveItem = i => {
    let arr = [...cart];
    arr.splice(i, 1);
    setCart(arr);
  };

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Text>.</Text>
        <TextInput
          mode="outlined"
          label="Heading"
          value={heading}
          onChangeText={e => setHeading(e)}
        />
        <TextInput
          mode="outlined"
          label="note"
          value={note}
          onChangeText={e => setNote(e)}
        />
        <Button onPress={() => handleAddToCart()}>Add note</Button>

        {cart.length > 0 && (
          <>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>Notes:</Text>
              <Button onPress={() => setCart([])}>clearAll</Button>
            </View>

            <FlatList
              data={cart}
              renderItem={({item, index}) => (
                <View style={style.card2}>
                  <View style={style.card1}>
                    <Text>{item.date.toString().substring(0, 10)}</Text>
                    
                    {item?.complete ? (
                     <Text>Done</Text>
                    ) : (
                      <Button onPress={() => handleComplete(index)}>
                        complete
                      </Button>
                    )}
                    <Button onPress={() => handleRemoveItem(index)}>X</Button>
                  </View>
                  <Text>Heading: {item.heading}</Text>
                  <Text>Note: {item.note}</Text>
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
