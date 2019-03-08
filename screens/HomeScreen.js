import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Header, ListItem, SearchBar, Button } from 'react-native-elements';

import firebase from '../firebase'
import algoliasearch from 'algoliasearch'

var db = firebase.firestore();
var client = algoliasearch('0O1DZL7UR4', '2aa8a8bda9ad8147b5017bbc9b1bfee0');
var index = client.initIndex('courses')

export default class HomeScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = 
    {
      search: '',
      courses: []
    }
  }

  static navigationOptions = {
    header: null
  }

  updateSearch = (search) => {
    this.setState({search})
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.search != prevState.search){
      index.search({query: this.state.search}).then((data) => {
        this.setState({courses: data.hits})
      }).catch((error) => console.log(error))
    }
  }

  componentDidMount() {
    var courselist = [];
    db.collection('courses').get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => courselist.push(doc.data()))
        this.setState({courses: courselist})
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }

  generateAvatar(l) {
    return l.avatar_url + l.courseName+'&background='+Math.floor(Math.random()*16777215).toString(16)
  }

  renderList() {
    if (this.state.courses.length > 0) {
      return this.state.courses.map((l, i) => (
        <ListItem
          key={i}
          leftAvatar={{ source: { uri: this.generateAvatar(l) } }}
          title={l.courseName}
          containerStyle={{ backgroundColor: '#dadfe1' }}
          onPress= {() => this.props.navigation.navigate('Course', {coursename: l.courseName})}
          />
        ))
    }
    else if (!firebase.auth().currentUser.isAnonymous){
      return <View style={{alignItems: 'center', paddingTop: 20}}>
        <Button
        title='Add New Course?'
        color='#c5050c'
        onPress={() => this.props.navigation.navigate('AddCourse', {courseName: this.state.search})}
        />
      </View>
    }
  }
  render() {
    const { search } = this.state;
    return (
      <View style={styles.background}>
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
        <Text style={styles.container}>Popular Courses ...</Text>
        <SearchBar
          placeholder="Search for courses..."
          onChangeText={this.updateSearch}
          value={search}
          round={true}
          containerStyle={{backgroundColor: "#dadfe1"}}
          inputContainerStyle={{backgroundColor: "#cacfd1"}}
        />
        <ScrollView style={{flex: 1}}>    
        {this.renderList()}
        </ScrollView>      
      </View>
      );
  }
}
  
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 10,
    fontSize: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  list: {
    paddingTop: 20,
    paddingLeft: 5,
    fontSize: 20,
    color: '#494949',
  },
  background: {
    backgroundColor: '#dadfe1',
    flex: 1
  },
})