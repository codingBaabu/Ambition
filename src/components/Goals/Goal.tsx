import Modal from "../AddGoal/Modal"
import { GoalContext } from '../../App';
import {useContext, useState, useEffect} from 'react'
import { getDateFormat } from "../../utils/utils";

export default function Goal({ children }: GoalType ):JSX.Element {
    const {id, title, description, milestones} = children
    const {isEditingGoal, editToggle, deleteGoal, toggleChecked} = useContext(GoalContext)
    const [goalCompleted, setGoalCompleted] = useState([])
    const [viewingMilestone, setViewingMilestone] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)
    const visibleClass = viewingMilestone?'visible':''
    
    const milestonesCompletedArr = milestones.map(milestone=>milestone.checked)
    const totalMilestones = milestonesCompletedArr.length
    const milestonesCheckedValues = milestones.map(milestone=>milestone.checked)
    const completedMilestones = milestonesCompletedArr.filter(milestone=>milestone===true).length

    useEffect(()=>{
        setIsCompleted(milestonesCheckedValues.every(status => status === true));
    }, [completedMilestones])

    function toggleViewingMilestone(){
        setViewingMilestone(prev=>!prev)
    }

    function getMilestoneElements(){
        return milestones.map((milestone, index)=>{
            return (
                <div key={index} className={`milestone-section ${visibleClass}`} onClick={(e)=>toggleChecked(id, index, e)}>
                    <div key={index} className='upcoming-milestone-container'>
                        <div className='checkbox-container' onClick={(e)=>e.stopPropagation()}>
                            <div className={milestone.checked?`clicked-checkbox`:'empty-checkbox'}></div>
                        </div>
                        <div className="upcoming-milestone-content">
                            <h4>{milestone.milestoneTitle}</h4>
                            <h4>{milestone.checked}</h4>
                            
                            <p>{getDateFormat(milestone.startDate)}</p>
                            <p>{getDateFormat(milestone.endDate)}</p>
                        </div>
                    </div>
                </div>
            )
        })
    }

    function getMilestoneProgressBars(){
        return milestonesCheckedValues.map(checked=>(
                <progress className="milestone-count" max={1} value={checked?1:0}></progress>
        ))
    }
    
    return (
        <div className={`${isCompleted?'completed-goal':''} goal`} onClick={()=>toggleViewingMilestone()}>
            <div className='goal-header'>
                <div className='goal-title-and-edit'>
                    <h3>{title}</h3>
                    <button className='edit-button' onClick={(e)=>{editToggle(id, e)}}>&#x270E;</button>     
                </div>
                <div className='delete-container'>
                    <button className='delete-button' onClick={(e)=>{deleteGoal(id, e)}}>x</button>     
                </div>
           </div>

           <p>{description}</p>

           <div className='milestone-count-container'>
               {!viewingMilestone && getMilestoneProgressBars()}
            </div>

           <div className='goal-milestones-container'>
               {getMilestoneElements()}
            </div>
        </div>
    )
}

type GoalType = {
    children:{
        title:string,
        description:string,
        milestones:{
            milestoneTitle:string,
            startDate:string,
            endDate:string,        
        }[]
    }
}