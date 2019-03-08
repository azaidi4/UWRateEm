import React from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import { Header } from 'react-native-elements';

import firebase from '../../firebase'

export default class AuthLoadingScreen extends React.Component {
    componentDidMount() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          if (user.isAnonymous)
            this.props.navigation.navigate('Anon')
          else 
            this.props.navigation.navigate('App')
        }
        else
          this.props.navigation.navigate('Auth')
      })
    }
    render() {
      return (
        <View style={{flex: 1}}>
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
          <View style={styles.container}>
            <Text style={{fontSize: 30}}>Loading</Text>
            <ActivityIndicator size="large"/>
          </View>
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