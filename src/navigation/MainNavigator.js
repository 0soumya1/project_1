import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Splash from '../screens/Splash'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import Main from '../screens/Main'
import AddPost from '../screens/AddPost'
import Comments from '../screens/Comments'
import EditProfile from '../screens/EditProfile'
import UserProfile from '../screens/tabs/UserProfile'

const Stack = createStackNavigator()

const MainNavigator = () => {
  return (
  <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name='Splash' component={Splash} options={{headerShown: false}}/>
        <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
        <Stack.Screen name='Signup' component={Signup} options={{headerShown: false}}/>
        <Stack.Screen name='Main' component={Main} options={{headerShown: false}}/>
        <Stack.Screen name='AddPost' component={AddPost} options={{headerShown: true}}/>
        <Stack.Screen name='Comments' component={Comments} options={{headerShown: true}}/>
        <Stack.Screen name='EditProfile' component={EditProfile} options={{headerShown: true}}/>
        <Stack.Screen name='UserProfile' component={UserProfile} options={{headerShown: true}}/>
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default MainNavigator;