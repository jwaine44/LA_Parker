import React, {useState, useEffect} from 'react'
import { MarkerF, InfoWindow } from '@react-google-maps/api'
import axios from 'axios';

const MarkerList = () => {
    const [selected, setSelected] = useState(null);
    const [markerList, setMarkerList] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/api/spots')
            .then(res => setMarkerList(res.data))
            .catch(err => console.log(err))
    }, [])

  return (
    <div>
        {
            markerList.map((marker => {
                return(
                    <MarkerF key = {marker._id}
                        position = {{lat: marker.latitude, lng: marker.longitude}}
                        onClick = {() => {
                            setSelected(marker._id);
                        }}>
                        {
                            selected?
                            (<InfoWindow position={{lat: marker.latitude, lng: marker.longitude}} onCloseClick = {() => {setSelected(null)}}>
                                <div>
                                    <p style = {{fontWeight: 'bold'}}>{marker.details}</p>
                                </div>
                            </InfoWindow>): null
                        }
                    </MarkerF>
                )
            }))
        }
    </div>
  )
}

export default MarkerList