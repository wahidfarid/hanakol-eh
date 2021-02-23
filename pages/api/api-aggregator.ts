import Coordinates from '../../interfaces/coordinates';
import RestaurantData from '../../interfaces/restaurant-data';
import TalabatAPI from './talabat';

class APIAggregator{
    static async getAllRestaurantData(location: Coordinates):Promise<RestaurantData[]>{
        return await TalabatAPI.getRestaurantDataByGPS(location);
    }
}

export default APIAggregator;