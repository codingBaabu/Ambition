import { formChangedType } from "./useForm"

export default function Milestones({ 
        formChanged, removeMilestone, milestone, index, isPredated 
    } :any ){

        return (
        <div className='milestone-wrapper'>
                <div className='remove-milestone-button-and-title'>
                    <input type='text' className='form-input milestone-name-input' placeholder='Name' name='milestoneTitle'
                        value={milestone.milestoneTitle} onChange={(e)=>formChanged(e, index)}
                        required
                    />
                    <div className='remove-milestone-container'>
                        <button className='remove-milestone-button' type="button" onClick={()=>removeMilestone(index)}>x</button>
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


                { isPredated && <p>End cannot pre-date start</p> }
            </div>
        )
}

type Milestones = {
    children:{
        milestoneTitle:string,
        startDate:string,
        endDate:string,   
    }[],
    formChanged:formChangedType,
    removeMilestone:(index:number)=>void
}
