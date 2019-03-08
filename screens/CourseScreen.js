import React from 'react';
import { StyleSheet, View, Image , Text} from 'react-native';
import { Header, Rating, AirbnbRating } from 'react-native-elements';
import firebase from '../firebase'

var db = firebase.firestore()

export default class CourseScreen extends React.Component {
  state =  {
    rating: 0,
    courseName: ''
  }
  static navigationOptions = {
    drawerLabel: () => null
  }

  ratingComplete = (rating, coursename) => {
    db.collection("courses").where("courseName", "==", coursename)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          return db.runTransaction(function(transaction) {
            return transaction.get(doc.ref).then(function(courseDoc) {
              if (!courseDoc.exists) {
                  throw "Document does not exist!";
              }
              var newCount = courseDoc.data().ratingCount + 1;
              var newRating = courseDoc.data().rating + rating;
              if(!courseDoc.data().ratingCount || !courseDoc.data().ratingAvg) {
                newCount = 1;
                newRating = rating;
              }
              transaction.update(doc.ref, { ratingCount: newCount, rating:  newRating, ratingAvg: newRating/newCount });
            });
          })
        });
      alert('You\'ve Rated ' + rating + '!')
    }).catch((error) => {
      console.log(error)
    })
  }
  componentDidUpdate(){
    const coursename = this.props.navigation.getParam('coursename', 'Unknown Course');
    if(coursename != this.state.courseName) {
      db.collection("courses").where("courseName", "==", coursename)
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.setState({courseName: coursename, rating: Math.round(doc.data().ratingAvg)})
          });
      }).catch((error) => {
        console.log(error)
      })
    }
  }
  componentDidMount() {
    const coursename = this.props.navigation.getParam('coursename', 'Unknown Course');
    db.collection("courses").where("courseName", "==", coursename)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.setState({courseName: coursename, rating: Math.round(doc.data().ratingAvg)})
        });
    }).catch((error) => {
      console.log(error)
    })
  }
  render() {
    const { navigation } = this.props;
    const coursename = navigation.getParam('coursename', 'Unknown Course');
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
            <AirbnbRating
            count={4}
            reviews={["Terrible", "Meh", "Good", "Very Good"]}
            defaultRating={this.state.rating}
            size={50}
            onFinishRating={ 
              firebase.auth().currentUser.isAnonymous ? () => {alert('Please login to rate!')} 
              : (rating) => this.ratingComplete(rating, coursename) 
            }
            
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
