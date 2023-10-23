import { useState, useEffect } from "react";

export default function CurrentTime(){
    const [time, setTime] = useState<string>()

    function displayTime() {
        const now = new Date();
        const militaryHours = now.getHours();
        const hours = militaryHours<12?militaryHours:militaryHours-12
        const minutes = now.getMinutes();
        const AMorPM = militaryHours<12?'AM':'PM'
        const string = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
        setTime(`${string} ${AMorPM}`)    
      }
      
      useEffect(()=>{
        displayTime()
        setInterval(displayTime, 1000);
      }, [])

    return (
        <div className='current-time-container'>
            <h2 className="current-time">{time}</h2>    
        </div>
    )
}