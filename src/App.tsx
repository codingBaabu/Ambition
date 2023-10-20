import { useState, useEffect, createContext } from 'react'

import Goals from './components/Goals/Goals'
import Goal from './components/Goals/Goal'
import Modal from './components/AddGoal/Modal'
import { goalFormType } from './components/AddGoal/useForm'
import UpcomingMilestone from './components/UpcomingMilestones/UpcomingMilestone'
import AmbitionBar from './components/Bars/AmbitionBar'
import CompletedBar from './components/Bars/CompletedBar'
import ViewGoal from './components/ViewGoal/ViewGoal'

const GoalContext:any = createContext(null)

export default function App() {
  const goalsFromLS = localStorage.getItem('goals')
  const parsedGoalsFromLS = goalsFromLS ? JSON.parse(goalsFromLS) : null
  const [goalsLS, setGoalsLS] = useState<goalFormType[]|null>(parsedGoalsFromLS)

  const [isAddingGoal, setIsAddingGoal] = useState<boolean>(false)
  const [isEditingGoal, setIsEditingGoal] = useState<boolean>(false)
  const [isViewingInitModal, setIsViewingInitModal] = useState<boolean>(false)
  const [id, setId] = useState<string>()
  const [viewGoalId, setViewGoalId] = useState('')
  const [viewMilestoneId, setViewMilestoneId] = useState('')
  const isCollapsedStringLS = localStorage.getItem('collapsed')
  const isCollapsedLS = isCollapsedStringLS?JSON.parse(isCollapsedStringLS):null
  const [isCollapsed, setIsCollapsed] = useState(isCollapsedLS?isCollapsedLS:false)

  const [goals, setGoals] = useState<JSX.Element[]>([])

  function toggle(e:React.SyntheticEvent){
    e.stopPropagation()
    setIsAddingGoal(prev=>!prev)
    setIsViewingInitModal(prev=>!prev)
  }

  function editToggle(id:string, e:React.SyntheticEvent){
    e.stopPropagation()
    setIsEditingGoal(prev=>!prev)
    setId(id)
  }

  
  function viewToggle(id:string, milestoneId:string){
    setViewGoalId(id)
    setViewMilestoneId(milestoneId)
  }

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

  function toggleChecked(id:string, milestoneIndex:number, e:React.SyntheticEvent){
    e.stopPropagation()
    const updatedGoals = goalsLS?goalsLS:[]
    let indexForGoal = -1

    updatedGoals.forEach((goal, index)=>{
      if(goal.id==id){
        indexForGoal = index    
      }
    })  

    const checkedMilestone = updatedGoals[indexForGoal].milestones[milestoneIndex]
    checkedMilestone.checked = !checkedMilestone.checked
    
    if(!checkedMilestone.feedAmbition){
      checkedMilestone.feedAmbition=true
      const ddString = localStorage.getItem('doomsday')
      const dd = ddString?JSON.parse(ddString):''
      const maxTime = (1000*60*60*24*30)
      let extraTime =  (1000*60*60*24*3)
      extraTime = dd-new Date().getTime()>maxTime?0:extraTime
      
      if(dd && dd>new Date().getTime()){
        localStorage.setItem('doomsday', JSON.stringify(dd+extraTime))
      } else {
        localStorage.setItem('doomsday', JSON.stringify(new Date().getTime()+extraTime))
      }
    }

    const updatedGoalStringified = JSON.stringify(updatedGoals)
    localStorage.setItem('goals', updatedGoalStringified)    
    
    const ls = localStorage.getItem('goals');
    const parsed = ls ? JSON.parse(ls) : null;
    setGoalsLS(parsed);
  }

  function toggleIsCollapsed(){
    localStorage.setItem('collapsed', JSON.stringify(!isCollapsed))
    setIsCollapsed(!isCollapsed)
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
        toggle, viewToggle, viewGoalId, setViewGoalId, viewMilestoneId, setViewMilestoneId, deleteGoal, toggleChecked, setId, isCollapsed, toggleIsCollapsed
      }}>
      
      <div className='container'>  
        {goalsLS && goalsLS.length>0 && 
          <div className='top-section'>
              <div>
                <AmbitionBar/>
                <CompletedBar/>
              </div>
            
            <div className={`upcoming-milestones-and-preview ${isCollapsed?'upcoming-milestones-full-width':'upcoming-milestones-reduced-width'}`}>
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

