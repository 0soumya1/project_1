import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {THEME_COLOR2, THEME_COLOR} from '../utils/Colors';
import {useNavigation} from '@react-navigation/native';

export const timeDifference = previous => {
  const current = new Date();
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + ' seconds ago';
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + ' minutes ago';
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + ' hours ago';
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + ' days ago';
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + ' months ago';
  } else {
    return Math.round(elapsed / msPerYear) + ' years ago';
  }
};

const FeedItem = ({
  data,
  index,
  list,
  onClickOptions,
  onClickLike,
  onFollow,
  isFollowed,
}) => {
  const authData = useSelector(state => state.auth);
  const navigation = useNavigation();
  // const commentData = useSelector(state => state.comment);

  // console.log('feed data----', data);
  // console.log('commentData----------', commentData);

  const checkLiked = () => {
    let isLiked = false;
    data.item.likes.map(item => {
      if (item == authData.data.data._id) {
        isLiked = true;
      }
    });
    return isLiked;
  };

  return (
    <View
      style={[styles.feed, {marginBottom: list.length - 1 == index ? 100 : 0}]}>
      <View style={styles.topView}>
        <View style={styles.topLeft}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('UserProfile', {id: data.item.userId});
            }}>
            <Image
              source={require('../images/profile.png')}
              style={styles.profile}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.userName}>{data.item.userName}</Text>
            <Text style={styles.time}>
              {timeDifference(new Date(data.item.createdAt))}
            </Text>
          </View>
        </View>
        {authData.data.data._id == data.item.userId && (
          <TouchableOpacity
            onPress={() => {
              onClickOptions();
            }}>
            <Image
              source={require('../images/options.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
        {authData.data.data._id != data.item.userId && (
          <TouchableOpacity
            style={styles.followBtn}
            onPress={() => {
              onFollow();
            }}>
            <Text style={{color: 'white'}}>
              {isFollowed ? 'Unfollow' : 'Follow'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.caption}>{data.item.caption}</Text>

      {data.item.imageUrl != '' && (
        <Image source={{uri: data.item.imageUrl}} style={styles.image} />
      )}
      <View style={styles.bottomView}>
        <TouchableOpacity
          onPress={() => {
            onClickLike();
          }}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={
              checkLiked()
                ? require('../images/liked.png')
                : require('../images/like.png')
            }
            style={[
              styles.icon,
              {tintColor: checkLiked() ? THEME_COLOR2 : 'black'},
            ]}
          />
          <Text style={styles.count}>{data.item.likes.length + ' Likes'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Comments', {id: data.item._id});
          }}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../images/comment.png')}
            style={styles.icon}
          />
          <Text style={styles.count}>
            {/* {data.item.comments.length + ' Comments'} */}
            {'Comments'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FeedItem;

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: 'white',
  // },
  feed: {
    width: '90%',
    paddingBottom: 20,
    alignSelf: 'center',
    backgroundColor: '#f2f2f2',
    marginTop: 20,
    borderRadius: 10,
  },
  topView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingRight: 15,
    paddingTop: 10,
  },
  topLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profile: {
    width: 45,
    height: 45,
    borderRadius: 25,
    tintColor: '#9e9e9e',
    marginLeft: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  time: {
    fontSize: 12,
    marginTop: 5,
    // fontWeight:"600",
    color: 'black',
  },
  icon: {
    width: 24,
    height: 24,
  },
  caption: {
    width: '90%',
    marginTop: 10,
    alignSelf: 'center',
    fontSize: 14,
    color: 'black',
  },
  image: {
    width: '90%',
    height: 200,
    resizeMode: 'contain',
    marginTop: 10,
    alignSelf: 'center',
  },
  bottomView: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 20,
    // marginBottom: 10,
  },
  count: {
    color: 'black',
    fontSize: 16,
    marginLeft: 6,
  },
  followBtn: {
    backgroundColor: THEME_COLOR2,
    height: 35,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop:5,
    borderRadius: 10,
  },
});
