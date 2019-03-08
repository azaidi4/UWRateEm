import React from 'react';
import { StyleSheet, View, Image , Alert, Text } from 'react-native';
import { Header, Avatar, Divider, Button, Input, Overlay } from 'react-native-elements';
import firebase from 'firebase'

export default class ProfileScreen extends React.Component {
  state = {
    email: this.props.navigation.getParam('email', 'NO-Name'), 
    name: this.props.navigation.getParam('name', this.props.navigation.getParam('email', 'NO-Name').split('@')[0]),
    isVisible: false
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
      <Overlay
      isVisible={this.state.isVisible}
      children={<ResetScreen />}
      onBackdropPress={() => this.setState({ isVisible: false })}>
      </Overlay>
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
              onPress={() => this.props.navigation.navigate('MyCourses')}
              />
            <Button
              containerStyle={{width: '80%', paddingTop: 20, paddingLeft: 10}}
              title='Reset Password'
              buttonStyle={{backgroundColor: '#FFDB58'}}
              onPress={() => this.setState({isVisible: true})}
              />
          </View>
      </View>
    )
  }
}

class ResetScreen extends React.Component {
  state = {
    password: '',
    passwordConfirm: ''
  }
  onResetPress() {
    if (this.state.password !== this.state.passwordConfirm) {
      alert("Passwords do not match");
      return;
    }
    firebase.auth().currentUser.updatePassword(this.state.password)
    .then(() => {
      alert("Password Reset")
      this.setState({isVisible: false})
    }).catch(function(error) {
      alert(error)
    });
  }
  render() {
    return (
      <View>
          <Input style={{width: 200, height: 40, borderWidth: 1}}
            onChangeText={(text) => {this.setState({password: text})}}
            label='Rest Password'
            placeholder="Enter Password"
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            containerStyle={{paddingTop: 10}}
            />
            <Input style={{width: 200, height: 40, borderWidth: 1}}
              onChangeText={(text) => this.setState({passwordConfirm: text})}
              placeholder="Confirm Password"
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              containerStyle={{paddingTop: 10, paddingBottom: 10}}
              />
            <Button
              title="Reset Password"
              buttonStyle={{backgroundColor: '#c5050c'}}
              onPress={() => this.onResetPress()}
              />
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