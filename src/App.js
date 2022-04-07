import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './index.css';

function App() {
  function ChaiCard(props){
    return(
      <div className='border p-4'>
          <div className='flex mb-1'>
            <div className='font-bold text-lg'>{props.data.subTitle}</div> 
            <div className='ml-2 text-sm mt-1'>{props.data.usableLocationDescription}</div>
            
            {props.data.type == 'fcfs'
              && <div className='bg-red-700 text-white rounded-xl px-2 ml-2 font-bold my-auto'>타임딜!!</div>
            }
          </div>
          <div className='flex mb-2'>
              <div className='text-red-700 mr-2'>{props.data.title}</div>
              <div>/ {props.data.benefitDescription}</div>
          </div>
          <div className='flex'>  
              <div className='bg-yellow-200 w-fit rounded-xl px-2'>번개 {props.data.boltPrice}개 </div>
              <div  className='ml-2'>부스트당 {Math.floor(props.data.maxDiscountAmount/props.data.boltPrice)}원 할인!</div>
          </div>
      </div>
    )
  } 

  const [chaiDatas,setChaiDatas] = useState([]);
  const [searchText,setSearchText] = useState("")
  const [filter,setFilter] = useState("")

  const handleChange = (e) =>{
      setSearchText(e.target.value);
  } 

  useEffect(()=>{
    setFilter(searchText)
  },[searchText])

  const callApi = () => {
      axios.get("https://chai-api.byeon.is/available")
      .then(res=>{
        setChaiDatas(res.data.list)
      })
  }
  useEffect(()=>{
    callApi()
  },[])

  return (
      <div className=''>

        <div className='fixed w-full top-0 bg-white h-16 p-2'>
            <input className='bg-gray-200 h-12 w-full px-4 rounded-xl'
                onChange={handleChange}
                placeholder='원하는 브랜드 검색하세요'/>
        </div>  
        <div className='mt-16'>
          {chaiDatas.map((data)=>{
            return(
              <>              
              {filter == ""
                ?<ChaiCard data={data}/>
                :<>
                  {data.subTitle.includes(filter) &&  
                      <ChaiCard data={data}/>
                  }
                  </>
              }
              </>
          )})}
        </div>
      </div>
  );
}

export default App;
