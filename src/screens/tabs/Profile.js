import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  BackHandler,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  BASE_URL,
  DELETE_POST,
  FEEDS,
  LIKE_POST,
  UPDATE_POST,
  USER_PROFILE,
} from '../../utils/Strings';
import {useSelector} from 'react-redux';
import {THEME_COLOR, THEME_COLOR2} from '../../utils/Colors';
import FeedItem from '../../components/FeedItem';
import OptionModal from '../../components/OptionModal';
import Loader from '../../components/Loader';
import UpdateModal from '../../components/UpdateModal';

const Profile = () => {
  const navigation = useNavigation();
  const isfocused = useIsFocused();
  const authData = useSelector(state => state.auth);
  // console.log("authDATA---", authData)
  const [userData, setUserData] = useState(null);
  const [feeds, setFeeds] = useState([]);
  const [openOptions, setOpenOptions] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  useEffect(() => {
    const backAction = () => {
      if (navigation.canGoBack()) {
        navigation.goBack();
        return true; // Prevent default behavior (exit app)
      } else {
        Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
        return true; // Prevent default behavior (exit app)
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); // Clean up the event listener
  }, [navigation]);

  useEffect(() => {
    getProfileData();
  }, [isfocused]);

  const getProfileData = () => {
    // setLoading(true);
    fetch(BASE_URL + USER_PROFILE + authData.data.data._id)
      .then(res => res.json())
      .then(json => {
        // setLoading(false);
        setUserData(json.data);
        getData(json.data._id);
        // console.log('json-----', json);
      });
  };

  const getData = id => {
    setLoading(true);
    fetch(BASE_URL + FEEDS + '/' + id)
      .then(res => res.json())
      .then(json => {
        json.data.reverse();
        setLoading(false);
        setFeeds(json.data);
        // console.log('get data json-----', json);
      });
  };

  const deletePost = () => {
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    fetch(BASE_URL + DELETE_POST + selectedItem.item._id, {
      method: 'DELETE',
      // headers: myHeaders,
    })
      .then(res => res.json())
      .then(json => {
        setLoading(false);
        console.log('delete json---------------', json);
        getProfileData();
      })
      .catch(err => {
        setLoading(false);
        console.log('err', err);
      });
  };

  const updatePost = caption => {
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const body = JSON.stringify({
      caption: caption,
      userId: authData.data.data._id,
      userName: authData.data.data.name,
    });

    fetch(BASE_URL + UPDATE_POST + selectedItem.item._id, {
      method: 'PUT',
      body,
      headers: myHeaders,
    })
      .then(res => res.json())
      .then(json => {
        setLoading(false);
        console.log('update json---------------', json);
        getProfileData();
      })
      .catch(err => {
        setLoading(false);
        console.log('err', err);
      });
  };

  const likePost = item => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const body = JSON.stringify({
      userId: authData.data.data._id,
    });

    fetch(BASE_URL + LIKE_POST + item.item._id, {
      method: 'PUT',
      body,
      headers: myHeaders,
    })
      .then(res => res.json())
      .then(json => {
        setLoading(false);
        console.log('like json---------------', json);
        console.log('Item----------1111111', item);
        getProfileData();
      })
      .catch(err => {
        setLoading(false);
        console.log('err', err);
      });
  };
  return (
    <ScrollView nestedScrollEnabled style={styles.container}>
      <View style={styles.coverArea}>
        {userData != null && userData.coverPic != '' ? (
          <Image
            source={{uri: userData.coverPic}}
            style={{width: '100%', height: '100%'}}
          />
        ) : null}
      </View>

      <View style={styles.profileView}>
        {userData != null && userData.profilePic != '' ? (
          <Image
            source={{uri: userData.profilePic}}
            style={[styles.profile, {width: '100%', height: '100%', borderRadius:50}]}
          />
        ) : (
          <Image
            source={require('../../images/user1.png')}
            style={[styles.profile, {tintColor:"white"}]}
          />
        )}
      </View>

      <Text style={styles.name}>{userData ? userData.name : ''}</Text>
      <Text style={styles.bio}>{userData ? userData.bio : ''}</Text>

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

      <TouchableOpacity
        style={styles.editBtn}
        onPress={() => {
          navigation.navigate('EditProfile', {data: userData});
        }}>
        <Text style={styles.editBtnText}>Edit Profile</Text>
      </TouchableOpacity>

      <FlatList
        data={feeds}
        renderItem={(item, index) => {
          return (
            <FeedItem
              list={feeds}
              data={item}
              index={index}
              isFollowed={false}
              // isFollowed={checkFollow(item.item.userId)}
              onClickOptions={() => {
                setSelectedItem(item);
                setOpenOptions(true);
              }}
              onClickLike={() => {
                likePost(item);
              }}
              onFollow={() => {
                // console.log(item, "item...........1111111112222222")
                // followUser(item.item.userId);
              }}
            />
          );
        }}
      />
      <OptionModal
        visible={openOptions}
        onClose={() => {
          setOpenOptions(false);
        }}
        onClick={x => {
          setOpenOptions(false);
          if (x == 2) {
            deletePost();
          } else {
            setOpenUpdateModal(true);
          }
        }}
      />
     
      <UpdateModal
        data={selectedItem}
        visible={openUpdateModal}
        onClose={() => {
          setOpenUpdateModal(false);
        }}
        onClick={x => {
          setOpenUpdateModal(false);
          updatePost(x);
        }}
      />
       <Loader visible={loading} />
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom:100,
  },
  profileView: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: THEME_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: -50,
  },
  profile: {
    width: 50,
    height: 50,
    // tintColor: 'white',
  },
  name: {
    fontSize: 25,
    marginLeft: 20,
    marginTop: 5,
    color: 'black',
    fontWeight: '500',
  },
  bio: {
    fontSize: 15,
    marginLeft: 20,
    marginTop: 5,
    width: '90%',
    color: 'black',
    fontWeight: '400',
  },
  editBtn: {
    width: '90%',
    height: 45,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: THEME_COLOR,
  },
  editBtnText: {
    color: 'white',
    fontSize: 17,
  },
  followersView: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  countView: {
    alignItems: 'center',
  },
  values: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
  },
  title: {
    fontSize: 15,
    marginTop: 5,
    color: 'black',
  },
  coverArea: {
    width: '100%',
    height: 150,
    backgroundColor: THEME_COLOR2,
  },
});
