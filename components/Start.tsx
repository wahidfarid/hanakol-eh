import React, { ReactNode, useState } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import tw from 'tailwind-styled-components';
import {LocationMarkerSolid} from '@graywolfai/react-heroicons';


const StyledMarker = tw(LocationMarkerSolid)`
    w-12
    h-12
    text-yellow-600
    z-50
    absolute
    left-1/2
    top-1/2
    -my-12
    -ml-6
`


type StartProps = {
    searchByLocation(map: google.maps.LatLngLiteral): void,
    google: any,
}

const Start = ({searchByLocation, google}: StartProps) => {

    const [currentCenter, setCurrentCenter] = useState({lat: 30.033333, lng:31.233334});

    const updateCenterFromMap= (map: google.maps.Map):google.maps.LatLngLiteral => {
        console.log("i am here");
        const center = map.getCenter();
        return {lat: center.lat(), lng: center.lng()};
    };

return <>
    <h1 className="text-5xl flex flex-col justify-center align-middle text-center my-12">
        <span>Press the button to find deals near you</span>
        <button className="mx-auto bg-yellow-400 text-2xl rounded p-4 font-semibold hover:bg-yellow-300 my-12" onClick={()=>{searchByLocation(currentCenter)}}>Start Looking!</button>
    </h1>
    <div className="block relative max-w-lg max-h-96 w-screen h-screen mx-auto relative">
        <StyledMarker/>
        <Map 
        google={google} 
        zoom={14} 
        streetViewControl={false} 
        mapTypeControl={false}
        clickableIcons={false}
        fullscreenControl={false}
        gestureHandling={'greedy'}
        zoomControl={false}
        initialCenter={currentCenter}
        center={currentCenter}
        onCenterChanged={(mapProps, map)=> { updateCenterFromMap(map as google.maps.Map); }}
        >
            {/* <Marker 
            position={currentCenter}
            draggable={true}
            onClick={()=>{console.log("clicky")}
            }/> */}

        </Map>
    </div>
</>}

export default GoogleApiWrapper({
    apiKey: "AIzaSyAAC8Dk4bEmU8tLS6KcPsSRvJAHj-guH2M", // google maps key
})(Start);

// export default Start;