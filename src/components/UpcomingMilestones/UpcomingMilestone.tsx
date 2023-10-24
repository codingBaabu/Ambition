import {useState, useContext, useEffect } from 'react'
import { GoalContext } from '../../App'
import { getMonthAndYear, getDate } from "../../utils/utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { goalFormType } from '../AddGoal/useForm';

export default function UpcomingMilestone(){
    const [upcomingMilestones, setUpcomingMilestones] = useState<milestone[]>([])
    const {goalsLS, viewToggle, viewGoalId, setViewGoalId, viewMilestoneId, setViewMilestoneId}:GoalContextProps = useContext(GoalContext)
    const modeLS:string | null = localStorage.getItem('mode')
    const [mode, setMode] = useState( modeLS != undefined?
                                                JSON.parse(modeLS):
                                                true)
    let filteredGoals = []

    useEffect(() => {
        filteredGoals = goalsLS.map(goal => {
            
            const filteredMilestones = goal.milestones.filter(milestone=>{
                return mode?isDateWithinARange(milestone.endDate, true):isDateWithinARange(milestone.endDate)
            })

            return filteredMilestones.length>0? 
                { ...goal, milestones:filteredMilestones }:
                null
        }).filter(filteredGoalsWithNull=>filteredGoalsWithNull!=null)

        const getMilestones:milestone[]|milestone = filteredGoals.map((goal:goalFormType|null)=>{
            return goal!==null? goal.milestones.map(milestone=>{
                return {
                    id:goal.id,
                    milestoneId:milestone.milestoneId,
                    milestoneTitle:milestone.milestoneTitle,
                    goalTitle:goal.title,
                    startDate:milestone.startDate,
                    endDate:milestone.endDate,
                }
            }):null
          }).flat()
    
          getMilestones.sort((a:milestone, b:milestone) => {
            if(a===null || b === null){
                return 0
            }
            const dateA = new Date(a.endDate);
            const dateB = new Date(b.endDate);
            return dateA.getTime() - dateB.getTime();
          })     

          setUpcomingMilestones(getMilestones);
          if(   getMilestones.length!==0 && 
            (   viewGoalId=='' || 
                goalsLS.length===1 || 
                !getMilestones.find((milestone:milestone) => 
                    milestone?milestone.id==viewMilestoneId:null)) 
            ){
                setViewMilestoneId(getMilestones[0]?getMilestones[0].milestoneId:'')
                setViewGoalId(getMilestones[0]?getMilestones[0].id:'')
          }
        
    }, [goalsLS, mode]);

        useEffect(()=>{
            localStorage.setItem('mode', mode)            
        }, [mode])


    function isDateWithinARange(targetDateString:string, isWithinAWeek=false) {
        const today = new Date();
        today.setHours(0, 0, 0)
        const rangeInMillis = 7 * 24 * 60 * 60 * 1000;
        
        const [year, month, day] = targetDateString.split('-').map(Number);
        const targetDateObj = new Date(year, month - 1, day);
        targetDateObj.setHours(23, 59, 59)   

        const diff = targetDateObj.getTime() - today.getTime();
       
        console.log(targetDateString)
        console.log(diff)
        

        if(isWithinAWeek){
            return diff > 0 && diff <= rangeInMillis;
        } else {
            return diff > 0 
        }
    }
    
      const milestoneElements = upcomingMilestones.map((milestone, index)=>{
        if(milestone!=null){
            return (
                <div key={index} 
                    className={`upcoming-milestone-container 
                                ${viewMilestoneId===milestone.milestoneId?
                                  'milestone-selected':''}`} 
                    onClick={(e)=>viewToggle(milestone.id, milestone.milestoneId, e)}>

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
            }
        }
      )
      
    return (
        <div className='upcoming-milestones-and-title'>
            <div className='filter-and-upcoming'>
                <FontAwesomeIcon className='filter' icon={faFilter} onClick={()=>setMode(!mode)} />
                <h2 className='upcoming-milestones-title'>
                    {mode?'Upcoming (This Week)':
                    'Upcoming (All)'}
                </h2>
            </div>

            <div className='upcoming-section' >
                <div className='upcoming-section-inner'>
                    {milestoneElements}
                </div>
            </div>
        </div>
    )
}


type GoalContextProps = {
    goalsLS:goalFormType[],
    viewToggle:(goalID:string, milestoneID:string, e:React.MouseEvent<HTMLButtonElement | HTMLDivElement>)=>void,
    viewGoalId:string,
    setViewGoalId:(newId:string)=>void,
    viewMilestoneId:string,
    setViewMilestoneId:(newId:string)=>void
}

type milestone = {
    id:string,
    milestoneId:string,
    milestoneTitle:string,
    goalTitle:string,
    startDate:string,
    endDate:string,
} | null