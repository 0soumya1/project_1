import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import {THEME_COLOR, THEME_COLOR2, THEME_COLOR3} from '../utils/Colors';
import {useNavigation} from '@react-navigation/native';
import Feeds from './tabs/Feeds';
import Profile from './tabs/Profile';
import LogoutModal from "../components/LogoutModal"
import AsyncStorage from '@react-native-async-storage/async-storage';

const Main = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const navigation = useNavigation();
  const [isOpenLogoutModal, setIsOpenLogoutModal] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Social</Text>
        <TouchableOpacity
          onPress={() => {
            setIsOpenLogoutModal(true);
          }}>
          <Image
            style={styles.logoutView}
            source={selectedTab == 1 ? require('../images/logout.png') : null}
          />
        </TouchableOpacity>
      </View>

      {selectedTab == 0 ? <Feeds /> : <Profile />}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(0);
          }}>
          <Image
            source={
              selectedTab == 0
                ? require('../images/home1.png')
                : require('../images/home.png')
            }
            style={styles.tabIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => {
            navigation.navigate('AddPost');
          }}>
          <Image
            source={require('../images/add.png')}
            style={[styles.tabIcon, {tintColor: 'white'}]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(1);
          }}>
          <Image
            source={
              selectedTab == 1
                ? require('../images/user.png')
                : require('../images/user1.png')
            }
            style={[
              styles.tabIcon,
              {tintColor: selectedTab == 1 ? 'black' : null},
            ]}
          />
        </TouchableOpacity>
      </View>
      <LogoutModal
        onRequestClose={() => setIsOpenLogoutModal(false)}
        onPressLeftButton={() => setIsOpenLogoutModal(false)}
        onPressRightButton={async () => {
          await AsyncStorage.clear();
          setIsOpenLogoutModal(false);
          navigation.navigate('Login');
        }}
        visible={isOpenLogoutModal}
        rightButtonText={'Yes'}
        leftButtonText={'No'}
        modelTitle={'Logout Account !'}
        description={'Do you really want to Logout ?'}
      />
    </SafeAreaView>
  );
};

export default Main;

const styles = StyleSheet.create({
  logoutView: {
    width: 33,
    height: 33,
    tintColor: THEME_COLOR2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    color: THEME_COLOR2,
    fontWeight: '700',
    fontSize: 25,
    // marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  bottomNav: {
    width: '100%',
    height: 70,
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#f2f2f2',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  bottomTab: {
    width: '25%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {
    width: 28,
    height: 28,
  },
  addBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: THEME_COLOR2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
});
