import React from 'react';
import { StyleSheet, View, Image , Text} from 'react-native';
import { Header, Avatar, Divider, Button, Input, Overlay } from 'react-native-elements';
import firebase from 'firebase'

export default class ProfileScreen extends React.Component {
  state = {
    email: this.props.navigation.getParam('email', 'NO-Name'), 
    name: this.props.navigation.getParam('name', this.props.navigation.getParam('email', 'NO-Name').split('@')[0]),
    isVisible: false
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'App' : 'Auth')
    })
  }
  updateName = (name) => {
    var newName = name.nativeEvent.text;
    firebase.auth().currentUser.updateProfile({
      displayName: newName
    })
    .then( () => {
      this.setState({name: newName})
      alert("Name has been updated!")
    })
    .catch( (error) => alert(error));
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <Overlay
          isVisible={this.state.isVisible}
          onBackdropPress={() => this.setState({ isVisible: false })}
          children={2}
        >
        </Overlay> */}
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
          <Avatar
            size={200}
            rounded
            source={{uri: 'https://identicon-api.herokuapp.com/' +  this.state.email + '/200?format=png'}}
            containerStyle={{paddingTop: 10}}
            />
          </View>
          <View style={{paddingTop: 20}}>
            <Divider style={{ backgroundColor: '#c5050c', height: 2}} />
          </View>
          <View style={{paddingTop: 20}}>
            <Input
              placeholder={this.state.name + ' (Press Enter to Update)'}
              label='Name'
              onSubmitEditing={this.updateName}
              />
            <Button
            containerStyle={{width: '80%', paddingTop: 20, paddingLeft: 10}}
            title='Current Courses & Assignments'
            buttonStyle={{backgroundColor: '#c5050c'}}
              />
            <Button
            containerStyle={{width: '80%', paddingTop: 20, paddingLeft: 10}}
            title='Reset Password'
            buttonStyle={{backgroundColor: '#FFDB58'}}
            // onPress={() => this.setState({isVisible: true})}
              />
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
    alignItems: 'center'
  }
})
