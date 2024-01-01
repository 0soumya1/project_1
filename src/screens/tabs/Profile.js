import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {BASE_URL, USER_PROFILE} from '../../utils/Strings';
import {useSelector} from 'react-redux';
import {THEME_COLOR, THEME_COLOR2} from '../../utils/Colors';

const Profile = () => {
  const isfocused = useIsFocused();
  const authData = useSelector(state => state.auth);
  // console.log("authDATA---", authData)
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getProfileData();
  }, [isfocused]);

  const getProfileData = () => {
    fetch(BASE_URL + USER_PROFILE + authData.data.data._id)
      .then(res => res.json())
      .then(json => {
        setUserData(json.data);
        console.log('json-----', json);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.profileView}>
        <Image
          source={require('../../images/user1.png')}
          style={styles.profile}
        />
      </View>

      <Text style={styles.name}>{userData ? userData.name : ''}</Text>
      <Text style={styles.emailId}>{userData ? userData.emailId : ''}</Text>

      <TouchableOpacity style={styles.editBtn}>
        <Text style={styles.editBtnText}>Edit Profile</Text>
      </TouchableOpacity>

      <View style={styles.followersView}>
        <View style={styles.countView}>
          <Text style={styles.values}>
            {userData ? userData.followers.length : 0}
          </Text>
          <Text style={styles.title}>{'Followers'}</Text>
        </View>
        <View style={styles.countView}>
          <Text style={styles.values}>
            {userData ? userData.following.length : 0}
          </Text>
          <Text style={styles.title}>{'Following'}</Text>
        </View>
        <View style={styles.countView}>
          <Text style={styles.values}>{0}</Text>
          <Text style={styles.title}>{'Posts'}</Text>
        </View>
      </View>

    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileView: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: THEME_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  profile: {
    width: 50,
    height: 50,
    tintColor: 'white',
  },
  name: {
    fontSize: 30,
    alignSelf: 'center',
    marginTop: 20,
    color: 'black',
    fontWeight: '500',
  },
  emailId: {
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 10,
    color: 'black',
    fontWeight: '500',
  },
  editBtn: {
    width: 200,
    height: 45,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor:THEME_COLOR,
  },
  editBtnText:{
    color:"white",
    fontSize:17,
  },
  followersView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // alignItems: 'center',
    // alignSelf: 'center',
    marginTop: 20,
  },
  countView: {
    alignItems: 'center',
  },
  values:{
    fontSize:20,
    fontWeight:"500",
    color:"black",
  },
  title:{
    fontSize:15,
    marginTop:5,
  }
});
