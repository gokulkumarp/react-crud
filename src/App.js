import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios'; 

import Table from './Component/Table';


function App() {

  const [fruitState, setFruitState] = useState("")

  const [increment, setIncrementCount] = useState(0)

  const [pageNumber, setPageNumber] = useState(1)
  
  const [hideState, setHideState] = useState(false)


  const [arrayData, setArrayData] = useState([])

  const fetchData = async(page)=>{
    try {
      const res = await axios.get(`https://api.randomuser.me?page=${page}`)
      return res
    } catch (error) {
      console.log(error)
    }
  }
  const fetchDataUser = (page)=>{
      fetchData(page).then((res)=>{
      const randomData = res.data.results
      const userInfo = [
        ...arrayData, 
        ...randomData
      ]
      setArrayData(userInfo)
      setPageNumber(page+1)
    })
  }
  
  useEffect(()=>{
    
    fetchDataUser(pageNumber)
   
  }, [])

const getfulluserName = (userInfo)=>{
  console.log(userInfo)
  const {name: {first, last}} = userInfo
  return `${first} ${last}`
}

  return (
    <>
    {hideState? <div className = "container">
      
      <div className="App">
        <select value = {fruitState}
   onChange={(e)=>{
          const foodSelected = e.target.value
          setFruitState(foodSelected)
        }}> 
          <option value="Mongo">Mongo</option>
          <option value="Orange">Orange</option>
          <option value="Banana">Banana</option>
          <option value="Apple">Apple</option>
        </select>
        {fruitState}
        </div>
        <div>
  
          <button onClick={()=>{
            setIncrementCount(increment+1)
          }}>+</button>
          {increment}
          <button onClick={()=>{
            setIncrementCount(increment-1)
          }}>-</button>
  
        </div>
        <button onClick={fetchDataUser}> Fetch Data User</button>
  
  
        <div> 
  
          {arrayData.map((userInfo, idx)=>(
            <div key= {idx}>
             <h1>{getfulluserName(userInfo)}</h1> 
             <img src={userInfo.picture.thumbnail} alt=""></img>
            </div>
            
          ))
          }
        </div>
        
        </div>:<p>Nothing to show</p>}
          



          <Table></Table>



      </>
  );
  }
export default App;
