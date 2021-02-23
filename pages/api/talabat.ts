const axios = require('axios');
import RestaurantData from '../../interfaces/restaurant-data';

class TalabatAPI{
    static async getRestaurantDataByGPS(location: {latitude: number, longitude: number}):Promise<RestaurantData[]>{

        let url = "https://31dme1tc4c.execute-api.eu-central-1.amazonaws.com/Hanakol-eh-api?lat="+location.latitude+"&lng="+location.longitude;
        let response = await axios.get(url);

        return response.data as RestaurantData[];
    }
}

export default TalabatAPI;