import React from 'react';
import { View } from 'react-native';
import {Input, Button, Header, Image} from 'react-native-elements'
import firebase from '../firebase'

var db = firebase.firestore();

export default class AddCourseScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = {courseName: this.props.navigation.getParam('courseName', 'Enter Course Name')}
    }
    static navigationOptions = {
        drawerLabel: () => null
    }

    onSubmit = () => {
        db.collection('courses').add({
            courseName: this.state.courseName,
            avatar_url: 'https://ui-avatars.com/api/?rounded=true&length=3&name=' + 
            this.state.courseName +'&background=' + Math.floor(Math.random()*16777215).toString(16),
            rating: 0,
            ratingCount: 0,
            ratingAvg: 0,
        }).then(() => {
            alert('Course Created!')
            this.props.navigation.goBack()
        }).catch((err) => console.log(err));
    }
    render() {
        return (
            <View style={{ alignItems:"center"}}>
            <Header
                    containerStyle={{backgroundColor: '#c5050c'}}
                    leftComponent={{icon: 'chevron-left', color: '#fff', onPress: () => this.props.navigation.goBack() }}
                    centerComponent={{ text: 'UW-Rate \'em!', style: { color: '#fff', fontSize: 20 } }}
                    rightComponent={<Image 
                                    source={require('../assets/uw-crest-web.png')}
                                    style={{ width: 25, height: 40 }}
                                    /> }
                    />
                <Input style={{width: 200, height: 40, borderWidth: 1}}
                    label='Course Name'
                    value={this.state.courseName}
                    onChangeText={(text) => { this.setState({courseName: text}) }}
                    placeholder={this.state.courseName}
                    containerStyle={{paddingBottom: 10, paddingTop: 10}}
                />
                <Button title="Create Course" onPress={this.onSubmit} buttonStyle={{backgroundColor: '#c5050c'}} />
            </View>
        );
    }
}