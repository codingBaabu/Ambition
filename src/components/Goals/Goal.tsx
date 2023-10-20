import { GoalContext } from '../../App';
import {useContext, useState, useEffect} from 'react'
import { getMonthAndYear, getDate } from "../../utils/utils";
import { goalFormType } from "../AddGoal/useForm";

type GoalContextType = {
    toggle:(
        event:  React.MouseEvent<HTMLButtonElement | HTMLDivElement> |
                React.FormEvent<HTMLFormElement>
            ) => void,
    editToggle:(
        id:string, 
        event:  React.MouseEvent<HTMLButtonElement | HTMLDivElement> |
                React.FormEvent<HTMLFormElement>
            ) => void,
    deleteGoal:(id:string, e:React.MouseEvent<HTMLButtonElement>)=>void
    toggleChecked:(id:string, index:number, e:React.MouseEvent<HTMLDivElement>)=>void
}


export default function Goal({ children }: {children:goalFormType} ):JSX.Element {
    const {id, title, description, milestones} = children
    const {editToggle, deleteGoal, toggleChecked}:GoalContextType = useContext(GoalContext)
    const [viewingMilestone, setViewingMilestone] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)
    const visibleClass = viewingMilestone?'visible':''
    
    const milestonesCompletedArr = milestones.map(milestone=>milestone.checked)
    const milestonesCheckedValues = milestones.map(milestone=>milestone.checked)
    const completedMilestones = milestonesCompletedArr.filter(milestone=>milestone).length

    useEffect(()=>{
        setIsCompleted(milestonesCheckedValues.every(status => status));
    }, [completedMilestones])

    function toggleViewingMilestone(){
        setViewingMilestone(prev=>!prev)
    }

    function getMilestoneElements(){
        return milestones.map((milestone, index)=>{
            return (
                <div key={index} className={`milestone-section ${visibleClass}`} onClick={(e)=>toggleChecked(id, index, e)}>
                        <div className='checkbox-container' onClick={(e)=>toggleChecked(id, index, e)}>
                            <div className={milestone.checked?`clicked-checkbox`:'empty-checkbox'}></div>
                        </div>
                        <div className="upcoming-milestone-content">
                            <div className='goal-milestone-title-container'>
                                <h4 className='goal-milestone-title'>{milestone.milestoneTitle}</h4>
                            </div>
    
                            <h4>{milestone.checked}</h4>
                            
                            <div className='goal-date-section'>
                                <div className='goal-date-total'>
                                    <p className='goal-date-num'>{getDate(milestone.startDate)}</p>
                                    <p className='goal-date'>{getMonthAndYear(milestone.startDate)}</p>                                    
                                </div>
        
                                <p className='to-goals'>to</p>
    
                                <div className='goal-date-total'>
                                    <p className='goal-date-num'>{getDate(milestone.endDate)}</p>
                                    <p className='goal-date'>{getMonthAndYear(milestone.endDate)}</p>                                    
                                </div>
                            </div>
                        </div>
                </div>
            )
        })
    }

    function getMilestoneProgressBars(){
        return milestonesCheckedValues.map((checked, index)=>(
                <progress key={index} className="milestone-count" max={1} value={checked?1:0}></progress>
        ))
    }
    
    return (
        <div className={`${isCompleted?'completed-goal':''} goal`} onClick={()=>toggleViewingMilestone()}>
            <div className='goal-header'>
        
                <div className='goal-edit-and-delete'>
                    <div className='edit-container'>
                        <button className='edit-button' onClick={(e)=>{editToggle(id, e)}}>&#x270E;</button>     
                    </div>
                    <div className='delete-container'>
                       <button className='delete-button' onClick={(e)=>{deleteGoal(id, e)}}>x</button>     
                    </div>
                    
                </div>
           </div>

           <div className='goal-content'>
            <h3>{title} - <span className='goal-description'>{description}</span></h3>

                <div className='milestone-count-container'>
                    {!viewingMilestone && getMilestoneProgressBars()}
                </div>

                <div className={`goal-milestones-container ${visibleClass?'add-top-margin-to-goal-milestones':''}`}>
                    {getMilestoneElements()}
                </div>
           </div>          
        </div>
    )
}
