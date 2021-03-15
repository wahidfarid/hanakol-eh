import React, { ReactNode } from 'react';
import Lottie from "lottie-react";

import Layout from '../components/Layout'
import Start from '../components/Start';
import APIAggregator from './api/api-aggregator';
import { QueryPayload } from '../interfaces/restaurant-data';
import foodLoadingAnimation from "../public/img/food-lottie.json";
import ListRestaurant from '../components/ListRestaurant';
import Coordinates from '../interfaces/coordinates';

type MainState = {
  // location?: GeolocationCoordinates,
  location?: Coordinates
  data: QueryPayload,
  isQuerying: boolean,
};

class IndexPage extends React.Component<{}, MainState>{

  state: MainState = {
    isQuerying: false,
    location: {lat: 30.033333, lng:31.233334},
    data: {
      pruned:{
        closed: {
            1: 0
        },
        fakeDeal: {
            1: 0
        }
      },
      time: '',
      restaurants: []
    } as QueryPayload
  };

  searchByLocation = (location: Coordinates) => {
    this.setState({location, isQuerying: true});
      
      // Retrieve all restaurants and put them in state
    APIAggregator.getAllRestaurantData(location).then((response: QueryPayload)=>{
      this.setState({data: response, isQuerying: false});
    });
  };


  render():ReactNode {
  
    return <Layout title="Hanakol eh?">

      <div className="container flex flex-col justify-around align-middle">

          {/* Initial */}
          {
            (!this.state.isQuerying && this.state.data.restaurants.length == 0 && <Start searchByLocation={this.searchByLocation}/>)
          }

          {/* Loading */}
          {
            (this.state.isQuerying && <Lottie animationData={foodLoadingAnimation} style={ {height: 300} }/>)
          }

          {/* Results */}
          {
            (!this.state.isQuerying && this.state.data.restaurants.length > 0 && 
              <ListRestaurant 
              restaurants={this.state.data.restaurants}
              numberOfClosedRestaurants={this.state.data.pruned.closed[1]}
              numberOfFakeDealRestaurants={this.state.data.pruned.fakeDeal[1]}/> )
          }

      </div>

  </Layout>;
  }
}

export default IndexPage
