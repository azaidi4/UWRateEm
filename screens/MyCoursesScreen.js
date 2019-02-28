import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Header, ListItem, Button } from 'react-native-elements';
import list from '../assets/js/list'

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyCFtU5-3tdnzSlzYoK2fkHnklWzeB9Q-D8",
    authDomain: "uw-rate-em-4f9d6.firebaseapp.com",
    databaseURL: "https://uw-rate-em-4f9d6.firebaseio.com",
    projectId: "uw-rate-em-4f9d6",
    storageBucket: "uw-rate-em-4f9d6.appspot.com",
    messagingSenderId: "713726718555"
};
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

export default class MyCoursesScreen extends React.Component{
  state = {
    courses: []
  }
  static navigationOptions = {
    drawerLabel: 'My Courses',
  };

  getFromDatabase() {
    var userRef = db.collection('users');
    userRef.where('uid', '==', firebase.auth().currentUser.uid)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => this.setState({courses: doc.data().courses}))
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'App' : 'Auth')
    })
    this.getFromDatabase();
  }
  render(){
    return(
      <View>
      <Header 
            containerStyle={{backgroundColor: '#c5050c'}}
            leftComponent={{ icon: 'menu', color: '#fff', onPress:() => this.props.navigation.openDrawer()}}
            centerComponent={{ text: 'UW-Rate \'em!', style: { color: '#fff', fontSize: 20 } }}
            rightComponent={<Image 
                            source={require('../assets/uw-crest-web.png')}
                            style={{ width: 25, height: 40 }}
                            /> 
                          }
      />
      <ScrollView>    
          {
            this.state.courses.map((l, i) => (
              <ListItem
                key={i}
                leftAvatar={{ source: { uri: l.avatar_url + l.courseName + '&background=' + 
                Math.floor(Math.random()*16777215).toString(16) } }}
                title={l.courseName}
                />
            ))
          }
          </ScrollView>
      </View>
    )
  }
}