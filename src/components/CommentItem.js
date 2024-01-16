import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {timeDifference} from './FeedItem';

const CommentItem = ({data, onDelete}) => {
//   console.log('data----', data);
  return (
    <View
      style={{
        width: '90%',
        // height: 130,
        paddingBottom: 20,
        backgroundColor: 'white',
        alignSelf: 'center',
        marginTop: 20,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 10,
          paddingRight: 10,
        }}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <Image
            source={require('../images/profile.png')}
            style={{width: 40, height: 40}}
          />
          <View style={{marginLeft: 10}}>
            <Text style={{fontSize: 16, color: 'black', fontWeight: '500'}}>
              {data.item.userName}
            </Text>
            <Text style={{fontSize: 12}}>
              {timeDifference(new Date(data.item.createdAt))}
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Image
            source={require('../images/options.png')}
            style={{width: 24, height: 24}}
          />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontSize: 14,
          color: 'black',
          fontWeight: '500',
          width: '90%',
          alignSelf: 'center',
          marginTop: 10,
        }}>
        {data.item.comment}
      </Text>
    </View>
  );
};

export default CommentItem;
