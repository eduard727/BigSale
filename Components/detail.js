
import React from "react";
import {Image, StyleSheet, View, Text, TouchableOpacity, PanResponder, Dimensions} from 'react-native';
import { useEffect, useState, useRef } from "react";
import { formatPrice } from "../utils";
import api from '../API/dealsService';
import { Animated } from "react-native";

export default Detail = ({deal, onBack}) => {

     const [dealDetail, setDealDetail] = useState(deal);
     const [imageIndex, setImageIndex] = useState(0);
     const imageXpos = useRef(new Animated.Value(0)).current;

     useEffect(()=>{
          (async()=> {
               const dealDetail = await api.fetchDealDetail(deal.key);
               setDealDetail(dealDetail);
               console.log(dealDetail.user.avatar);
          })();
     },[]);

     useEffect(() => {
          Animated.spring(imageXpos, {
               toValue: 0,
               useNativeDriver: false,
          }).start();
     }, [imageIndex]);

     const panResponder = PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onPanResponderMove: (e, state) => imageXpos.setValue(state.dx),
          onPanResponderRelease: (e, state) => {
               const width = Dimensions.get('window').width;
               if (Math.abs(state.dx) > width *0.4){
                    const direction = Math.sign( state.dx);
                    Animated.timing(imageXpos,{
                         toValue: direction * width,
                         duration: 250,
                         useNativeDriver: false,
                    }).start(()=>{
                         console.log('imageIndex= '+imageIndex);
                         console.log('direction= '+direction);
                         console.log('next= '+imageIndex + direction * -1);
                         console.log('image= '+Object.values(dealDetail.media)[imageIndex + direction * -1]);
                         if (Object.values(dealDetail.media)[imageIndex + direction * -1]){
                              setImageIndex(() => imageIndex + direction * -1);
                              imageXpos.setValue(width * direction * -1);

                         } else {
                              Animated.spring(imageXpos,{
                                   toValue:0,
                                   useNativeDriver: false,

                              }).start();
                         }
                    });
               }else {
                    Animated.spring(imageXpos,{
                         toValue:0,
                         useNativeDriver: false,

                    }).start();
               }
          }
     });

     return (
          <View style={styles.deal}>
               
               <TouchableOpacity onPress={onBack}>
                    <Text style={styles.onBack}>Back</Text>
               </TouchableOpacity>

               <Animated.Image 
               style={[{left:imageXpos }, styles.image]} 
               source={{ uri: Object.values(dealDetail.media)[imageIndex] }} {...panResponder.panHandlers} />
               <View style={styles.detail}>
                    <View>
                         <Text style={styles.title}>{dealDetail.title}</Text>
                    </View>
                    <View style={styles.footer}>
                         <View style={styles.info}>
                              <Text style={styles.price}>{formatPrice(dealDetail.price)}</Text>
                              <Text style={styles.cause}>{dealDetail.cause.name}</Text>
                         </View>
                         {
                              dealDetail.user &&
                              <View style={styles.user}>
                                   <Image source={{ uri: dealDetail.user.avatar }} style={styles.avatar} />
                                   <Text>{dealDetail.user.name}</Text>
                              </View>
                         }
                    </View>
                    <View style={styles.description}>
                         <Text>{dealDetail.description}</Text>
                    </View>
               </View>
          </View>
          );
}

const styles = StyleSheet.create({
     deal: {
     // marginHorizontal: 12,
     // marginTop: 50,
     },
     image: {
     width: '100%',
     height: 150,
     backgroundColor: '#ccc',
     },
     detail: {},
     title: {
     fontSize: 16,
     padding: 10,
     fontWeight: 'bold',
     backgroundColor: 'rgba(237, 149, 45, 0.4)',

     borderColor: '#bbb',
     borderWidth: 1,
     },
     footer: {
     flexDirection: 'row',
     justifyContent: 'space-around',
     alignItems: 'center',
     marginTop: 15,
     },
     info: {
     alignItems: 'center',
     },
     user: {
     alignItems: 'center',
     },
     cause: {
     marginVertical: 10,
     },
     price: {
     fontWeight: 'bold',
     },
     avatar: {
     width: 60,
     height: 60,
     borderRadius: 30,
     },
     description: {
     borderColor: '#ddd',
     borderWidth: 1,
     borderStyle: 'dotted',
     margin: 10,
     padding: 10,
     },
     onBack:{
          marginBottom: 5,
          color: '#fff',
          marginLeft: 10,
          backgroundColor: 'purple',
          borderRadius: 5,
          height: 25,
          width:100,
     },
});