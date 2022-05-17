import { useEffect } from 'react';
import { Chart } from 'react-google-charts';
import { useState } from 'react'
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const Calendar = (props) => {
    const [user, token] = useAuth();
    const[dates,setDates] = useState();
    const[data,setData] = useState();
    const[avg,setAvg] = useState([]);

    

    useEffect(() => {
        getAvg();
        getDates();
      }, [token]);

const getDates = async () =>{
    try {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/decks/date_list/`,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
        setDates(response.data);
    } catch (e) {
      console.log(e.message);
    }
  }


const getAvg = async () =>{
    try {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/decks/review_average/`,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
        setAvg(response.data);
    } catch (e) {
      console.log(e.message);
    }
  }









let options = {
  calendar: {
    dayOfWeekLabel: {
      fontSize: 12,
      color: 'white',
      bold: false,
      italic: false
    },
  }
};
  if(!dates){
    return(
      <h2> chart loading....</h2>
    )}else if(!avg){
      return(
        <h2> chart loading....</h2>
        )
      }else{
    let scoreAgg = function scoreAgg(arr){
      let dict = {};
      for(let i = 0; i < arr.length; i++){
          if(!dict[arr[i].date]){
              dict[arr[i].date] = arr[i].reviews
          }else{
              dict[arr[i].date] += arr[i].reviews
          }
      }
      return dict  
  }
  let formatDates = function formatDates(str){
  let res = []
  let lst = str.split('-')
  for(let i = 0; i < lst.length; i++){
      res.push(parseInt(lst[i]))
  }
  return new Date (res[0],res[1] -1 ,res[2])
  }
  let packageData = function packageData(arr){
      let container = []
      let headers =     [
          {
            type: "date",
            id: "Date",
          },
          {
            type: "number",
            id: "reviews",
          },
        ]
        container.push(headers)
      let score_dict = scoreAgg(arr)
      let entries = Object.entries(score_dict)
      for(let i = 0; i < entries.length; i++){
          container.push([formatDates(entries[i][0]),entries[i][1]])
      }
      return container
  }
    let data = packageData(dates)
  return (  
  <div style = {{backgroundColor:"#5F7161"}}>
  {avg ? (
    <h4 style = {{marginLeft:"50rem",color:'#EFEAD8'}}> Average Cards/Day : {avg.total.reviews__avg} </h4> ) : (
    <h4> data loading...</h4>
  )}
  <div style = {{marginLeft:"30rem"}}>
      <Chart
    chartType="Calendar"
    width="100%"
    height="400px"
    data = {data}
    options = {options}
    />
  </div>
  </div>
  );
      
    }}
export default Calendar;