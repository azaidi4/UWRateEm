import React from 'react'
import { Text, View, Image, ScrollView } from 'react-native';
import { Header, ListItem, SearchBar } from 'react-native-elements';

import firebase from '../firebase'
import algoliasearch from 'algoliasearch'

var db = firebase.firestore();
var client = algoliasearch('0O1DZL7UR4', '2aa8a8bda9ad8147b5017bbc9b1bfee0');
var index = client.initIndex('courses')

export default class MyCoursesScreen extends React.Component{
  state = {
    search: '',
    myCourses: [],
    searchCourses: [],
  }
  static navigationOptions = {
    drawerLabel: 'My Courses',
  };
  updateMyCourses() {
    var allmyCourses = []
    var userRef = db.collection('users').doc(firebase.auth().currentUser.uid)
    var courseRef = db.collection('courses')
    userRef.get().then((user) => {
      if (user.exists) {
        user.data().courses.forEach((docID) => {
          courseRef.doc(docID).get().then((course) => {
            allmyCourses.push(course.data())
            this.setState({myCourses: allmyCourses})
          })
        })
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  }
  componentDidMount () {
   this.updateMyCourses();
  }
  addToMyCourses(course) {
    var userRef = db.collection('users').doc(firebase.auth().currentUser.uid)
    var courseRef = db.collection('courses');
    courseRef.where('courseName', '==', course)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          userRef.set({
            courses: firebase.firestore.FieldValue.arrayUnion(doc.id)
          }, { merge: true })
        })
      this.updateMyCourses()
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }
  updateSearch =  (search) => {
    this.setState({search})
  }
  componentDidUpdate(prevProps, prevState){
    if(this.state.search != prevState.search){
      index.search({query: this.state.search}).then((data) => {
        this.setState({searchCourses: data.hits})
      }).catch((error) => console.log(error))
    }
  }
  renderList() {
    if (this.state.search.length != 0){
      return this.state.searchCourses.map((l, i) => (
        <ListItem
          key={i}
          leftAvatar={{ source: { uri: l.avatar_url }}}
          title={l.courseName}
          subtitle={'Add to My Courses'}
          onPress={() => this.addToMyCourses(l.courseName)}
          containerStyle={{ backgroundColor: '#dadfe1' }}
          />
      ))
    }
    else {
      return this.state.myCourses.map((l, i) => (
        <ListItem
          key={i}
          leftAvatar={{ source: { uri: l.avatar_url } }}
          title={l.courseName}
          containerStyle={{ backgroundColor: '#dadfe1' }}
          onPress={() => this.props.navigation.navigate('Course', {coursename: l.courseName})}
          />
      ))
    }
  }
  render(){
    const { search } = this.state;
    return(
      <View style={{backgroundColor: '#dadfe1' , flex: 1}}>
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
      <Text style={{fontSize: 30}}>My Courses</Text>
        <SearchBar
          placeholder="Add to My Courses"
          onChangeText={this.updateSearch}
          value={search}
          round={true}
          containerStyle={{backgroundColor: "#dadfe1"}}
          inputContainerStyle={{backgroundColor: "#cacfd1"}}
        />
      <ScrollView>    
          {this.renderList()} 
        </ScrollView>
      
      </View>
    )
  }
}