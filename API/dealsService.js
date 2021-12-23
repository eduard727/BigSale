

const apiHost = 'https://bigsale-14101-default-rtdb.firebaseio.com';

export default {
     async fetchInitialDeals(){
          try{
               let response = await fetch (apiHost + '/deals.json');
               let json = await response.json();
               //console.log(json);
               return Object.values(json);

          }catch (error) {
               console.error('error');
          }
     },

     async fetchDealDetail (dealId){
          try {
               const response = await fetch(apiHost + `/deal-details/${dealId}.json`);
               const json = await response.json();
               return json;
          } catch (error) {
               console.log(error);
          }
     },

}// fin de default