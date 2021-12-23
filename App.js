
import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Animated, Easing, Dimensions} from 'react-native';
import api from './API/dealsService';
import Deals from './Components/deals';
import Detail from './Components/detail';

export default function App() {

  const [deals, setDeals] = useState([]);
  const [currentDealId, setCurrentDealId] = useState (null);

  // animation
  const titleXPos = new Animated.Value(0);

  ///

  useEffect(async () => {
    (async() => {
      animateTitle();
    const deals = await api.fetchInitialDeals();//Extrae datos del API
    // //console.log(deals)
    setDeals(deals);
    }) ();
  }, []);

  //recorre todos los deals
  const getCurrentDeal = ( ) => deals.find(deal => deal.key === currentDealId);

  // Evento
  const unsetCurrentDealId = () => setCurrentDealId(null);

  const animateTitle = (direction =1) => {
    //console.log('animation');
    const width = (Dimensions.get('window').width - 200) / 2;
    Animated.timing(titleXPos,{
      toValue: direction * width,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(( finished )=> {
      if (finished){
          animateTitle(direction * -1);
        }
      });
  };

  return (
    < >
      {
        currentDealId ? ( 
          <View style={styles.main}>
              <Detail deal={getCurrentDeal()} onBack={unsetCurrentDealId}/>
          </View>
            ) : deals.length > 0 ? (         
            <Deals deals={deals} onItemPress={setCurrentDealId} />
            ): (
              <Animated.View style={[{left:titleXPos}, styles.container]}>
                <Text style={styles.header}>BigSale App!</Text>
              </Animated.View>
            )
      }
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    marginTop: 50,
  },
  container: {
    flex: 1,
    //backgroundColor: '#ffa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{
    fontSize: 40,
  },
});