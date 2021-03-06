import React, { useEffect } from 'react'
import axios from 'axios'

function LandingPage(props) {

  useEffect(() => {
    axios.get('/api/hello')
      .then(response => { console.log(response.data) })
  }, [])

  const onClickHandler = (event) => {
    axios.get('/api/user/logout')
      .then(response => {
        console.log(response.data);
        if (response.data.logoutSuccess) props.history.push('/login');
        else alert("Logout fail");
      })
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '70vh' }}>
        <h2>Welcome To Boiler Plate</h2>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '30vh' }}>
        <button onClick={onClickHandler}>Logout</button>
      </div>
    </div>
  )
}

export default LandingPage
