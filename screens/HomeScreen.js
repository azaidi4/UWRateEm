import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Header, ListItem, SearchBar } from 'react-native-elements';

import list from '../assets/js/list'

export default class HomeScreen extends React.Component {
  state = {
    search: '',
  };
  updateSearch = search => {
    this.setState({ search });
  };
  static navigationOptions = {
    header: null
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
        <ScrollView>    
        {
          list.map((l, i) => (
            <ListItem
              key={i}
              leftAvatar={{ source: { uri: l.avatar_url + l.courseName + '&background=' + 
              Math.floor(Math.random()*16777215).toString(16) } }}
              title={l.courseName}
              containerStyle={{ backgroundColor: '#dadfe1' }}
              onPress= {() => this.props.navigation.navigate('Course', {coursename: l.courseName})}
              />
          ))
        }
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