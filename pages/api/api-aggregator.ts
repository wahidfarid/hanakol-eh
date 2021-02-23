import RestaurantData from '../../interfaces/restaurant-data';
import TalabatAPI from './talabat';

class APIAggregator{
    static async getAllRestaurantData(location: {latitude: number, longitude: number}):Promise<RestaurantData[]>{
        return await TalabatAPI.getRestaurantDataByGPS(location);
    }
}

export default APIAggregator;