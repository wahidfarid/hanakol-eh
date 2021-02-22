import React from 'react';
import RestaurantData from "../interfaces/restaurant-data";

type ListRestaurantProps = {
    restaurants: RestaurantData[]
};

class ListRestaurant extends React.Component<ListRestaurantProps, {}>{

    render(){
        return "List Restaurant";
    }
}

export default ListRestaurant;