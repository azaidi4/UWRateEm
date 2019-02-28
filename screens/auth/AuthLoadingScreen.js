import React from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import { Header } from 'react-native-elements';

import firebase from 'firebase'

export default class AuthLoadingScreen extends React.Component {
    componentDidMount() {
      firebase.auth().onAuthStateChanged(user => {
        this.props.navigation.navigate(user ? 'App' : 'Auth')
      })
    }
    render() {
      return (
        <View>
        <Header
          containerStyle={{backgroundColor: "#c5050c"}}
          leftComponent={{ icon: 'menu', color: '#fff'}}
          centerComponent={{ text: 'UW-Rate \'em!', style: { color: '#fff', fontSize: 20 } }}
          rightComponent={<Image 
                          source={require('../../assets/uw-crest-web.png')}
                          style={{ width: 25, height: 40 }}
                          /> 
                        }
          />
            <Text style={styles.container}>Loading</Text>
            <ActivityIndicator size="large" />
        </View>
      )
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
  })