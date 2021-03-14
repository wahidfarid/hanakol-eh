const axios = require('axios');
import Coordinates from '../../interfaces/coordinates';
import {QueryPayload} from '../../interfaces/restaurant-data';

class APIAggregator{
    static async getAllRestaurantData(location: Coordinates):Promise<QueryPayload>{
        return await APIAggregator.getRestaurantDataByGPS(location);
    }
    static async getRestaurantDataByGPS(location: Coordinates):Promise<QueryPayload>{

        let url = "https://31dme1tc4c.execute-api.eu-central-1.amazonaws.com/Hanakol-eh-api?lat="+location.lat+"&lng="+location.lng;
        let response = await axios.get(url);


        return response.data as QueryPayload;
    }
}

export default APIAggregator;