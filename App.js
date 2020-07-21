import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Button} from 'react-native';

import Category from './components/Category';

export default function App() {

  const [data, setData] = useState([]);
  const images = [];
  const url = "http://jsonplaceholder.typicode.com/photos";

  let generateImageList;

  //Jsonify the url response and push to an images array to be processed.
  const getImages = () => {
    fetch(url)
    .then(res => res.json())
    .then(res => res.forEach((item) => images.push(item)),
          error => console.log(error.message) 
    )
  }

  //use knuth shuffle to recursively randomize image order
  const randomizeImagesOrder = (arr, index) => {
    let currentIndex = images.length, temporaryValue, randomIndex;

    if (index === 0) {
      return images;
    }else {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = temporaryValue;
      randomizeImagesOrder(arr, index-1);
    }
    return arr; 
  }

  //grab images asynchronously
  useLayoutEffect(() => { 
    getImages();
    console.log(images);
    generateImageList = images.map((key, index) => {
      console.log(images[index])
      return <Category key={key} imageUri={images[index].url} name={images[index].title} />
    });;
  });
    
  return (
    <View style={styles.container}>
      <Text style={{flex: 1, fontSize: 24, marginTop: 75}}>Convergence Front End Project</Text> 

      <ScrollView scrollEventThrottle={16}>
        <View style={{flex: 1, backgroundColor: 'white', paddingTop: 20}}>
          <Text style={{fontSize: 24, fontWeight: '700', paddingHorizontal: 20}}>
            Endless photos!
          </Text>

          <View style={{height: 330, marginTop: 10}}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {generateImageList}
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      <Button title="Randomize with magic" onPress={randomizeImagesOrder} />

      <Text style={{paddingHorizontal: 30, textAlign: 'center', paddingBottom: 30, opacity: 0.6}}>Any images you see here are gathered from http://jsonplaceholder.typicode.com/photos. Please refer to this link if you feel that there are missing photos present.</Text>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
