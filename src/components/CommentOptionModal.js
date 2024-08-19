import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';

const CommentOptionModal = ({onClick, onClose, visible}) => {
  return (
    <Modal
      onRequestClose={() => {
        onClose();
      }}
      transparent
      visible={visible}>
      <TouchableOpacity
        style={{backgroundColor: 'rgba(0,0,0,.2)', flex: 1}}
        onPress={() => {
          onClose();
        }}>
        <TouchableWithoutFeedback>
          <View
            style={{
              width: '100%',
              paddingBottom: 20,
              backgroundColor: '#fff',
              bottom: 0,
              position: 'absolute',
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                marginTop: 20,
                marginLeft: 20,
              }}>
              Comment Options
            </Text>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                width: '90%',
                height: 50,
                alignItems: 'center',
                alignSelf: 'center',
                marginTop: 5,
              }}
              onPress={() => {
                onClick(1);
              }}>
              <Image
                source={require('../images/edit.png')}
                style={{width: 22, height: 22}}
              />
              <Text style={{color: 'black', marginLeft: 10}}>Edit Comment</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                width: '90%',
                height: 50,
                alignItems: 'center',
                alignSelf: 'center',
              }}
              onPress={() => {
                onClick(2);
              }}>
              <Image
                source={require('../images/delete.png')}
                style={{width: 22, height: 22}}
              />
              <Text style={{color: 'black', marginLeft: 10}}>
                Delete Comment
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default CommentOptionModal;
