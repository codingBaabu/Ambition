import { useState, useEffect } from 'react'
import { completedMilestones } from './CompletedBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import Tooltip from './ToolTip';

export default function AmbitionBar(){
    const [doomsDay, setDoomsDay] = useState(
        JSON.parse(localStorage.getItem('doomsday') as unknown as string))

        const [difference, setDifference] = useState(1000)
        const [expandToolTip, setExpandTooltip] = useState(false)

    useEffect(()=>{
        const interval = setInterval(()=>{  
            if(doomsDay - new Date().getTime() >= 0) {
                setDifference(doomsDay - new Date().getTime())
            } else {     
                clearInterval(interval)
            }
        }, 1000)

        return ()=>clearInterval(interval)
    }, [doomsDay])

    useEffect(()=>{
        setDoomsDay(JSON.parse(localStorage.getItem('doomsday') as unknown as string))
    }, [completedMilestones])

    return (
        <div>
            <div className='ambition-bar'>
            
                <label htmlFor='completed'>Ambition: </label>
                <div className='more-info-ambition'>
                    <FontAwesomeIcon 
                        className={`ambition-icon`} 
                        onClick={()=>setExpandTooltip(!expandToolTip)}
                        icon={faCircleInfo} />
                    <Tooltip 
                        className={`${expandToolTip?'expand-tooltip':'collapse-tooltip'}`} 
                    />
                </div> 
                <progress id="completed" max={(1000*60*60*24*30)} value={difference?difference:0}></progress>
            </div>
        </div>
    )
}
