import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {useParams, Link, useNavigate} from 'react-router-dom';
import '../App.css'
import DeleteButton from '../components/DeleteButton';
import Map from '../components/Map';

const ShowSpot = () => {
    const {id} = useParams();
    const [spot, setSpot] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/spots/${id}`)
            .then(res => {
                setSpot(res.data)
            })
    }, [id]);

    const redirectToMain = () => {
        navigate('/')
    }

  return (
    <div>
        {spot?
        <div>
            <div className='strip'>
                <p><Link to = '/' className = 'white'><button className = 'btn'>Home</button></Link></p>
                <p><Link to = '/create' className = 'white'><button className = 'btnwide'>Add a spot</button></Link></p>
            </div><br /><br />
            <div className='topbox'>
                <Map />
                {/* <div className='placeholder'></div> */}
                <div className='resultsbox'>
                    <p className='hollywood'>This spot is on: <span className='arial'>{spot.street}</span></p>
                    <p className='hollywood'>Between these cross streets:</p>
                    <p className='hollywood'>Cross Street 1: <span className='arial'>{spot.crossStreets.crossStreet1}</span></p>
                    <p className='hollywood'>Cross Street 2: <span className='arial'>{spot.crossStreets.crossStreet2}</span></p>
                    <p className='hollywood'>Neighborhood: <span className='arial'>{spot.neighborhood}</span></p>
                    <p className='hollywood'>Zip Code: <span className='arial'>{spot.zipCode}</span></p>
                    <p className='hollywood'>Details: <div className='details'>{spot.details}</div></p>
                    <p className='hollywood'>Have the details changed?
                    <Link to = {`/edit/${spot._id}`}><button className = 'btn'>Edit</button></Link></p>
                    <p className='hollywood'>Is this spot no longer viable?
                    <DeleteButton deleteId = {id} onDelete = {redirectToMain} /></p>
                </div>
            </div>
        </div>:
        <div><h1 style = {{textAlign: 'center'}}>Invalid entry!</h1></div>
    }
    </div>
  )
}

export default ShowSpot