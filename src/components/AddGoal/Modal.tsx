
import useForm from './useForm'
import Milestones from './Milestones'
import Title from './Title'
import Description from './Description'
import useAddGoalToLocalStorage from './useAddGoalToLocalStorage'
import { FormEvent, useContext } from 'react';
import { goalFormType } from './useForm';
import FocusLock from 'react-focus-lock';
import { GoalContext } from '../../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

export default function Modal({ id }: showType ){
    const {formData, formChanged, addMilestone, removeMilestone, setFormData} = useForm(id)
    const {toggle, editToggle} = useContext<GoalContextType>(GoalContext)
    const formSubmitted = useAddGoalToLocalStorage(setFormData)
    let isSubmittable = false

    function endDateAfterStartDateCheck(e:FormEvent<HTMLFormElement>, formData:goalFormType){
        e.preventDefault()
        if(isSubmittable){
            id?editToggle(id, e):toggle(e)
            formSubmitted(e, formData)   
        }
    }

    function getMilestoneElements(){
        return formData.milestones.map((milestone, index) =>{
            let startDateAsDate = new Date(milestone.startDate)
            startDateAsDate.setHours(0, 0, 0)

            let endDateAsDate = new Date(milestone.endDate)
            endDateAsDate.setHours(0, 0, 0)

            let now = new Date()
            now.setHours(0, 0, 0)

            let isPredated = startDateAsDate.getDate() > endDateAsDate.getDate()
            let isPredatedStart = startDateAsDate.getDate()+1 < now.getDate()
            isSubmittable = isPredated || isPredatedStart?false:true

            return (
                <Milestones 
                    key={index} formChanged={formChanged} removeMilestone={removeMilestone} 
                    milestone={milestone} index={index} isPredatedStart={isPredatedStart} isPredated={isPredated}/>
            )
        })
    }

    return (
        <div className='modal-outer' onClick={(e)=>id?editToggle(id, e):toggle(e)}>
            <div className={'modal'} onClick={(e)=>e.stopPropagation()}>                
                <div className='inner-modal'>
                    <FocusLock>
                        <div className='delete-container-modal'>
                        <FontAwesomeIcon 
                                icon={faCircleXmark}      
                                className='delete-button-modal' 
                                onClick={(e)=>id?editToggle(id, e):toggle(e)}
                            />     
                        </div>

                        <form 
                            className='modal-form' 
                            onSubmit={(e)=>endDateAfterStartDateCheck(e, formData)}>
                            <h1 
                                className='modal-title'>{id?'Edit ':'Create '} Goal
                            </h1>
                            <Title 
                                formChanged={formChanged} 
                                formData = {formData} 
                            />
                            <Description 
                                formChanged={formChanged} 
                                formData = {formData} 
                            />

                            <fieldset 
                                className='create-milestones-section'>
                                <legend className='add-milestone-button-container'>
                                    Milestones
                                    <FontAwesomeIcon icon={faCirclePlus} 
                                        name='add-milestone-button' 
                                        className='add-milestone-button' 
                                        onClick={()=>addMilestone()}
                                    />
                                </legend>
                                {getMilestoneElements()}
                            </fieldset>
                            <div 
                                className='modal-submit-wrapper'>
                                <button 
                                    className='modal-submit'>
                                        {id?'Edit':'Create'}
                                </button>                            
                            </div>
                        </form>
                    </FocusLock>
                </div>
            </div>
        </div>
    )
}

type showType = { 
    id?:string 
}

type GoalContextType = {
    toggle:(
        event:  React.MouseEvent<HTMLOrSVGElement | HTMLDivElement> |
                React.FormEvent<HTMLFormElement>
            ) => void,
    editToggle:(
        id:string, 
        event:  React.MouseEvent<HTMLOrSVGElement | HTMLDivElement> |
                React.FormEvent<HTMLFormElement>
            ) => void
}
