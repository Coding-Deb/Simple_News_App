import { StatusBar } from 'expo-status-bar';
import { Dimensions, FlatList, Image, Linking, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState, useEffect } from 'react'
import Icon from "react-native-vector-icons/Ionicons";

const width = Dimensions.get('window').width - 10

export default function App() {
  const [userData, setuserData] = useState([]);

  const getUserData=async ()=>{
    try {
      const data= await fetch('https://newsapi.org/v2/top-headlines?q=india&apiKey=395fb06c3bda4679b9f617965fdc30d8');
      const mydata= await data.json();
      setuserData(mydata.articles)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
   getUserData();
  }, [])
  

  return (
    <View style={styles.container}>
      <Text style={{fontSize:40,fontWeight:'700',marginTop:35,marginBottom:-16,textDecorationLine:'underline'}}>
        NewsWorld
      </Text>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 25,
        marginTop: 40,
        width: width - 30
      }}>
        <Icon name='search' size={25} color={'black'} style={{ padding: 10 }} />
        <TextInput
          placeholder='Search Here'
          style={{
            // flex: 1,
            padding: 15,
            backgroundColor: '#fff',
            color: '#424242',
            fontSize: 18
          }}
        />
      </View>
      <View 
      style={{ flexDirection:'row' ,marginBottom:20,marginTop:10}}>
        <TouchableOpacity 
        style={{
          backgroundColor: 'black',
          borderColor: 'black',
          borderWidth: 2,
          borderRadius: 25,
          width: 80,
          height: 30,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 15,
          marginRight: 10,
          marginLeft: 15
        }}>
          <Text style={{ fontSize: 12, fontWeight: '500', color: "white" }}>
            All
          </Text>
        </TouchableOpacity><TouchableOpacity 
        onPress={()=>navigation.navigate('Latest')}
        style={{
          backgroundColor: 'black',
          borderColor: 'black',
          borderWidth: 2,
          borderRadius: 25,
          width: 80,
          height: 30,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 15,
          marginRight: 12,
          marginLeft: 10
        }}>
          <Text style={{ fontSize: 12, fontWeight: '500', color: "white" }}>
            Latest
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
          backgroundColor: 'black',
          borderColor: 'black',
          borderWidth: 2,
          borderRadius: 30,
          width: 80,
          height: 25,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 15,
          marginRight: 10,
          marginLeft: 10
        }}>
          <Text style={{ fontSize: 12, fontWeight: '500', color: "white" }}>
            Sports
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
          backgroundColor: 'black',
          borderColor: 'black',
          borderWidth: 2,
          borderRadius: 25,
          width: 80,
          height: 30,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 15,
          marginRight: 10,
          marginLeft: 10
        }}>
          <Text style={{ fontSize: 12, fontWeight: '500', color: "white" }}>
            Science
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={userData}
        renderItem={({ item }) => {
          return (
            <View style={{
              marginTop: 22, marginRight: 12, marginLeft: 12, padding: 18, alignItems: 'center', backgroundColor: 'rgb(93, 110, 94)', shadowColor: 'black',shadowOffset: {
                height: 50,
                width: 15
              },
              shadowOpacity: 0.26
            }}>
              <View>
                <Text style={{ fontSize: 18, fontWeight: '600', margin: 12, color: 'white' }}>
                  {item.title}
                </Text>
                <Text style={{ color: 'white', fontSize: 12, fontWeight: '600', margin: 12, left: 200, textDecorationLine: 'underline' }}>
                  {item.publishedAt}
                </Text>
                <Image
                  source={{ uri: item.urlToImage }}
                  style={{ height: 200, width: 350, margin: 12 }}
                />
                <Text style={{ fontSize: 18, fontWeight: '400', margin: 8, color: 'rgb(220,226,246)' }}>
                  {item.description}
                </Text>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity style={{ width: 250, height: 50, padding: 12, margin: 12, borderColor: 'black', borderRadius: 25, borderWidth: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}
                    onPress={() => {
                      Linking.openURL(item.url)
                    }}
                  >
                    <Text style={{ fontSize: 15, fontWeight: '600', color: 'white' }}>
                      Read More
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )
        }}
        style={{ width: width, height: 50 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(200,220,240)',
    alignItems: 'center',
    justifyContent: 'center',
  },
})