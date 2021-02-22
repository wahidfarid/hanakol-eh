const axios = require('axios');
import RestaurantData from '../../interfaces/restaurant-data';

class TalabatAPI{
    static async getRestaurantDataByGPS(location:GeolocationCoordinates):Promise<RestaurantData[]>{

        let url = "https://31dme1tc4c.execute-api.eu-central-1.amazonaws.com/Hanakol-eh-api?loc=1234567";
        let response = await axios.get(url);
        console.log(response);

        return [];
    }
}

export default TalabatAPI;