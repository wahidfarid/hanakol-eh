import RestaurantData from '../../interfaces/restaurant-data';
import TalabatAPI from './talabat';

class APIAggregator{
    static getAllRestaurantData(location: GeolocationCoordinates):RestaurantData[]{
        TalabatAPI.getRestaurantDataByGPS(location);
        return [];
    }
}

export default APIAggregator;