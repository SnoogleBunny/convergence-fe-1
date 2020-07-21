import React, { Component } from 'react';
import {
    View, Text, StyleSheet, Image
} from 'react-native';

import CachedImage from 'react-native-expo-cached-image';

class Category extends Component {
    render() {
        return (
            <View style={styles.container}>
              <View style={{height: 300, width: 300, marginLeft: 20, borderWidth: 0.5, borderColor: '#dddddd', borderRadius: 20, elevation: 5, shadowColor: "black", shadowOffset:{  width: 2,  height: 5,  }, shadowOpacity: 0.3}}>
                <View style={{flex: 2}}>
                    <CachedImage 
                        source={this.props.imageUri} 
                        style={{flex: 1, width: null, height: null, resizeMode: 'cover', borderRadius: 20}} />
                    <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: 'white', fontSize: 50, fontWeight: '500', transform: [{ rotate: '-45deg'}],}}>{this.props.name}</Text>
                    </View>
                </View>
              </View>
            </View>
        );
    }
}
export default Category;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})