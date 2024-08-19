import {View, Text, StyleSheet, FlatList, BackHandler, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  BASE_URL,
  DELETE_POST,
  FEEDS,
  FOLLOW_USER,
  LIKE_POST,
  UPDATE_POST,
  USER_PROFILE,
} from '../../utils/Strings';
import FeedItem from '../../components/FeedItem';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import OptionModal from '../../components/OptionModal';
import Loader from '../../components/Loader';
import UpdateModal from '../../components/UpdateModal';
import {useSelector} from 'react-redux';

const Feeds = () => {
  const navigation = useNavigation();
  const [feeds, setFeeds] = useState([]);
  const isfocused = useIsFocused();
  const [openOptions, setOpenOptions] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const authData = useSelector(state => state.auth);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getData();
    getProfileData();
  }, [isfocused]);

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

  const getData = () => {
    setLoading(true);
    fetch(BASE_URL + FEEDS)
      .then(res => res.json())
      .then(json => {
        json.data.reverse();
        setLoading(false);
        setFeeds(json.data);
        // console.log('get data json-----', json);
      });
  };

  const getProfileData = () => {
    setLoading(true);
    fetch(BASE_URL + USER_PROFILE + authData.data.data._id)
      .then(res => res.json())
      .then(json => {
        setLoading(false);
        setUserData(json.data);
        // console.log('profile data json-----', json);
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
        getData();
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
        getData();
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
        getData();
      })
      .catch(err => {
        setLoading(false);
        console.log('err', err);
      });
  };
  // console.log("selectedItem----------1111111", selectedItem )

  const followUser = id => {
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const body = JSON.stringify({
      userId: authData.data.data._id,
    });

    fetch(BASE_URL + FOLLOW_USER + id, {
      method: 'PUT',
      body,
      headers: myHeaders,
    })
      .then(res => res.json())
      .then(json => {
        setLoading(false);
        console.log('follow user json---------------', json);
        getProfileData();
        getData();
      })
      .catch(err => {
        setLoading(false);
        console.log('err', err);
      });
  };

  const checkFollow = id => {
    let isFollowed = false;
    if (userData != null) {
      userData.following.map(item => {
        if (item == id) {
          isFollowed = true;
        }
      });
    }
    return isFollowed;
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={feeds}
        renderItem={(item, index) => {
          return (
            <FeedItem
              list={feeds}
              data={item}
              index={index}
              isFollowed={checkFollow(item.item.userId)}
              onClickOptions={() => {
                setSelectedItem(item);
                setOpenOptions(true);
              }}
              onClickLike={() => {
                likePost(item);
              }}
              onFollow={() => {
                // console.log(item, "item...........1111111112222222")
                followUser(item.item.userId);
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
      <Loader visible={loading} />
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
    </View>
  );
};

export default Feeds;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom:85,
  },
});
