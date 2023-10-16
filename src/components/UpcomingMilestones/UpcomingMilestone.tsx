import {useState, useContext, useEffect} from 'react'
import { GoalContext } from '../../App'
import { getDateFormat } from "../../utils/utils";

export default function UpcomingMilestone(){
    const [upcomingMilestones, setUpcomingMilestones] = useState([])
    const {goalsLS, viewToggle, viewId, setViewId} = useContext(GoalContext)
    const [selected, setSelected] = useState('')
    let filteredGoals = []
    useEffect(() => {
        filteredGoals = goalsLS.map(goal => {
            
            const filteredMilestones = goal.milestones.filter(milestone=>{
                return isDateWithinAWeekFromToday(milestone.endDate)
            })

            return filteredMilestones.length>0? 
                { ...goal, milestones:filteredMilestones }:
                null
        }).filter(filteredGoalsWithNull=>filteredGoalsWithNull!=null)

        const getMilestones = filteredGoals.map(goal=>{
            return goal.milestones.map(milestone=>{
                return {
                    id:goal.id,
                    milestoneTitle:milestone.milestoneTitle,
                    goalTitle:goal.title,
                    startDate:milestone.startDate,
                    endDate:milestone.endDate,
                }
            })[0]
          })
    
          getMilestones.sort((a, b) => {
            const dateA = new Date(a.endDate);
            const dateB = new Date(b.endDate);
            return dateA - dateB;
          })     

          setUpcomingMilestones(getMilestones);
          if(viewId=='' || goalsLS.length===1){
            setViewId(getMilestones[0].id)
          }
        
    }, [goalsLS]);

    function isDateWithinAWeekFromToday(targetDateString) {
        const today = new Date();
            
        const oneWeekInMillis = 7 * 24 * 60 * 60 * 1000;
        const targetDateObj = new Date(targetDateString); 
          
        const diff = targetDateObj.getTime() - today.getTime();
          
        return diff > 0 && diff <= oneWeekInMillis;
    }
    
      const milestoneElements = upcomingMilestones.map((milestone, index)=>{
      
        return (
                <div key={index} className={`upcoming-milestone ${viewId===milestone.id?'milestone-selected':''}`} onClick={(e)=>viewToggle(milestone.id, e)}>
                    <h3>{milestone.milestoneTitle}</h3>
                    <p>{milestone.goalTitle}</p>
                    <p>{getDateFormat(milestone.startDate)}</p>
                    <p>{getDateFormat(milestone.endDate)}</p>
                </div>
            )
      })
      
    return (
        <div className='upcoming-milestones-and-title'>
            <h2 className='upcoming-milestones-title'>Upcoming Milestones</h2>
            <div className='upcoming-section' >
                {milestoneElements}
            </div>
        </div>
    )
}