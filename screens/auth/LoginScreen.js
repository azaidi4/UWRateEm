import React from 'react';
import { View, Text, Alert } from 'react-native';
import {Input, Button, Header, Image} from 'react-native-elements'
import firebase from '../../firebase'

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = { 
            email: "",
            password: "",
        };
    }

    onLoginPress = () => {
        const { email, password } = this.state
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {}, (error) => { Alert.alert(error.message); });
    }
    skipSignupPress() {
        firebase.auth().signInAnonymously().catch((error) => {
            console.log(error.message)
        })
    }

    render() {
        return (
            <View style={{ alignItems: "center"}}>
                <Header
                    containerStyle={{backgroundColor: '#c5050c'}}
                    centerComponent={{ text: 'UW-Rate \'em!', style: { color: '#fff', fontSize: 20 } }}
                    rightComponent={<Image 
                                    source={require('../../assets/uw-crest-web.png')}
                                    style={{ width: 25, height: 40 }}
                                    /> }
                    />
                <Text style={{fontSize: 30, paddingTop: 10}}>Login</Text> 
                <View style={{width: '75%'}}>
                    <Input style={{width: 200, height: 40, borderWidth: 1}}
                        value={this.state.email}
                        label='Enter Email'
                        onChangeText={(text) => { this.setState({email: text}) }}
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        containerStyle={{paddingBottom: 10, paddingTop: 10}}
                    />
                    <Input style={{width: 200, height: 40, borderWidth: 1}}
                        value={this.state.password}
                        onChangeText={(text) => { this.setState({password: text}) }}
                        label='Password'
                        placeholder="Enter Password"
                        secureTextEntry={true}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
                <View style={{flexDirection: 'row', paddingTop: 20, paddingBottom: 10}}>
                    <Button title="Login" 
                        onPress={this.onLoginPress}
                        containerStyle={{paddingRight: 10}}
                        buttonStyle={{backgroundColor: '#c5050c'}}
                        />
                    <Button title="Create account..." 
                        onPress={() => this.props.navigation.navigate('SignUp')} 
                        buttonStyle={{backgroundColor: '#c5050c'}}
                        />
                </View>
                
                <Button title="Skip Sign In..." 
                    onPress={() => this.skipSignupPress()} 
                    buttonStyle={{backgroundColor: '#646569'}}
                    />
            </View>
        );
    }
}