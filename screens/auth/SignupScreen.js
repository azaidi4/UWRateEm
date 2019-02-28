import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import firebase from 'firebase'

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
            <View style={{paddingTop:50, alignItems:"center"}}>

                <Text>Signup</Text>

                <TextInput style={{width: 200, height: 40, borderWidth: 1}}
                    value={this.state.email}
                    onChangeText={(text) => { this.setState({email: text}) }}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <View style={{paddingTop:10}} />

                <TextInput style={{width: 200, height: 40, borderWidth: 1}}
                    value={this.state.password}
                    onChangeText={(text) => { this.setState({password: text}) }}
                    placeholder="Password"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <View style={{paddingTop:10}} />

                <TextInput style={{width: 200, height: 40, borderWidth: 1}}
                    value={this.state.passwordConfirm}
                    onChangeText={(text) => { this.setState({passwordConfirm: text}) }}
                    placeholder="Password (confirm)"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <Button title="Signup" onPress={this.onSignupPress} />
            </View>
        );
    }
}