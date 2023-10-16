import {useState, useContext, useEffect} from 'react'
import { GoalContext } from '../../App'

export default function UpcomingMilestone(){
    const [upcomingMilestones, setUpcomingMilestones] = useState([])
    const {goalsLS, viewToggle, viewId, setViewId} = useContext(GoalContext)
    const [selected, setSelected] = useState('')
    let filteredGoals = []
    useEffect(() => {
        filteredGoals = goalsLS.filter(goal => {
            return goal.milestones.filter(milestone=>{
                console.log('testing: '+isDateWithinAWeekFromToday(milestone.endDate))
                return isDateWithinAWeekFromToday(milestone.endDate)
            })
        });

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
          console.log('VIEW ID BEFORE: '+viewId)
          if(viewId=='' || goalsLS.length===1){
            setViewId(getMilestones[0].id)
            console.log('VIEW ID AFTER: '+viewId)
          }
        
    }, [goalsLS]);

    function isDateWithinAWeekFromToday(targetDateString) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
            
        const oneWeekInMillis = 7 * 24 * 60 * 60 * 1000;
        const targetDateObj = new Date(targetDateString); 
        targetDateObj.setHours(0, 0, 0, 0);
          
        const diff = targetDateObj.getTime() - today.getTime();
          
        return diff > 0 && diff <= oneWeekInMillis;
    }
    
      const milestoneElements = upcomingMilestones.map((milestone, index)=>{
      
        return (
                <div key={index} className={`upcoming-milestone ${viewId===milestone.id?'milestone-selected':''}`} onClick={(e)=>viewToggle(milestone.id, e)}>
                    <h3>{milestone.milestoneTitle}</h3>
                    <p>{milestone.goalTitle}</p>
                    <p>{milestone.startDate}</p>
                    <p>{milestone.endDate}</p>
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