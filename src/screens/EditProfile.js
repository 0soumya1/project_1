import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {THEME_COLOR, THEME_COLOR2} from '../utils/Colors';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {BASE_URL, UPDATE_USER} from '../utils/Strings';
import {useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import Loader from '../components/Loader';
import CustomTextInput from '../components/CustomTextInput';

const EditProfile = () => {
  const route = useRoute();
  const [cover, setCover] = useState(
    route.params.data.coverPic == '' ? '' : route.params.data.coverPic,
  );
  const [profile, setProfile] = useState(
    route.params.data.profilePic == '' ? '' : route.params.data.profilePic,
  );
  const [name, setName] = useState(
    route.params.data.name == '' ? '' : route.params.data.name,
  );
  const [badName, setBadName] = useState('');
  const [mobile, setMobile] = useState(
    route.params.data.mobile == '' ? '' : route.params.data.mobile,
  );
  const [bio, setBio] = useState(
    route.params.data.bio == '' ? '' : route.params.data.bio,
  );
  const [address, setAddress] = useState(
    route.params.data.address == '' ? '' : route.params.data.address,
  );
  const [imageData, setImageData] = useState(null);
  const [isCoverEditable, setIsCoverEditable] = useState(false);
  const [isProfileEditable, setIsProfileEditable] = useState(false);
  const authData = useSelector(state => state.auth);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const openGallery = async type => {
    const res = await launchImageLibrary({mediaType: 'photo'});
    if (!res.didCancel) {
      if (type == 'cover') {
        setCover(res.assets[0].uri);
        setIsCoverEditable(true);
        setIsProfileEditable(false);
      } else {
        setProfile(res.assets[0].uri);
        setIsCoverEditable(false);
        setIsProfileEditable(true);
      }
      setImageData(res);
    }
  };

  const uploadImage = async () => {
    setLoading(true);
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

  const updateCoverPic = url => {
    setLoading(true);
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
        setLoading(false);
        setImageData(null);
        setCover('');
        setIsCoverEditable(false);
        setIsProfileEditable(false);
        navigation.goBack();
      })
      .catch(error => console.log('error', error));
  };

  const updateProfilePic = url => {
    setLoading(true);
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
      .then(result => {
        setLoading(false);
        setImageData(null);
        setProfile('');
        setIsCoverEditable(false);
        setIsProfileEditable(false);
        navigation.goBack();
      })
      .catch(error => console.log('error', error));
  };

  const updateChanges = () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      name: name,
      mobile: mobile,
      bio:bio,
      address:address,
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
        setLoading(false);
        navigation.goBack();
      })
      .catch(error => console.log('error', error));
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Change Cover Pic</Text>
      <TouchableOpacity
        style={styles.coverBtn}
        onPress={() => {
          openGallery('cover');
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

      <Text style={styles.heading}>Change Profile Pic</Text>
      <TouchableOpacity
        style={styles.profileBtn}
        onPress={() => {
          openGallery('profile');
        }}>
        {profile != '' ? (
          <Image
            source={{uri: profile}}
            style={[
              styles.profileBtn,
              {
                backgroundColor: 'transparent',
                padding: 0,
                marginTop: 0,
                marginLeft: 0,
              },
            ]}
          />
        ) : (
          <Image source={require('../images/gallery.png')} style={styles.img} />
        )}
        <Image source={require('../images/edit.png')} style={styles.edit} />
      </TouchableOpacity>

      {isProfileEditable && (
        <TouchableOpacity
          style={styles.uploadBtn}
          onPress={() => {
            uploadImage();
          }}>
          <Text style={{color: 'white', fontSize: 16}}>Upload</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.heading}>Change Other Details</Text>
      <CustomTextInput
        placeHolder={'Enter Name'}
        placeholderTextColor={'#888'}
        value={name}
        onChangeText={txt => setName(txt)}
        isValid={badName == '' ? true : false}
      />
      <CustomTextInput
        placeHolder={'Enter Mobile'}
        placeholderTextColor={'#888'}
        value={mobile}
        onChangeText={txt => setMobile(txt)}
        keyboardType={'number-pad'}
        isValid={true}
      />
      <CustomTextInput
        placeHolder={'Enter Bio'}
        placeholderTextColor={'#888'}
        value={bio}
        onChangeText={txt => setBio(txt)}
        isValid={true}
      />
      <CustomTextInput
        placeHolder={'Enter Address'}
        placeholderTextColor={'#888'}
        value={address}
        onChangeText={txt => setAddress(txt)}
        isValid={true}
      />
      <TouchableOpacity style={styles.updateBtn} onPress={()=>{
        updateChanges()
      }}>
        <Text style={{fontSize: 16, color: 'white'}}>Save</Text>
      </TouchableOpacity>
      <Loader visible={loading} />
    </ScrollView>
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
  profileBtn: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: THEME_COLOR2,
    marginLeft: 20,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 17,
    color: 'black',
    marginLeft: 20,
    marginTop: 20,
    fontWeight: '500',
  },
  updateBtn: {
    width: '90%',
    height: 50,
    marginBottom: 50,
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: THEME_COLOR2,
  },
});
