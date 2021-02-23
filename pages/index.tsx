import React, { ReactNode } from 'react';
import Link from 'next/link'
import tw from "tailwind-styled-components"
import Lottie from "lottie-react";

import Layout from '../components/Layout'
import Start from '../components/Start';
import APIAggregator from './api/api-aggregator';
import RestaurantData from '../interfaces/restaurant-data';
import foodLoadingAnimation from "../public/img/food-lottie.json";
import ListRestaurant from '../components/ListRestaurant';

type MainState = {
  // location?: GeolocationCoordinates,
  location?: {longitude: number, latitude: number}
  restaurants: RestaurantData[],
  isQuerying: boolean
};

class IndexPage extends React.Component<{}, MainState>{

  state: MainState = {isQuerying: false, restaurants: []};

  componentDidUpdate(prevProps:{}, prevState:MainState){
    // check if restaurants data changed

    // prevState.restaurants = prevState.restaurants || [];
    // if(JSON.stringify(prevState.restaurants) == JSON.stringify(this.state.restaurants) ){
    //   console.log("RESR DATA UPDATED");
    // }
  }



  searchByLocation = (location:google.maps.LatLngLiteral) => {
    const parent = this;
    // navigator.geolocation.getCurrentPosition(function(position) {
    //   // Set location in state

      const coords = {longitude: location.lng, latitude: location.lat};
      parent.setState({location: coords, isQuerying: true});

      // Retrieve all restaurants and put them in state
      APIAggregator.getAllRestaurantData(coords).then((restaurants: RestaurantData[])=>{
        parent.setState({restaurants, isQuerying: false});
      });      
    // });
  };


  render():ReactNode {
  
    return <Layout title="Hanakol eh?">

      <div className="container flex flex-col justify-around align-middle">

          {/* Initial */}
          {
            (!this.state.isQuerying && this.state.restaurants.length == 0 && <Start searchByLocation={(map)=>this.searchByLocation(map)}/>)
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
