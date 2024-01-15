import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {THEME_COLOR2} from '../utils/Colors';

const UpdateModal = ({onClick, onClose, visible, data}) => {
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    setCaption(data && data.item.caption ? data.item.caption : '');
    setImageUrl(data && data.item.imageUrl ? data.item.imageUrl : '');
  }, [visible]);

//   console.log('data--------1111111111111111', data);

  return (
    <Modal
      onRequestClose={() => {
        onClose();
      }}
      transparent
      visible={visible}>
      <View style={{backgroundColor: 'rgba(0,0,0,.2)', flex: 1}}>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
            bottom: 0,
            position: 'absolute',
          }}>
          <View
            style={{
              width: '100%',
              height: 50,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                onClose();
              }}>
              <Image
                source={require('../images/close.png')}
                style={{width: 20, height: 20}}
              />
            </TouchableOpacity>
            <Text style={{color: 'black', fontSize: 20, marginLeft: 20}}>
              Edit Post
            </Text>
          </View>

          <View
            style={{
              width: '90%',
              height: 100,
              alignSelf: 'center',
              borderWidth: 1,
              borderRadius: 10,
              borderColor: '#9e9e9e',
              padding: 10,
              marginTop: 20,
            }}>
            <TextInput
              value={caption}
              onChangeText={txt => setCaption(txt)}
              placeholder="Type caption here..."
            />
          </View>

          {imageUrl != '' && (
            <Image
              source={{uri: imageUrl}}
              style={{
                width: '90%',
                height: 200,
                marginTop: 40,
                alignSelf: 'center',
                opacity: 0.5,
              }}
            />
          )}
          <TouchableOpacity
            style={{
              width: '90%',
              height: 50,
              marginTop: 20,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              borderRadius: 10,
              backgroundColor: THEME_COLOR2,
            }}
            onPress={() => onClick(caption)}>
            <Text style={{color: 'white', fontSize: 16}}>Update Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default UpdateModal;
