import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {THEME_COLOR, THEME_COLOR2} from '../utils/Colors';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {BASE_URL, UPDATE_USER} from '../utils/Strings';
import {useSelector} from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Loader from '../components/Loader';

const EditProfile = () => {
  const [cover, setCover] = useState('');
  const [imageData, setImageData] = useState(null);
  const [isCoverEditable, setIsCoverEditable] = useState(false);
  const [isProfileEditable, setIsProfileEditable] = useState(false);
  const authData = useSelector(state => state.auth);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const openGallery = async () => {
    const res = await launchImageLibrary({mediaType: 'photo'});
    if (!res.didCancel) {
      setCover(res.assets[0].uri);
      setImageData(res);
      setIsCoverEditable(true);
    }
  };

  const uploadImage = async () => {
    const reference = storage().ref(imageData.assets[0].fileName); //create ref
    const pathToFile = imageData.assets[0].uri;
    // uploads file
    await reference.putFile(pathToFile);
    url = await storage().ref(imageData.assets[0].fileName).getDownloadURL();
    if (isProfileEditable) {
      updateProfilePic(url);
    } else {
      updateCoverPic(url);
    }
  };

  const updateProfilePic = url => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      profilePic: url,
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(BASE_URL + UPDATE_USER + authData.data.data._id, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };
  const updateCoverPic = url => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      coverPic: url,
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(BASE_URL + UPDATE_USER + authData.data.data._id, requestOptions)
      .then(response => response.text())
      .then(result => {
        setImageData(null)
        setCover("")
        setIsCoverEditable(false)
        setIsProfileEditable(false)
        navigation.goBack();
      })
      .catch(error => console.log('error', error));
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.coverBtn}
        onPress={() => {
          openGallery();
        }}>
        {cover != '' ? (
          <Image source={{uri: cover}} style={styles.coverStyle} />
        ) : (
          <Image source={require('../images/gallery.png')} style={styles.img} />
        )}

        <Image source={require('../images/edit.png')} style={styles.edit} />
      </TouchableOpacity>
      {isCoverEditable && (
        <TouchableOpacity
          style={styles.uploadBtn}
          onPress={() => {
            uploadImage();
          }}>
          <Text style={{color: 'white', fontSize: 16}}>Upload</Text>
        </TouchableOpacity>
      )}
      <Loader visible={loading}/>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  coverBtn: {
    width: '90%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: THEME_COLOR2,
    borderRadius: 10,
    marginTop: 10,
  },
  img: {
    width: 50,
    height: 50,
    tintColor: 'white',
  },
  edit: {
    width: 20,
    height: 20,
    tintColor: 'white',
    position: 'absolute',
    top: 10,
    right: 10,
  },
  coverStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  uploadBtn: {
    width: 120,
    height: 50,
    backgroundColor: THEME_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 20,
    borderRadius: 10,
  },
});
