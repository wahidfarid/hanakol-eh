 
// JavaScript File
const https = require('https')
const axios = require('./axios/index');

let url = "https://vendors.talabat.com/api/v2/vendors/";

exports.handler = async function(event, context, callback) {
  
  async function getTalabat(url){

    let response = await axios.get(url);
    return parseTalabat(response.data);
    
  }
  function parseTalabat(data){
    
    // Extract restaurants
    const responseRestaurants = data.result.restaurants; 
    // Filter them by deals and open status
    // dtxt refers to discount and ptxt reffers to offer
    // st refers to restaurant status {0: active, 1: closed, 2: busy}
    const filteredRestaurants = responseRestaurants.filter((restaurant)=> {
      return (restaurant.ptxt!="" || restaurant.dtxt!="") && restaurant.st != 1
    });
    
    // Pluck needed info
    let restaurants = filteredRestaurants.map( (restaurant)=>{
      return{
        name: restaurant.na,
        id: restaurant.bid,
        isDiscounted: restaurant.dtxt!="",
        isDeal: restaurant.ptxt!="",
        image: "https://images.deliveryhero.io/image/otlob/restaurants/"+restaurant.lg,
        link: `https://www.talabat.com/egypt/restaurant/${restaurant.bid}/${restaurant.bsl}`
      }
    });
    
    // Get relevant savings (discount percentage or deals)
    //  by iterating on all restaurants
    restaurants = addRelevantSavingsToTalabatRestaurants(restaurants);
    
    return restaurants;
  };

  async function addRelevantSavingsToTalabatRestaurants(restaurants){
  
    restaurants = await addDiscountInformationToTalabatRestaurants(restaurants);
    
    restaurants = await addDealInformationToTalabatRestaurants(restaurants);
    
    // Prune restaurants if they say deal but don't have deals
    // (happens when they are listed as a special offer but don't have old/new prices)
    restaurants = restaurants.filter((restaurant)=> !(restaurant.isDeal && restaurant.deals.length == 0) );
    
    return restaurants;
  }
  
  async function addDiscountInformationToTalabatRestaurants(restaurants){
    // if restaurant had discount, figure out how much
    let listOfDiscountPromises = restaurants
    .filter((restaurant) => restaurant.isDiscounted == true)
    .map((restaurant) => {
      return axios.post(`https://www.talabat.com/restaurantapi/v3/branch/${restaurant.id}/info`, {});
    });
    
    let discountedResponses = await Promise.all(listOfDiscountPromises);
    
    
    discountedResponses.forEach((response)=>{
        const data = response.data.result;
        const restaurantId = data.restaurant.bid;
        
        let currentRestaurantIndex = restaurants.findIndex((restaurant)=> restaurant.id == restaurantId);
        let updatedRestaurant = restaurants[currentRestaurantIndex];
        
        //////////////////////////////        
        // Update Discount information
        
        // If no promotion on discounted item, switch it to deal
        if(data.promotions.length == 0){
          // change attributes
          updatedRestaurant.isDiscounted = false;
          updatedRestaurant.isDeal = true;
        }
        else{ // if promotion exists, scrape it
        
          let discountValue = data
            .promotions[0]
            .inm.split(" ")
            .filter((textPart)=> textPart.includes("%"))
            .map((textPart) => textPart.replace("%",""))[0];

          let discountText = data.promotions[0].dsc;
          
          updatedRestaurant.discount = {
            percentage: Number(discountValue),
            text: discountText
          }
          
        }
        // update restaurant
        restaurants[currentRestaurantIndex] = updatedRestaurant;
        
    });
    
    // Remove any restaurants if the have 0 discount percentage
    restaurants = restaurants.filter((restaurant)=> !(restaurant.isDiscounted && restaurant.discount.percentage == 0));
    
    return restaurants;
  }
  
  async function addDealInformationToTalabatRestaurants(restaurants){
    
    let listOfMenuPromises = [];
    let inProgress = Promise.resolve();
    
    restaurants.forEach(function (restaurant) {
      inProgress = inProgress.then(function () {
        return new Promise(function (resolve) {
          setTimeout(()=>{
            listOfMenuPromises.push(axios.get(`https://www.talabat.com/menuapi/v2/branches/${restaurant.id}/menu`));
            resolve();
          }, 100);
        });
      });
    });
    await inProgress.then(function () {});

    
    let menuResponses = await Promise.all(listOfMenuPromises);

    menuResponses.forEach((response, index)=>{
        const data = response.data.result.menu.menuSection;
        
        let updatedRestaurant = restaurants[index];
        
        // get all menu items from sections
        let menuItems = data.map((menuSection)=>menuSection.itm);
        // flatten array
        menuItems = menuItems.flat();
        // filter for deals by existence of old price
        menuItems = menuItems.filter((menuItem)=> menuItem.opr != -1 && menuItem.opr != menuItem.pr);
        // pluck needed attributed
        menuItems = menuItems.map((menuItem)=> {
          
          // if the id doesn't exist in the menu items list
          if(menuItems.findIndex(originalMenuItem => originalMenuItem.itemId == menuItem.id) == -1){
            return {
              itemId: menuItem.id,
              name: menuItem.nm,
              oldPrice: menuItem.opr,
              price: menuItem.pr,
              description: menuItem.dsc
            }
          }
          // else return empty object to be deleted
          return {delete: true}
        });
        
        // Filter duplicated menu items (talabat provides duplicates in some menus)
        menuItems = menuItems.filter((item)=> item.delete != true );
        
        // update restaurant
        updatedRestaurant.deals = menuItems;
        restaurants[index] = updatedRestaurant;
        
    });
    
    return restaurants;
  }
  
  function getAllRestaurantData(url){

    // combine all services data
    return getTalabat(url);
    
  }
  
  // event = {queryStringParameters: {}};
  // event.queryStringParameters.lat = '29.956204900000003';
  // event.queryStringParameters.lng = '31.073941099999995';
  url = `https://vendors.talabat.com/api/v2/vendors/${event.queryStringParameters.lat}/${event.queryStringParameters.lng}`
  
  let restaurants = getAllRestaurantData(url);
    
    // Sort based on deal value
    // Return output
    // return restaurants;
  
  return restaurants;   
  

}

// exports.handler().then(data=> console.log(data, data.length));