import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import { createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import { Button } from 'react-native-elements';

import firebase from 'firebase'
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CourseScreen from '../screens/CourseScreen.js';
import MyCoursesScreen from '../screens/MyCoursesScreen.js';
  
const CustomDrawerContentComponent = (props) => (
<ScrollView>
    <SafeAreaView>
    <View style={{ height: 150, alignItems: 'center', justifyContent: 'center'}}>
        <Image 
        source={require('../assets/uw-crest-web.png')} 
        style={{height:130, width:90, resizeMode: 'contain'}}
        />
    </View>
    <DrawerItems {...{...props, 
        onItemPress: (item) => props.navigation.navigate(item.route.routeName, 
        { 
            email: firebase.auth().currentUser.email,
            name: firebase.auth().currentUser.displayName
            }
        )}} 
        />

    <Button
        title='Sign Out'
        onPress={() => firebase.auth().signOut()}
        buttonStyle={{backgroundColor: '#c5050c'}}
    />
    </SafeAreaView>
</ScrollView>
);

export default AppStack = createDrawerNavigator( 
{
    Home: HomeScreen,
    Profile: ProfileScreen,
    MyCourses: MyCoursesScreen,
    Course: CourseScreen,
},
{
    contentComponent: CustomDrawerContentComponent,
});