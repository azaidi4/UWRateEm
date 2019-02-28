import React from 'react';
import { StyleSheet, View, Image , Text} from 'react-native';
import { Header, Avatar, Divider, Button, Input, Overlay } from 'react-native-elements';
import firebase from 'firebase'

export default class CourseScreen extends React.Component {
  state =  {
    rating: 0
  }
  render() {
    const { navigation } = this.props;
    const coursename = navigation.getParam('coursename', 'NO-NAME');
    return (
      <View style={styles.container}>
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
          <View style={styles.text}>
              <Text style={{fontSize: 20}}>{coursename}</Text>
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    alignItems: 'center',
    paddingTop: 20
  }
})
