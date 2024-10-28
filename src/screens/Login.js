import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {
  BG_COLOR,
  TEXT_COLOR,
  THEME_COLOR2,
  THEME_COLOR,
  THEME_COLOR3,
} from '../utils/Colors';
import CustomTextInput from '../components/CustomTextInput';
import LinearGradient from 'react-native-linear-gradient';
import {BASE_URL, LOGIN_USER} from '../utils/Strings';
import Loader from '../components/Loader';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {setAuthData} from '../redux/AuthSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [badEmail, setBadEmail] = useState('');
  const [badPassword, setBadPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [hidePass, setHidePass] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const toast = msg => {
    return ToastAndroid.show(msg, ToastAndroid.LONG, ToastAndroid.CENTER);
  };

  useFocusEffect(
    useCallback(() => {
      setEmail('');
      setPassword('');
    }, []),
  );

  const validate = () => {
    let isValid = false;

    if (!email) {
      setBadEmail('Please Enter Email');
      isValid = false;
    } else {
      setBadEmail('');
      isValid = true;
    }

    if (password == '') {
      setBadPassword('Please Enter Password');
      isValid = false;
    } else {
      setBadPassword('');
      isValid = true;
    }
    return isValid;
  };

  const login = async () => {
    setLoading(true);

    let data = {
      emailId: email.trim(),
      password: password.trim(),
    };

    let url = BASE_URL + LOGIN_USER;
    console.log('data', data);
    // console.log('url', url);
    axios
      .post(url, data)
      .then(res => {
        console.log('res.data', res?.data);
        if (res?.data?.data) {
          setLoading(false);
          dispatch(setAuthData(res.data));
          navigation.navigate('Main');
          toast('Login Successful');
        } else {
          setLoading(false);
          toast('Login Unsuccessful');
        }
      })
      .catch(err => {
        console.log('login err', err);
        toast('login err');
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          source={require('../images/social_logo.png')}
          style={styles.logo}
        />
        <Text style={[styles.welcomeText1, {marginTop: 25}]}>Welcome Back</Text>
        <Text style={[styles.welcomeText1, {marginTop: 10}]}>
          to <Text style={styles.welcomeText2}>Social</Text>
        </Text>

        <CustomTextInput
          placeHolder={'Enter Email'}
          placeholderTextColor={'#888'}
          value={email}
          onChangeText={txt => setEmail(txt)}
          isValid={badEmail == '' ? true : false}
        />
        {badEmail != '' && <Text style={styles.errorText}>{badEmail}</Text>}

        <CustomTextInput
          style={{width: '92%', color: '#000'}}
          placeHolder={'Enter Password'}
          placeholderTextColor={'#888'}
          type={hidePass}
          value={password}
          onChangeText={txt => setPassword(txt)}
          isValid={badPassword == '' ? true : false}
          child2={
            <TouchableOpacity
              onPress={() => setHidePass(!hidePass)}
              // style={{right: 25}}
            >
              {hidePass ? (
                <Image
                  source={require('../images/eye_close.png')}
                  style={{width: 20, height: 20}}
                />
              ) : (
                <Image
                  source={require('../images/eye.png')}
                  style={{width: 20, height: 20}}
                />
              )}
            </TouchableOpacity>
          }
        />
        {badPassword != '' && badPassword != 'Wrong password' && (
          <Text style={styles.errorText}>{badPassword}</Text>
        )}

        <LinearGradient colors={[THEME_COLOR2, THEME_COLOR]} style={styles.btn}>
          <TouchableOpacity
            style={[
              styles.btn,
              {justifyContent: 'center', alignItems: 'center', marginTop: 0},
            ]}
            onPress={() => {
              if (validate()) {
                login();
              }
            }}>
            <Text style={{color: BG_COLOR, fontSize: 17, fontWeight: '600'}}>
              Login
            </Text>
          </TouchableOpacity>
        </LinearGradient>

        <Text
          style={styles.signupText}
          onPress={() => {
            navigation.navigate('Signup');
          }}>
          Create New Account ?{' '}
          <Text style={{color: THEME_COLOR, fontWeight: '700'}}>Sign Up</Text>
        </Text>
        <Loader visible={loading} />
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: Dimensions.get('window').height / 8,
  },
  welcomeText1: {
    color: TEXT_COLOR,
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: '500',
  },
  welcomeText2: {
    color: THEME_COLOR,
    // alignSelf:"center",
    // fontSize:25,
    // fontWeight: "500",
  },
  btn: {
    width: '90%',
    height: 50,
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 10,
  },
  errorText: {
    color: 'red',
    marginLeft: 30,
    marginTop: 5,
  },
  signupText: {
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 30,
    fontWeight: '500',
    color: TEXT_COLOR,
    marginBottom: 20,
  },
});
