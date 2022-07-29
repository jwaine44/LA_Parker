import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../App.css'
import Map from '../components/Map';

const SearchResultZipCode = () => {
  const {zipCode} = useParams()
  const [spotList, setSpotList] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:8000/api/spots/zip/${zipCode}`)
      .then(res => setSpotList(res.data))
      .catch(err => console.log(err))
  }, [zipCode])

  return (
    <div>
      <div className='strip'>
        <p><Link to = '/' className = 'white'><button className = 'btn'>Home</button></Link></p>
        <p><Link to = '/create' className = 'white'><button className = 'btnwide'>Add a spot</button></Link></p>
      </div><br /><br />
      <div className='topbox'>
        <Map />
        {/* <div className='placeholder'></div> */}
          <div className='resultsbox'>
            <h1>Search results for: {zipCode}</h1>
            {spotList.length === 0?
              <div>
                <h2>No results!</h2>
              </div>:
              spotList.map((spot, i) => {
                return(
                  <div key = {i}>
                    <p className = 'result'><Link to = {`/spots/${spot._id}`} className = 'white'>On {spot.street} between {spot.crossStreets.crossStreet1} and {spot.crossStreets.crossStreet2}</Link></p>
                  </div>
                )
              })
            }
          </div>
      </div>
    </div>
  )
}

export default SearchResultZipCode