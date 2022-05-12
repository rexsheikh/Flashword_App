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

// console.log(dates)
// let sampleDate = dates[4].date
// let new_date = sampleDate.split('-')
// function ints(arr){
//     let res = []
//    for(let i = 0; i < new_date.length; i++){
//     res.push(parseInt(new_date[i]))
// }
// return res
// }
// let int_list = ints(new_date)
// console.log(int_list)
// let res = new Date (int_list[0],int_list[1],int_list[2])

function formatDates(str){
let res = []
let lst = str.split('-')
for(let i = 0; i < lst.length; i++){
    res.push(parseInt(lst[i]))
}
return new Date (res[0],res[1],res[2])
}

function packageData(arr){
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
    console.log(`score dict: ${score_dict}`)
    let entries = Object.entries(score_dict)
    console.log(`entries:${entries}`)
    for(let i = 0; i < entries.length; i++){
        container.push([formatDates(entries[i][0]),entries[i][1]])
    }
    return container
}

let test = packageData(dates)
console.log(test)

let data = test



 
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