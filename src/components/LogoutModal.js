import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

const CommanModel = props => {
  
  return (
    <Modal
      transparent={true}
      onRequestClose={props.onRequestClose}
      visible={props.visible}
      animated={true}
      animationType="slide">
      <TouchableOpacity style={styles.container} onPress={props.onRequestClose}>
        <TouchableWithoutFeedback>
          <View style={styles.detailContant}>
            <Text style={styles.modalTitle}>{props.modelTitle}</Text>
            <Text style={styles.modalDes}>{props.description}</Text>

            <View>
              <View style={styles.btnView}>
                <TouchableOpacity
                  style={styles.leftBtn}
                  onPress={props.onPressLeftButton}>
                  <Text style={styles.btnText}>{props.leftButtonText}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.Rightbtn}
                  onPress={props.onPressRightButton}>
                  <Text style={styles.btnText}>{props.rightButtonText}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default CommanModel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000060',
  },
  detailContant: {
    backgroundColor: '#fff',
    width: '85%',
    alignSelf: 'center',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    color: '#000',
    fontSize: 22,
    textAlign: 'center',
  },
  modalDes: {
    color: '#000',
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 20,
  },
  Rightbtn: {
    backgroundColor: 'green',
    height: 40,
    width: 120,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftBtn: {
    height: 40,
    width: 120,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    // borderWidth: 1,
    // borderColor: Color.colorGreen,
  },
});
