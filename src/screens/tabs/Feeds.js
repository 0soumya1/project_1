import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  BASE_URL,
  DELETE_POST,
  FEEDS,
  LIKE_POST,
  UPDATE_POST,
} from '../../utils/Strings';
import FeedItem from '../../components/FeedItem';
import {useIsFocused} from '@react-navigation/native';
import OptionModal from '../../components/OptionModal';
import Loader from '../../components/Loader';
import UpdateModal from '../../components/UpdateModal';
import {useSelector} from 'react-redux';

const Feeds = () => {
  const [feeds, setFeeds] = useState([]);
  const isfocused = useIsFocused();
  const [openOptions, setOpenOptions] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const authData = useSelector(state => state.auth);

  useEffect(() => {
    getData();
  }, [isfocused]);

  const getData = () => {
    fetch(BASE_URL + FEEDS)
      .then(res => res.json())
      .then(json => {
        json.data.reverse();
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
        getData();
      })
      .catch(err => {
        setLoading(false);
        console.log('err', err);
      });
  };

  const updatePost = caption => {
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
        console.log("Item----------1111111", item )
        getData();
      })
      .catch(err => {
        setLoading(false);
        console.log('err', err);
      });
  };
  // console.log("selectedItem----------1111111", selectedItem )
  
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
              onClickOptions={() => {
                setSelectedItem(item);
                setOpenOptions(true);
              }}
              onClickLike={() => {
                likePost(item);
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
  },
});
