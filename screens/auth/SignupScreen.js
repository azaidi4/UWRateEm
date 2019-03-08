import React from 'react';
import { View, Text, Alert } from 'react-native';
import {Button, Input, Image, Header} from 'react-native-elements'
import firebase from '../../firebase'

export default class SignupScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = { 
            email: "",
            password: "",
            passwordConfirm: "",
        };
    }

    onSignupPress = () => {
        if (this.state.password !== this.state.passwordConfirm) {
            Alert.alert("Passwords do not match");
            return;
        }
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => { }, (error) => { Alert.alert(error.message); });
    }

    render() {
        return (
            <View style={{ alignItems: "center"}}>
                <Header
                    containerStyle={{backgroundColor: '#c5050c'}}
                    leftComponent={{icon: 'chevron-left', color: '#fff', onPress: () => this.props.navigation.goBack() }}
                    centerComponent={{ text: 'UW-Rate \'em!', style: { color: '#fff', fontSize: 20 } }}
                    rightComponent={<Image 
                                    source={require('../../assets/uw-crest-web.png')}
                                    style={{ width: 25, height: 40 }}
                                    /> }
                    />
                <Text style={{fontSize: 30, paddingTop: 10}}>Create Account</Text> 
                <View style={{width: '75%'}}>
                    <Input style={{width: 200, height: 40, borderWidth: 1}}
                        value={this.state.email}
                        label='Enter Email'
                        onChangeText={(text) => { this.setState({email: text}) }}
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        containerStyle={{paddingBottom: 20, paddingTop: 10}}
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
                    <Input style={{width: 200, height: 40, borderWidth: 1}}
                        value={this.state.passwordConfirm}
                        onChangeText={(text) => { this.setState({passwordConfirm: text}) }}
                        placeholder="Confirm Password"
                        secureTextEntry={true}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
                <View style={{ paddingTop: 20, paddingBottom: 20}}>
                    <Button title= "Sign Up" 
                        onPress={() => this.onSignupPress()} 
                        buttonStyle={{backgroundColor: '#c5050c'}}
                        />
                </View>
            </View>
        );
    }
}