import React, {useState} from 'react'
import Map from '../components/Map';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'

const Main = () => {
    const neighborhoods = ['Beverly Hills', 'Burbank', 'Echo Park', 'Koreatown', 'Downtown', 'Van Nuys', 'North Hollywood', 'Glendale', 'Sherman Oaks', 'Santa Monica', 'Venice', 'Silver Lake', 'Hollywood', 'West Hollywood', 'Culver City', 'Los Feliz', 'Westwood', 'Studio City']

    const [zipCode, setZipCode] = useState("");
    const [neighborhood, setNeighborhood] = useState("Beverly Hills");
    const navigate = useNavigate();


    const sendZipSearch = (e) => {
        e.preventDefault();
        navigate(`/spots/zip/${zipCode}`)
    }

    const sendNeighborhoodSearch = (e) => {
        e.preventDefault();
        navigate(`/spots/neighborhood/${neighborhood}`)
    }

  return (
    <div>
        <h2 className = 'explainer'>We all know driving in LA is tough... but with L.A. Parker, you can plan your trip and save yourself the headache of finding a free street parking spot by searching our database!</h2>
        <div className='maincontainer'>
            <div className='topbox'>
                <p className = 'hollywood'>Found a new spot?<br /> 
                <Link to = '/create'><button className = 'btnwide'>Create one!</button></Link></p>
                <p className = 'hollywood'>Looking for free street parking for your next trip? Search by neighborhood or zip code!</p>
            </div>
            <div className='bottombox'>
                <div className='leftbox'>
                    <p className='hollywood'>Browse the map!</p>
                    <Map />
                    {/* <div className='placeholder'></div> */}
                </div>
                <form onSubmit = {sendNeighborhoodSearch}>
                    <label className='hollywood'>Neighborhood</label><br />
                    <select value = {neighborhood} onChange = {e => setNeighborhood(e.target.value)}>
                        {neighborhoods.sort().map((neighborhood, i) => 
                            <option key = {i} value = {neighborhood}>{neighborhood}</option>
                        )}
                    </select>
                    <button className = 'btn' type = 'submit'>Search</button>
                </form>
                <form onSubmit = {sendZipSearch}>
                    <label className='hollywood'>Zip Code</label><br />
                    <input type = 'number' min = '90001' max = '91609' value = {zipCode} onChange={e => setZipCode(e.target.value)}></input>
                    <button className = 'btn' type = 'submit'>Search</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Main