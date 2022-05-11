// const words = props.parentDecks.map((deck)=> deck.words.map((date) => date.dates.map((date)=>date.date)))
// const flat = words.flat(Infinity)
// function getDateArray(arr = flat){
//     let res = [];
//     for(let i = 0; i < arr.length; i++){
//         res.push([new Date(arr[i])])
//     }
//     return res
// }

import { useEffect } from 'react';
import { Chart } from 'react-google-charts';
import { useState } from 'react'
import axios from 'axios';
import useAuth from '../../hooks/useAuth';


const Calendar = (props) => {

    const [user, token] = useAuth();
    const[dates,setDates] = useState()

    useEffect(() => {
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


function scoreAgg(arr){
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

let test = scoreAgg(dates)
console.log(test)


//  console.log(dates)
//  let sampleDate = dates[4].date
//  let new_date = sampleDate.split('-')
//  function ints(arr){
//      let res = []
//     for(let i = 0; i < new_date.length; i++){
//      res.push(parseInt(new_date[i]))
//  }
//  return res
// }
// let int_list = ints(new_date)
// console.log(int_list)
// let res = new Date (int_list[0],int_list[1],int_list[2])

console.log(dates)




let data = [
    [
      {
        type: "date",
        id: "Date",
      },
      {
        type: "number",
        id: "Won/Loss",
      },
    ],
    [new Date(2022, 2, 4), 10],
    [new Date(2022, 2, 5), 11],
    [new Date(2022, 2, 12),0],
    [new Date(2022, 2, 13),9],
    [new Date(2022, 2, 19),3],
    [new Date(2022, 2, 23),5],
    [new Date(2022, 2, 24),6],
    [new Date(2022, 2, 30),7],
    [new Date(2022,3,10),5],
  ];




 
    return (  
    <div>
        <Chart
        chartType="Calendar"
        width="100%"
        height="400px"
        data= {data}
        />
    </div>
    );

    }
export default Calendar;