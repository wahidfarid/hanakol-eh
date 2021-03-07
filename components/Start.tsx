import React, { useState } from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';
import tw from 'tailwind-styled-components';
import {LocationMarkerSolid} from '@graywolfai/react-heroicons';
import Coordinates from '../interfaces/coordinates';
import GetLocationMapControl from './GetLocationMapControl';


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
`;

const StyledHeading = tw.h1`
    text-4xl 
    flex 
    flex-col 
    justify-center 
    align-middle 
    text-center 
    my-12 
`;

const StyledMapContainer = tw.div`
    relative 
    max-w-lg 
    max-h-96 
    w-screen 
    h-screen 
    mx-auto
    border-dashed 
    border-4 
    border-yellow-400
`;

type StartProps = {
    searchByLocation(map: Coordinates): void,
    google: any,
}

const Start = ({searchByLocation, google}: StartProps) => {

    const [currentCenter, setCurrentCenter] = useState({lat: 30.033333, lng:31.233334});

    const updateCenterFromMap= (map: google.maps.Map) => {
        const center = map.getCenter();
        setCurrentCenter({lat: center.lat(), lng: center.lng()});
    };

    const onMapReady = (_:any, map: any) => {
        map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(new GetLocationMapControl(map));
    }

return <>
    <StyledMapContainer>
        <StyledMarker/>
        <Map 
        google={google} 
        onReady={onMapReady}
        zoom={14} 
        streetViewControl={false} 
        mapTypeControl={false}
        clickableIcons={false}
        fullscreenControl={false}
        gestureHandling={'greedy'}
        zoomControl={true}
        initialCenter={currentCenter}
        onCenterChanged={(_mapProps, map)=> { return updateCenterFromMap(map as google.maps.Map) }}
        >
        </Map>
    </StyledMapContainer>
    <StyledHeading>
        <span>Drag the marker on the map, then press the button to find deals near you</span>
        <button className="mx-auto bg-yellow-400 text-2xl rounded p-4 font-semibold hover:bg-yellow-300 my-12" onClick={()=>{return searchByLocation(currentCenter);}}>Start Looking!</button>
    </StyledHeading>
</>}

export default GoogleApiWrapper({
    apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string, // google maps key
})(Start);

// export default Start;