import React, { ReactNode } from 'react';
import Lottie from "lottie-react";

import Layout from '../components/Layout'
import Start from '../components/Start';
import APIAggregator from './api/api-aggregator';
import RestaurantData from '../interfaces/restaurant-data';
import foodLoadingAnimation from "../public/img/food-lottie.json";
import ListRestaurant from '../components/ListRestaurant';
import Coordinates from '../interfaces/coordinates';

type MainState = {
  // location?: GeolocationCoordinates,
  location?: Coordinates
  restaurants: RestaurantData[],
  isQuerying: boolean
};

class IndexPage extends React.Component<{}, MainState>{

  state: MainState = {
    isQuerying: false,
    restaurants: [],
    location: {lat: 30.033333, lng:31.233334} 
  };

  searchByLocation = (location: Coordinates) => {
    this.setState({location, isQuerying: true});
      
      // Retrieve all restaurants and put them in state
    APIAggregator.getAllRestaurantData(location).then((restaurants: RestaurantData[])=>{
      this.setState({restaurants, isQuerying: false});
    });     
  };


  render():ReactNode {
  
    return <Layout title="Hanakol eh?">

      <div className="container flex flex-col justify-around align-middle">

          {/* Initial */}
          {
            (!this.state.isQuerying && this.state.restaurants.length == 0 && <Start searchByLocation={this.searchByLocation}/>)
          }

          {/* Loading */}
          {
            (this.state.isQuerying && <Lottie animationData={foodLoadingAnimation} style={ {height: 300} }/>)
          }

          {/* Results */}
          {
            (!this.state.isQuerying && this.state.restaurants.length > 0 && <ListRestaurant restaurants={this.state.restaurants}/> )
          }

      </div>

  </Layout>;
  }
}

export default IndexPage
