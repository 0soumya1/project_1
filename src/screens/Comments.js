import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BG_COLOR, THEME_COLOR2} from '../utils/Colors';
import {ADD_COMMENT, BASE_URL, DELETE_COMMENT, GET_COMMENTS} from '../utils/Strings';
import {useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import Loader from '../components/Loader';
import CommentItem from '../components/CommentItem';

const Comments = () => {
  const [comment, setComment] = useState('');
  const authData = useSelector(state => state.auth);
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const [commentList, setCommentList] = useState([]);

  const postComment = () => {
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const body = JSON.stringify({
      userId: authData.data.data._id,
      postId: route.params.id,
      comment: comment,
      userName: authData.data.data.name,
    });

    fetch(BASE_URL + ADD_COMMENT, {
      method: 'POST',
      body,
      headers: myHeaders,
    })
      .then(res => res.json())
      .then(json => {
        setLoading(false);
        console.log('COMMENT json---------------', json);  

        setComment("");
        Keyboard.dismiss();
        getAllComments();   
      })
      .catch(err => {
        setLoading(false);
        console.log('err', err);
      });
  };

  useEffect(()=>{
    getAllComments();
  }, [])
 
  const getAllComments =()=>{
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    fetch(BASE_URL + GET_COMMENTS + route.params.id , {
        method: 'GET',
        headers: myHeaders,
      })
        .then(res => res.json())
        .then(json => {
          console.log('GET ALL COMMENTS json---------------', json);
          setCommentList(json.data)
        })
        .catch(err => {
          console.log('err', err);
        });
  }

  const deleteComment = (id) => {
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    fetch(BASE_URL + DELETE_COMMENT + id, {
      method: 'DELETE',
      // headers: myHeaders,
    })
      .then(res => res.json())
      .then(json => {
        setLoading(false);
        console.log('delete json---------------', json);
        getAllComments();
      })
      .catch(err => {
        setLoading(false);
        console.log('err', err);
      });
  };
  return (
    <View style={styles.container}>
        <FlatList data={commentList} renderItem={(item, index)=>{
            return(
                <CommentItem data={item} onDelete={()=>{}}/>
            )
        }}/>
      <View style={styles.bottomNav}>
        <TextInput
          value={comment}
          onChangeText={txt => setComment(txt)}
          placeholder="Type Comment Here....."
          style={styles.input}
        />
        <TouchableOpacity
          disabled={comment == '' ? true : false}
          style={[
            styles.postBtn,
            {backgroundColor: comment == '' ? '#f2f2f2' : THEME_COLOR2},
          ]}
          onPress={() => {
            postComment();
          }}>
          <Text style={styles.btnText}>Comment</Text>
        </TouchableOpacity>
      </View>
      <Loader visible={loading} />
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomNav: {
    width: '100%',
    height: 70,
    position: 'absolute',
    bottom: 0,
    backgroundColor: BG_COLOR,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    width: '70%',
    height: '100%',
  },
  postBtn: {
    width: '25%',
    height: '60%',
    backgroundColor: THEME_COLOR2,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
  },
});
