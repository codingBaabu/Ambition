
import myImage from '../../checked-milestone-pic.png'

export default function Tooltip(){
    return (
        <div className='ambition-tool-tip'>
            <div className='ambition-tooltip-title-container'>
                <h2 className='ambition-tooltip-title'>AMBITION<span className='tagline'> - Keep the fire burning</span></h2>            
            </div>
            <div className='ambition-tooltip-text-container'>
                <p className='ambition-tooltip-text'>This bar begins empty and fills 3 days every time you check off a milestone.</p>
                <img className='ambition-tooltip-image' src={myImage}/>
                <p className='ambition-tooltip-text'>Fill 30 days and it will be maxed out, but be warned! The bar ticks down every second. To build this bar, you need to be diligent!</p>
            </div>
        </div>
    )
}