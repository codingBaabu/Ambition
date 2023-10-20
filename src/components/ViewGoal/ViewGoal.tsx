import { useContext } from "react";
import { getMonthAndYear, getDate } from "../../utils/utils";
import { GoalContext } from "../../App";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinimize, faExpand } from '@fortawesome/free-solid-svg-icons';
import { goalFormType } from "../AddGoal/useForm";

type GoalContextType = {
    isCollapsed:boolean, 
    toggleIsCollapsed:()=>void
}

export default function ViewGoal({id, goals}:{id:string, goals:goalFormType[]}){
    const goal = goals.find(goal=>id==goal.id)
    const {isCollapsed, toggleIsCollapsed}:GoalContextType = useContext(GoalContext)

    function getMilestoneElements(){
        if(goal){
            return goal.milestones.map((milestone, index)=>{
                return (
                        <div className='view-container' key={index}>
                        <div className="view-milestone-content">
                                <div className='goal-milestone-title-container rounded-top'>
                                    <h4 className='goal-milestone-title'>{milestone.milestoneTitle}</h4>
                                </div>        
                                    
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
    }

    if (!goal) {
        return <div></div>;
      }
      
    return (
        <div className={`view-goal-section ${isCollapsed?'collapsed':'open'}`} onClick={()=>toggleIsCollapsed()} >
            <div className='open-icon'>
                <p className='open-fa'><FontAwesomeIcon icon={isCollapsed?faExpand:faMinimize} /></p>
            </div>
            <div className='view-goal-sub-container'>
                <div className='view-top-section'>
                    <h3 className='view-goal-title'>{goal.title}</h3>
                </div>
                <div className='view-goal-milestones add-top-margin-to-goal-milestones'>
                    {getMilestoneElements()}           
                </div> 
            </div>
        </div>
    )
}
