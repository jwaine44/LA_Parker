import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {useParams, Link, useNavigate} from 'react-router-dom';
import '../App.css'
import Map from './Map';

const UpdateSpot = () => {
    const {id} = useParams();
    const [details, setDetails] = useState('');
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/spots/${id}`)
            .then(res => {
                setDetails(res.data.details);
            })
    }, [id]);

    const updateSpotDetails = e => {
      e.preventDefault();
      axios.put(`http://localhost:8000/api/spots/${id}`, {
        details
      })
        .then(res => navigate(`/spots/${id}`))
        .catch(err => {
          const errorResponse = err.response.data.errors;
          const errorArr = [];
          for(const key of Object.keys(errorResponse)) {
            errorArr.push(errorResponse[key].message)
          }
          setErrors(errorArr);
        })
    }

  return (
    <div>
      <div className='strip'>
        <p><Link to = '/' className = 'white'><button className = 'btn'>Home</button></Link></p>
        <p><Link to = '/create' className = 'white'><button className = 'btnwide'>Add a spot</button></Link></p>
      </div>
      <div className='topbox'>
        <div className = 'push'>
          <Map />
          {/* <div className='placeholder'></div> */}
        </div>
        <div>
            <form onSubmit={updateSpotDetails}>
              <label className = 'hollywood'>Please add to or update the details for this spot:</label><br /><br />
              <div>
                <textarea rows = {"10"} cols = {"50"} value = {details} onChange = {e => setDetails(e.target.value)}></textarea><br /><br />
              </div>
              <button className = 'btn' type = 'submit'>Edit</button>
              <Link to = {`/spots/${id}`}><button className = 'btn'>Cancel</button></Link>
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

export default UpdateSpot