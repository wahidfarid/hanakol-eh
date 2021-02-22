import RestaurantData from '../../interfaces/restaurant-data';
import TalabatAPI from './talabat';

class APIAggregator{
    static async getAllRestaurantData(location: GeolocationCoordinates):Promise<RestaurantData[]>{
        return await TalabatAPI.getRestaurantDataByGPS(location);
    }
}

export default APIAggregator;