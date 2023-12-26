import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
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
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [badEmail, setBadEmail] = useState('');
  const [badPassword, setBadPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const validate = () => {
    let isValid = false;
    if (email == '') {
      setBadEmail('Please Enter Email');
      isValid = false;
    } else if (
      email != '' &&
      !email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
    ) {
      setBadEmail('Please Enter Valid Email');
      isValid = false;
    } else if (
      email != '' &&
      email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
    ) {
      setBadEmail('');
      isValid = true;
    }
    if (password == '') {
      setBadPassword('Please Enter Password');
      isValid = false;
    } else if (password != '' && password.length < 2) {
      setBadPassword('Please Enter Min 2 Characters Password');
      isValid = false;
    } else if (password != '' && password.length > 1) {
      setBadPassword('');
      isValid = true;
    }
    return isValid;
  };

  const login = async () => {
    setLoading(true);
    console.log("login-----", email + ' ' + password);

    const myHeaders = new Headers();
    myHeaders.append("Content-type", "application/json");
    fetch(BASE_URL + LOGIN_USER, {
      body: {
        emailId: email,
        password: password,
      },
      method: 'POST',
     headers: myHeaders,
    })
      .then(res => res.json())
      .then(json => {
     setLoading(false)
        console.log(json);
      })
      .catch(err => {
     setLoading(false)
        console.log(err);
      });

    // let result = await fetch(BASE_URL + LOGIN_USER, {
    //   method: 'post',
    //   body: JSON.stringify({email, password}),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
    // result = await result.json();
    // console.log(result, 'result');
  };

  return (
    <View style={styles.container}>
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
        value={email}
        onChangeText={txt => setEmail(txt)}
        isValid={badEmail == '' ? true : false}
      />
      {badEmail != '' && <Text style={styles.errorText}>{badEmail}</Text>}

      <CustomTextInput
        placeHolder={'Enter Password'}
        value={password}
        onChangeText={txt => setPassword(txt)}
        isValid={badPassword == '' ? true : false}
      />
      {badPassword != '' && <Text style={styles.errorText}>{badPassword}</Text>}

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

      <Text style={styles.signupText} onPress={()=>{
        navigation.navigate("Signup")
      }} >
        Create New Account ?{' '}
        <Text style={{color: THEME_COLOR, fontWeight: '700'}}>Sign Up</Text>
      </Text>
      <Loader visible={loading} />
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
  },
});
