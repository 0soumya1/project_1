import {View, Text, TextInput} from 'react-native';
import React from 'react';

const CustomTextInput = ({
  mt,
  placeHolder,
  onChangeText,
  isValid,
  keyboardType,
  value,
  type,
}) => {
  return (
    <View
      style={{
        width: '90%',
        height: 55,
        borderWidth: 1,
        borderColor: isValid ? "#9e9e9e" : "red",
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: mt ? mt : 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 5,
      }}>
      <TextInput
        style={{ width:'100%'}}
        placeholder={placeHolder}
        onChangeText={txt => onChangeText(txt)}
        value={value}
        keyboardType={keyboardType ? keyboardType: "default"}
        secureTextEntry={type ? true : false}
      />
    </View>
  );
};

export default CustomTextInput;
