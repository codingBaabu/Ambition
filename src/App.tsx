import { useEffect, createContext } from 'react'
import Goals from './components/Goals/Goals'
import Goal from './components/Goals/Goal'
import Modal from './components/AddGoal/Modal'
import UpcomingMilestone from './components/UpcomingMilestones/UpcomingMilestone'
import AmbitionBar from './components/Bars/AmbitionBar'
import CompletedBar from './components/Bars/CompletedBar'
import ViewGoal from './components/ViewGoal/ViewGoal'
import useToggles from './useToggles'

const GoalContext:any = createContext(null)

export default function App() {
  const { toggle, editToggle, viewToggle, toggleIsCollapsed, toggleChecked, 
          goalsLS, goals, setGoals, setGoalsLS, isEditingGoal, viewGoalId, 
          setViewGoalId, isCollapsed, viewMilestoneId, setViewMilestoneId,
          setId, id, isViewingInitModal, isAddingGoal
  } = useToggles()

  function deleteGoal(id:string, e:React.SyntheticEvent){
    e.stopPropagation()
    const updatedGoals = goalsLS?goalsLS:[]
    
      updatedGoals.forEach((goal, index)=>{
        if(goal.id==id){
          updatedGoals.splice(index, 1)
        }
      })  

    const updatedGoalStringified = JSON.stringify(updatedGoals)

    localStorage.setItem('goals', updatedGoalStringified)    
    
    const ls = localStorage.getItem('goals');
    const parsed = ls ? JSON.parse(ls) : null;
    setGoalsLS(parsed);
  }
 
  useEffect(()=>{
    if(goalsLS!==null){
      setGoals(goalsLS.map((goal, index)=>(
        <Goal key={index}>{goal}</Goal>
      )))
  
    }
  }, [goalsLS])

  return (
    <GoalContext.Provider value=
      {{
        goalsLS, setGoalsLS, editToggle, isEditingGoal, 
        toggle, viewToggle, viewGoalId, setViewGoalId, viewMilestoneId, 
        setViewMilestoneId, deleteGoal, toggleChecked, setId, isCollapsed, toggleIsCollapsed
      }}>
      
      <div className='container'>  
        {goalsLS && goalsLS.length>0 && 
          <div className='top-section'>
              <div>
                <AmbitionBar/>
                <CompletedBar/>
              </div>
            
            <div className={`upcoming-milestones-and-preview 
              ${isCollapsed?
                'upcoming-milestones-full-width':
                'upcoming-milestones-reduced-width'}`}>
              <UpcomingMilestone/>
              <ViewGoal id={viewGoalId} goals = {goalsLS} />
            </div>
          </div>
        }

        <div className='container-inner'>
          <Goals toggle={toggle} isViewingInitModal={isViewingInitModal}>
              {goalsLS && goals}
          </Goals>

          {isAddingGoal && <Modal />}
          {isEditingGoal && <Modal id={id} />}
        </div>
      </div>
    </GoalContext.Provider>
  )
}

export { GoalContext }

