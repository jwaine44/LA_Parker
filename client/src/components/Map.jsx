import React, {useMemo, useState, useCallback, useRef} from 'react'
import '../App.css'
import { GoogleMap, useLoadScript, MarkerF, InfoWindow } from '@react-google-maps/api'
import MarkerList from './MarkerList';

const Map = () => {

    const [markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(null);

    const containerStyle = {
        width: '500px',
        height: '500px',
    }

    const center = useMemo(() => (
        {lat: 34.055439469329286,
        lng: -118.27444285887253}), 
        []);

    const options = useMemo(() => ({
        mapId: "83d5a543ae187996",
        disableDefaultUI: true,
        clickableIcons: false,
        zoomControl: true,
    }), []);

    const onMapClick = useCallback((event) => {
        setMarkers(current => [
            ...current, 
        {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            time: new Date(),
        }]);
    }, [])

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, [])

    const MY_KEY = process.env.REACT_APP_API_KEY;

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: MY_KEY,
    });

    if(!isLoaded){
        return(
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    console.log(selected)

  return (
    <div className = 'container'>
        <div className='map'>
            <GoogleMap
                zoom = {10}
                center = {center}
                mapContainerStyle = {containerStyle}
                options = {options}
                onClick = {onMapClick}
                onLoad = {onMapLoad}
            >
                <MarkerList />
                {markers.map((marker) => (
                    <MarkerF key = {marker.time.toISOString()} position = {{lat: marker.lat, lng: marker.lng}} draggable = {true}
                    onClick = {() => {
                        setSelected(marker);
                    }} />
                ))}
                {selected? (<InfoWindow position = {{lat: selected.lat, lng: selected.lng}} onCloseClick = {() =>{
                    setSelected(null);
                }}>
                    <div>
                        <p>Latitude: <span style = {{fontWeight: 'bold'}}>{selected.lat}</span><br /> Longitude: <span style = {{fontWeight: 'bold'}}>{selected.lng}</span></p>
                    </div>
                </InfoWindow>): null}  
            </GoogleMap>
        </div>
    </div>
  )
}

export default Map