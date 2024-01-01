import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';

const FeedItem = ({data, index}) => {
  console.log('data----', data);

  const timeDifference = previous => {
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

  return (
    <ScrollView>
      <View style={styles.feed}>
        <View style={styles.topView}>
          <View style={styles.topLeft}>
            <Image
              source={require('../images/profile.png')}
              style={styles.profile}
            />
            <View>
              <Text style={styles.userName}>{data.item.userName}</Text>
              <Text style={styles.time}>
                {timeDifference(new Date(data.item.createdAt))}
              </Text>
            </View>
          </View>

          <TouchableOpacity>
            <Image
              source={require('../images/options.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.caption}>{data.item.caption}</Text>
      </View>
    </ScrollView>
  );
};

export default FeedItem;

const styles = StyleSheet.create({
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
    // color:"black"
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
});
