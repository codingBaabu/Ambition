import {useState, useContext, useEffect} from 'react'
import { GoalContext } from '../../App'
import { getMonthAndYear, getDate } from "../../utils/utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

export default function UpcomingMilestone(){
    const [upcomingMilestones, setUpcomingMilestones] = useState([])
    const {goalsLS, viewToggle, viewGoalId, setViewGoalId, viewMilestoneId, setViewMilestoneId} = useContext(GoalContext)
    const [selected, setSelected] = useState('')
    const modeLS = localStorage.getItem('mode')
    const [mode, setMode] = useState(JSON.parse(modeLS)!=undefined?
                                        JSON.parse(modeLS):
                                        true)
    let filteredGoals = []

    useEffect(() => {
        filteredGoals = goalsLS.map(goal => {
            
            const filteredMilestones = goal.milestones.filter(milestone=>{
                return mode?isDateWithinAWeekFromToday(milestone.endDate):true
            })

            return filteredMilestones.length>0? 
                { ...goal, milestones:filteredMilestones }:
                null
        }).filter(filteredGoalsWithNull=>filteredGoalsWithNull!=null)

        const getMilestones = filteredGoals.map(goal=>{
            return goal.milestones.map(milestone=>{
                return {
                    id:goal.id,
                    milestoneId:milestone.milestoneId,
                    milestoneTitle:milestone.milestoneTitle,
                    goalTitle:goal.title,
                    startDate:milestone.startDate,
                    endDate:milestone.endDate,
                }
            })
          }).flat()
    
          getMilestones.sort((a, b) => {
            const dateA = new Date(a.endDate);
            const dateB = new Date(b.endDate);
            return dateA - dateB;
          })     

          setUpcomingMilestones(getMilestones);
          if(getMilestones.length!==0 && 
          (viewGoalId=='' || goalsLS.length===1 || !getMilestones.find(id=>id==viewMilestoneId)) ){
            setViewMilestoneId(getMilestones[0].milestoneId)
            setViewGoalId(getMilestones[0].id)
          }
        
    }, [goalsLS, mode]);

        useEffect(()=>{
            localStorage.setItem('mode', mode)            
            console.log(localStorage.getItem('mode'))
        }, [mode])


    function isDateWithinAWeekFromToday(targetDateString) {
        const today = new Date();
            
        const oneWeekInMillis = 7 * 24 * 60 * 60 * 1000;
        const targetDateObj = new Date(targetDateString); 
          
        const diff = targetDateObj.getTime() - today.getTime();
          
        return diff > 0 && diff <= oneWeekInMillis;
    }
    
      const milestoneElements = upcomingMilestones.map((milestone, index)=>{
        return (
            <div key={index} className={`upcoming-milestone-container ${viewMilestoneId===milestone.milestoneId?'milestone-selected':''}`} onClick={(e)=>viewToggle(milestone.id, milestone.milestoneId, e)}>

               <div className="upcoming-milestone-content">
                    <div className='goal-milestone-title-container upcoming-goal-milestone-title-container'>
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
      
    return (
        <div className='upcoming-milestones-and-title'>
            <div className='filter-and-upcoming'>
                <FontAwesomeIcon className='filter' icon={faFilter} onClick={()=>setMode(!mode)} />
                <h2 className='upcoming-milestones-title'>{mode?'Upcoming Milestones (This Week)':'Upcoming Milestones (All)'}</h2>
            </div>

            <div className='upcoming-section' >
                <div className='upcoming-section-inner'>
                    {milestoneElements}
                </div>
            </div>
        </div>
    )
}