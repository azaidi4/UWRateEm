import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import { createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import { Button } from 'react-native-elements';

import HomeScreen from '../screens/HomeScreen';
import CourseScreen from '../screens/CourseScreen.js';
import firebase from '../firebase'
  
const CustomDrawerContentComponent = (props) => (
<ScrollView>
    <SafeAreaView>
    <View style={{ height: 150, alignItems: 'center', justifyContent: 'center'}}>
        <Image 
        source={require('../assets/uw-crest-web.png')} 
        style={{height:130, width:90, resizeMode: 'contain'}}
        />
    </View>
    <DrawerItems {...props} />
    <Button
        title='Sign In'
        onPress={() => {
            firebase.auth().signOut()
        }}
        buttonStyle={{backgroundColor: '#c5050c'}}
    />
    </SafeAreaView>
</ScrollView>
);

export default AnonStack = createDrawerNavigator( 
{
    Home: HomeScreen,
    Course: CourseScreen,
},
{
    contentComponent: CustomDrawerContentComponent,
});