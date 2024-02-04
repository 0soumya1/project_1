import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
  Modal,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BG_COLOR, THEME_COLOR2} from '../utils/Colors';
import {
  ADD_COMMENT,
  BASE_URL,
  DELETE_COMMENT,
  GET_COMMENTS,
  UPDATE_COMMENT,
} from '../utils/Strings';
import {useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import Loader from '../components/Loader';
import CommentItem from '../components/CommentItem';
import CommentOptionModal from '../components/CommentOptionModal';

const Comments = () => {
  const [comment, setComment] = useState('');
  const authData = useSelector(state => state.auth);
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [openCommentOptions, setOpenCommentOptions] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [openUpdateCommentModal, setOpenUpdateCommentModal] = useState(false);

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

        setComment('');
        Keyboard.dismiss();
        getAllComments();
      })
      .catch(err => {
        setLoading(false);
        console.log('err', err);
      });
  };

  useEffect(() => {
    getAllComments();
  }, []);

  const getAllComments = () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    fetch(BASE_URL + GET_COMMENTS + route.params.id, {
      method: 'GET',
      headers: myHeaders,
    })
      .then(res => res.json())
      .then(json => {
        console.log('GET ALL COMMENTS json---------------', json);
        setCommentList(json.data);
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  const deleteComment = () => {
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    fetch(BASE_URL + DELETE_COMMENT + selectedItem.item._id, {
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

  const updateComment = () => {
    setLoading(true)
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const body = JSON.stringify({
      comment: newComment,
      userId: authData.data.data._id,
      userName: authData.data.data.name,
      postId: route.params.id
    });

    fetch(BASE_URL + UPDATE_COMMENT + selectedItem.item._id, {
      method: 'PUT',
      body,
      headers: myHeaders,
    })
      .then(res => res.json())
      .then(json => {
        setLoading(false);
        console.log('update comment json---------------', json);
        getAllComments();
      })
      .catch(err => {
        setLoading(false);
        console.log('err', err);
      });
  };
  return (
    <View style={styles.container}>
     <ScrollView style={{flex:1, marginBottom:80}}>
      <FlatList
        data={commentList}
        renderItem={(item, index) => {
          return (
            <CommentItem
              data={item}
              onClickOption={() => {
                setSelectedItem(item);
                setOpenCommentOptions(true);
              }}
            />
          );
        }}
      />
          </ScrollView>
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
      <CommentOptionModal
        visible={openCommentOptions}
        onClose={() => {
          setOpenCommentOptions(false);
        }}
        onClick={x => {
          setOpenCommentOptions(false);
          if (x == 2) {
            deleteComment();
          } else {
            setNewComment(selectedItem.item.comment);
            setOpenUpdateCommentModal(true);
          }
        }}
      />
 
      <Modal transparent visible={openUpdateCommentModal}>
        <View style={styles.modalView}>
          <View style={styles.mainView}>
            <Text style={styles.titleComment}>Edit Comment</Text>
            <TextInput
              value={newComment}
              onChangeText={txt => setNewComment(txt)}
              style={styles.commentInput}
              placeholder="Type comment here..."
            />
            <View style={styles.commentBottomView}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => {
                  setOpenUpdateCommentModal(false);
                }}>
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveBtn}
                onPress={() => {
                  setOpenUpdateCommentModal(false);
                  updateComment();
                }}>
                <Text style={styles.btnText}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Loader visible={loading} />
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginBottom: 20,
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
  modalView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    width: '90%',
    // height: 200,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  titleComment: {
    fontSize: 16,
    color: 'black',
    alignSelf: 'center',
    marginTop: 20,
  },
  commentInput: {
    width: '90%',
    height: 50,
    borderWidth: 0.4,
    borderRadius: 10,
    paddingLeft: 20,
    alignSelf: 'center',
    marginTop: 20,
  },
  commentBottomView: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  cancelBtn: {
    width: '35%',
    height: 45,
    borderRadius: 10,
    backgroundColor: '#9e9e9e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveBtn: {
    width: '35%',
    height: 45,
    borderRadius: 10,
    backgroundColor: THEME_COLOR2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
