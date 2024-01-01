import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BASE_URL, FEEDS} from '../../utils/Strings';
import FeedItem from '../../components/FeedItem';
import {useIsFocused} from '@react-navigation/native';

const Feeds = () => {
  const [feeds, setFeeds] = useState([]);
  const isfocused = useIsFocused();

  useEffect(() => {
    getData();
  }, [isfocused]);

  const getData = () => {
    fetch(BASE_URL + FEEDS)
      .then(res => res.json())
      .then(json => {
        setFeeds(json.data);
        console.log("json-----", json)
      });
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={feeds}
        renderItem={(item, index) => {
          return <FeedItem data={item} index={index}/>
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
