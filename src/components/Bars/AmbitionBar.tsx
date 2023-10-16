import {useState, useEffect, useRef} from 'react'
import { completedMilestonesLength, completedMilestones } from './CompletedBar'

export default function AmbitionBar(){
    const [doomsDay, setDoomsDay] = useState(
        JSON.parse(localStorage.getItem('doomsday'))
    )

    const [difference, setDifference] = useState(1000)
    const [out, setOut] = useState(false)

    useEffect(()=>{
        const interval = setInterval(()=>{  
            if(doomsDay - new Date().getTime() >= 0) {
                console.log('DIFFERENCE - '+difference)
                setDifference(doomsDay - new Date().getTime())
            } else {     
                clearInterval(interval)
                setOut(true)
            }
        }, 1000)

        return ()=>clearInterval(interval)
    }, [doomsDay])

    useEffect(()=>{
        setDoomsDay(JSON.parse(localStorage.getItem('doomsday')))
    }, [completedMilestones])

    return (
        <div>
            <div className='ambition-bar'>
                <label htmlFor='completed'>Ambition: </label>
                <progress id="completed" max={120000} value={difference?difference:0}></progress>
            </div>
        </div>
    )
}
