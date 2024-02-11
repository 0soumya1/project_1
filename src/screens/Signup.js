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
import {BASE_URL, REGISTER_USER} from '../utils/Strings';
import Loader from '../components/Loader';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {setAuthData} from '../redux/AuthSlice';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [badEmail, setBadEmail] = useState('');
  const [badPassword, setBadPassword] = useState('');
  const [badName, setBadName] = useState('');
  const [badMobile, setBadMobile] = useState('');
  const [selectedGender, setSelectedGender] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const toast = msg => {
    return ToastAndroid.show(msg, ToastAndroid.LONG, ToastAndroid.CENTER);
  };

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

    if (name == '') {
      setBadName('Please Enter Name');
      isValid = false;
    } else if (name != '') {
      setBadName('');
      isValid = true;
    }

    if (mobile == '') {
      setBadMobile('Please Enter Mobile');
      isValid = false;
    } else if (mobile != '' && mobile.length < 10) {
      setBadMobile('Please Enter Valid Mobile Number');
      isValid = false;
    } else if (mobile != '' && mobile.length == 10) {
      setBadMobile('');
      isValid = true;
    }

    return isValid;
  };

  const signUp = async () => {
    setLoading(true);
    console.log('signup-----', name + ' ' + email + ' ' + password);

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    // var raw = JSON.stringify({
    //   name: name,
    //   emailId: email,
    //   mobile: mobile,
    //   password: password,
    //   gender: selectedGender == 0 ? 'male' : 'female',
    // });

    // var requestOptions = {
    //   method: 'POST',
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: 'follow',
    // };

    // fetch(
    //   'https://backend-social-app-kappa.vercel.app/socialapp/api/auth/register',
    //   requestOptions,
    // )
    //   .then(response => response.text())
    //   .then(result => {
    //     setLoading(false);
    //     dispatch(setAuthData(result));
    //     navigation.navigate('AddPost');
    //     toast('SignUp Successful');
    //     console.log('result---------------', result);
    //   })
    //   .catch(error => console.log('error', error));

    fetch(BASE_URL + REGISTER_USER, {
      body: JSON.stringify({
        name: name,
        emailId: email,
        mobile: mobile,
        password: password,
        gender: selectedGender == 0 ? 'male' : 'female',
      }),
      method: 'POST',
      headers: myHeaders,
    })
      .then(res => res.json())
      .then(json => {
        setLoading(false);
        if (json) {
          dispatch(setAuthData(json));
          navigation.navigate('Main');
          toast('SignUp Successful');
          console.log("signup json-----------", json)
        }
      })
      .catch(err => {
        setLoading(false);
        toast('api signup err');
        console.log(err);
      });

    // let data = {
    //   name: name,
    //   emailId: email,
    //   mobile: mobile,
    //   password: password,
    //   gender: selectedGender == 0 ? "male" : "female"
    // };

    // axios
    // .post(BASE_URL + REGISTER_USER, data)
    // .then(res => {
    //   if (res?.data) {
    //     console.log("resp---", res?.data);
    //     dispatch(setAuthData(res.data));
    //     navigation.navigate('Main');
    //     // toast('Signup Successful');
    //     setLoading(false);
    //   } else {
    //     // toast('please enter correct details');
    //     setLoading(false);
    //   }
    // })
    // .catch(() => {
    //   toast('api err');
    //   setLoading(false);
    // });

    // let data = JSON.stringify({
    //   name: name,
    //   emailId: email,
    //   mobile: mobile,
    //   password: password,
    //   gender: selectedGender == 0 ? 'male' : 'female',
    // });
    // console.log('dataatata-------', data);

    // let config = {
    //   method: 'post',
    //   // maxBodyLength: Infinity,
    //   url: BASE_URL + REGISTER_USER,
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   data: data,
    // };

    // console.log('configggg111', config);

    // axios
    //   .request(config)
    //   .then(response => {
    //     setLoading(false);
    //     dispatch(setAuthData(response.data));
    //     navigation.navigate('Main');
    //     toast('Signup Successful');
    //     console.log(
    //       'ressssssssssssssssssssssss',
    //       JSON.stringify(response.data),
    //     );
    //   })
    //   .catch(error => {
    //     toast('api err');
    //     setLoading(false);
    //     console.log('errrrrrrrrr', error);
    //   });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={require('../images/social_logo.png')}
          style={styles.logo}
        />
        <Text style={[styles.welcomeText1, {marginTop: 25}]}>
          Create Account
        </Text>
        <Text style={[styles.welcomeText1, {marginTop: 10}]}>
          in <Text style={styles.welcomeText2}>Social</Text>
        </Text>

        <CustomTextInput
          placeHolder={'Enter Name'}
          value={name}
          onChangeText={txt => setName(txt)}
          isValid={badName == '' ? true : false}
        />
        {badName != '' && <Text style={styles.errorText}>{badName}</Text>}

        <CustomTextInput
          placeHolder={'Enter Email'}
          value={email}
          onChangeText={txt => setEmail(txt)}
          isValid={badEmail == '' ? true : false}
        />
        {badEmail != '' && <Text style={styles.errorText}>{badEmail}</Text>}

        <CustomTextInput
          placeHolder={'Enter Mobile'}
          value={mobile}
          onChangeText={txt => setMobile(txt)}
          keyboardType={'number-pad'}
          isValid={badMobile == '' ? true : false}
        />
        {badMobile != '' && <Text style={styles.errorText}>{badMobile}</Text>}

        <CustomTextInput
          placeHolder={'Enter Password'}
          type={"password"}
          value={password}
          onChangeText={txt => setPassword(txt)}
          isValid={badPassword == '' ? true : false}
        />
        {badPassword != '' && (
          <Text style={styles.errorText}>{badPassword}</Text>
        )}

        <Text style={styles.heading}>Select Gender</Text>
        <View style={styles.genderView}>
          <TouchableOpacity
            style={[
              styles.genderBtn,
              {borderColor: selectedGender == 0 ? 'green' : '#9e9e9e'},
            ]}
            onPress={() => {
              setSelectedGender(0);
            }}>
            <Image source={require('../images/male.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderBtn,
              {borderColor: selectedGender == 1 ? 'green' : '#9e9e9e'},
            ]}
            onPress={() => {
              setSelectedGender(1);
            }}>
            <Image
              source={require('../images/female.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        <LinearGradient colors={[THEME_COLOR2, THEME_COLOR]} style={styles.btn}>
          <TouchableOpacity
            style={[
              styles.btn,
              {justifyContent: 'center', alignItems: 'center', marginTop: 0},
            ]}
            onPress={() => {
              if (validate()) {
                signUp();
              }
            }}>
            <Text style={{color: BG_COLOR, fontSize: 17, fontWeight: '600'}}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </LinearGradient>

        <Text
          style={styles.signupText}
          onPress={() => {
            navigation.navigate('Login');
          }}>
          Already have Account ?{' '}
          <Text style={{color: THEME_COLOR, fontWeight: '700'}}>Login</Text>
        </Text>
        <Loader visible={loading} />
      </View>
    </ScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: Dimensions.get('window').height / 17,
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
    marginBottom: 50,
    fontWeight: '500',
    color: TEXT_COLOR,
  },
  heading: {
    color: TEXT_COLOR,
    marginLeft: 30,
    marginTop: 20,
  },
  genderView: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  genderBtn: {
    width: '45%',
    height: 100,
    borderWidth: 1.5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
  },
});
