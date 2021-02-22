import React from 'react';
import styled from 'styled-components';
import Masonry from 'react-masonry-css';

import RestaurantData from "../interfaces/restaurant-data";
import Restaurant from './Restaurant';

type ListRestaurantProps = {
    restaurants: RestaurantData[]
};

const StyledMasonry = styled.div`
.my-masonry-grid {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-left: -30px;
    width: auto;
}
.my-masonry-grid_column {
padding-left: 30px;
background-clip: padding-box;
}
`

class ListRestaurant extends React.Component<ListRestaurantProps, {}>{

    render(){
        return <StyledMasonry>
        <Masonry
            breakpointCols={{
                default: 4,  
                1100: 3,
                800: 2,
                500: 1                
            }}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
            {
                this.props.restaurants.map((restaurant)=> <Restaurant key={restaurant.id} data={restaurant}/> )
            }
        </Masonry>
      </StyledMasonry>;
    }
}

export default ListRestaurant;