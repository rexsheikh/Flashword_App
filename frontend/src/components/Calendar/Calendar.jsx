import { useEffect } from 'react';
import { Chart } from 'react-google-charts';
    // function packageData(arr){
    //     let words;
    //     let flat; 
    //     let res = [];
    //     words = arr.map((deck)=> deck.words.map((date) => date.dates.map((date)=>date.date)))
    //     flat = words.flat(Infinity)


    // let test = packageData(props.parentDecks)
    // console.log(test)
    // const words = props.parentDecks.map((deck)=> deck.words.map((date) => date.dates.map((date)=>date.date)))
    // const flat = words.flat(Infinity)

    // console.log(new Date(flat[0]))
    // function packageData(arr){
    //     let res = []
    //     for(let i = 0; i < arr.length; i++){
    //         res.push([new Date(arr[i])])
    //     }
    //     return res
    // }
    // let test
    // test = packageData(flat)
    // console.log(test)

const Calendar = (props) => {

    useEffect(() => {

    }
);
    const words = props.parentDecks.map((deck)=> deck.words.map((date) => date.dates.map((date)=>date.date)))
    const flat = words.flat(Infinity)
    function getDateArray(arr = flat){
        let res = [];
        for(let i = 0; i < arr.length; i++){
            res.push([new Date(arr[i])])
        }
        return res
    }

 let dateArray = getDateArray(flat)
 console.log(dateArray)





    return (  
        <div>
            <h1>CALENDAR</h1>
        </div>
    );
}
 
export default Calendar;