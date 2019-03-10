import React from 'react';
import { View, Text } from 'react-native';
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
        };
    }

    onResetPress = () => {
        const { email } = this.state
        firebase.auth().sendPasswordResetEmail(email).then(() => {
            alert("Reset Email Sent! Please check your inbox: " + email)
        }).catch((error) => {
            alert(error)
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
                </View>
                
                <Button title="Reset Password" 
                    onPress={() => {this.onResetPress()}} 
                    buttonStyle={{backgroundColor: '#646569'}}
                    />
            </View>
        );
    }
}