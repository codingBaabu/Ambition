
import myImage from '../../checked-milestone-pic.png'

export default function Tooltip({className}:{className:string}){
    return (
        <div className={`ambition-tool-tip ${className}`}>
            <div className='ambition-tooltip-title-container'>
                <h2 className='ambition-tooltip-title'>AMBITION |<span className='tagline'> KEEP THE FIRE BURNING</span></h2>            
            </div>
            <div className='ambition-tooltip-text-container'>
                <ul className='ambition-tooltip-ul'>
                    <li className='ambition-tooltip-text'>Bar begins empty</li>
                    <li className='ambition-tooltip-text'> Check off a milestone? +3 days!</li>
                </ul>

                <img className='ambition-tooltip-image' src={myImage}/>

                <ul className='ambition-tooltip-ul'>
                    <li className='ambition-tooltip-text'>Bar is full at 30 days</li>
                    <li className='ambition-tooltip-text'>Be warned, it ticks down EVERY SECOND!</li>
                </ul>

            </div>
        </div>
    )
}