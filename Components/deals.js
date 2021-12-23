
import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import dealsService from "../API/dealsService";
import Deal from './deal'

export default Deals = ({ deals, onItemPress }) => {
     return (
          <View style={styles.list}>
               {/* {dealsService.map(deal =>
                    <Text key={deal.key}>{deal.title}</Text>
               )} */}
               <FlatList data={deals} renderItem={({ item })=>(
                    //<Text>{item.title}</Text>
                    <Deal deal={item} onPress = { onItemPress }/>
               )}/>
          </View>
     );
};

const styles = StyleSheet.create({
     list:{
          backgroundColor: '#eee',
          flex:1,
          width: '100%',
          paddingTop: 50,
     }
});