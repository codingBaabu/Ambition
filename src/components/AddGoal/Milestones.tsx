import { formChangedType } from "./useForm"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

export default function Milestones({ 
        formChanged, removeMilestone, milestone, index, isPredated, isPredatedStart
    }:Milestones ){

        return (
        <div className='milestone-wrapper'>
                <div className='remove-milestone-button-and-title'>
                    <input  type='text' 
                            className='form-input milestone-name-input' 
                            placeholder='Name' 
                            name='milestoneTitle'
                            value={milestone.milestoneTitle} 
                            onChange={(e)=>formChanged(e, index)}
                            maxLength={35}
                            required
                    />
                    <div className='remove-milestone-container'>
                    <FontAwesomeIcon 
                        icon={faCircleXmark} 
                        onClick={()=>removeMilestone(index)} 
                        className='delete-button' />
                    </div>
                </div>

                <div className='milestone-dates-wrapper'>
                    <fieldset className='milestone-dates-section'>
                        <legend className='date-legend'>Start</legend>
                        <input type='date' className='date-input' name='startDate'
                            value={milestone.startDate} onChange={(e)=>formChanged(e, index)}
                            required
                        />
                    </fieldset>

                    <fieldset className='milestone-dates-section'>
                        <legend className='date-legend'>End</legend>
                        <input type='date' className='date-input' name='endDate'
                            value={milestone.endDate} onChange={(e)=>formChanged(e, index)}
                            required
                        />
                    </fieldset>
                </div>


                { isPredatedStart && <p className='error-message'>Start cannot pre-date today</p> }
                { isPredated && <p className='error-message'>End cannot pre-date start</p> }
            </div>
        )
}

type Milestones = {
    formChanged:formChangedType,
    removeMilestone:(index:number)=>void,
    milestone:{
        milestoneId:string,
        milestoneTitle:string,
        startDate:string,
        endDate:string,     
        feedAmbition:boolean,
        checked:boolean
    },
    index:number,
    isPredated:boolean,
    isPredatedStart:boolean
}
