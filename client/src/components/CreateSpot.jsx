import React, {useState} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import '../App.css'
import Map from './Map'

const CreateSpot = () => {
    const neighborhoods = ['Beverly Hills', 'Burbank', 'Echo Park', 'Koreatown', 'Downtown', 'Van Nuys', 'North Hollywood', 'Glendale', 'Sherman Oaks', 'Santa Monica', 'Venice', 'Silver Lake', 'Hollywood', 'West Hollywood', 'Culver City', 'Los Feliz', 'Westwood', 'Studio City']

    const [street, setStreet] = useState("");
    const [crossStreets, setCrossStreets] = useState({
        crossStreet1: "",
        crossStreet2: ""
    });
    const [neighborhood, setNeighborhood] = useState("Beverly Hills");
    const [zipCode, setZipCode] = useState("");
    const [details, setDetails] = useState("");
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const onSubmitHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/spots', {street, crossStreets, neighborhood, zipCode, details, latitude, longitude})
            .then(res => navigate('/'))
            .catch(err => {
                const errorReponse = err.response.data.errors;
                const errorArr = [];
                for(const key of Object.keys(errorReponse)) {
                    errorArr.push(errorReponse[key].message)
                }
                setErrors(errorArr);
            })
    }

    const changeCrossStreet1 = (e) => {
        setCrossStreets((prevState) => {
            return {
                ...prevState,
                crossStreet1: e.target.value
            };
        });
    };

    const changeCrossStreet2 = (e) => {
        setCrossStreets((prevState) => {
            return {
                ...prevState,
                crossStreet2: e.target.value
            };
        });
    };


  return (
    <div>
        <div className='strip'>
            <p><Link to = '/' className = 'white'><button className = 'btn'>Home</button></Link></p>
        </div>
            <h2 className = 'tight'>Make our search results even better by adding a new spot!</h2>
        <div className='topbox'>
            <div>
                <fieldset>
                <legend className = 'hollywood'>Adding a new spot to the map is easy! Just follow these simple steps:</legend>
                <ul>
                    <li className = 'arial'>Zoom in on the map where the spot is located</li>
                    <li className = 'arial'>Click on the map to place a marker at the spot</li>
                    <li className = 'arial'>Click on the marker to get its coordinates</li>
                    <li className = 'arial'>Copy and paste the latitude and longitude coordinates into the respective field in this form!</li>
                </ul>
                </fieldset><br />
                <Map />
                {/* <div className='placeholder'></div> */}
            </div>
            <div className='resultsbox'>
                <form onSubmit={onSubmitHandler}>
                    <table>
                        <tbody>
                        <tr>
                            <td><label className = 'hollywood'>What street is this spot on?</label></td>
                            <td><input type = 'text' value = {street} onChange = {e => setStreet(e.target.value)}></input></td>
                        </tr>
                        <tr>
                            <td><p className = 'hollywood'>Between which cross streets?</p></td>
                        </tr>
                        <tr>
                            <td><label className = 'hollywood'>First cross street:</label></td>
                            <td><input type = 'text' value = {crossStreets.crossStreet1} onChange = {changeCrossStreet1}></input></td>
                        </tr>
                        <tr>
                            <td><label className = 'hollywood'>Second cross street:</label></td>
                            <td><input type = 'text' value = {crossStreets.crossStreet2} onChange = {changeCrossStreet2}></input></td>
                        </tr>
                        <tr>
                            <td>
                                <label className = 'hollywood'>Neighborhood:</label>
                            </td>
                            <td>
                                <select className = 'createSelect' value = {neighborhood} onChange = {e => setNeighborhood(e.target.value)}>
                        {neighborhoods.sort().map((neighborhood, i) => 
                            <option key = {i} value = {neighborhood}>{neighborhood}</option>
                        )}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><label className = 'hollywood'>Zip Code:</label></td>
                            <td><input type = 'number' min = '90001' max = '91609' value = {zipCode} onChange = {e => setZipCode(e.target.value)}></input></td>
                        </tr>
                        <tr>
                            <td><label className = 'hollywood'>Latitude (optional):</label></td>
                            <td><input type = 'number' step = 'any' min = '-90' max = '90' value = {latitude} onChange = {e => setLatitude(e.target.value)}></input></td>
                        </tr>
                        <tr>
                            <td><label className = 'hollywood'>Longitude (optional):</label></td>
                            <td><input type = 'number' step = 'any' min = '-180' max = '180' value = {longitude} onChange = {e => setLongitude(e.target.value)}></input></td>
                        </tr>
                        </tbody>
                    </table><br />
                    <div>
                        <label className = 'hollywood'>Please add any details that will help our users, like street sweeping times</label><br />
                        <textarea rows = {"10"} cols = {"50"} value = {details} onChange = {e => setDetails(e.target.value)}></textarea>
                    </div><br />
                    <button className = 'btn' type = 'submit'>Add</button>
                    <Link to = '/'><button className = 'btn'>Cancel</button></Link>
                </form>
                {
                    errors.map((err, i) => {
                        return(
                            <p key = {i} style = {{color: 'red', fontWeight: 'bold'}}>{err}</p>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default CreateSpot