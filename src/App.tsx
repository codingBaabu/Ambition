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

function App() {
  const goalsFromLS = localStorage.getItem('goals')
  const parsedGoalsFromLS = goalsFromLS ? JSON.parse(goalsFromLS) : null
  const [goalsLS, setGoalsLS] = useState<goalFormType[]|null>(parsedGoalsFromLS)

  const [isAddingGoal, setIsAddingGoal] = useState<boolean>(false)
  const [isEditingGoal, setIsEditingGoal] = useState<boolean>(false)
  const [isViewingGoal, setIsViewingGoal] = useState<boolean>(false)
  const [isViewingInitModal, setIsViewingInitModal] = useState<boolean>(false)
  const [id, setId] = useState()
  const [viewId, setViewId] = useState('')

  const [goals, setGoals] = useState<JSX.Element[]>([])

  function toggle(e){
    e.stopPropagation()
    setIsAddingGoal(prev=>!prev)
    setIsViewingInitModal(prev=>!prev)
  }

  function editToggle(id, e){
    e.stopPropagation()
    setIsEditingGoal(prev=>!prev)
    setId(id)
  }

  
  function viewToggle(id, e){
    setIsViewingGoal(prev=>!prev)
    setViewId(id)
  }

  function deleteGoal(id, e){
    e.stopPropagation()
    const updatedGoals = goalsLS
    
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

  function toggleChecked(id, milestoneIndex, e){
    e.stopPropagation()
    const updatedGoals = goalsLS
    let indexForGoal

    updatedGoals.forEach((goal, index)=>{
      if(goal.id==id){
        indexForGoal = index    
      }
    })

    updatedGoals[indexForGoal].milestones[milestoneIndex].checked = !updatedGoals[indexForGoal].milestones[milestoneIndex].checked
    
    if(!updatedGoals[indexForGoal].milestones[milestoneIndex].feedAmbition){
      updatedGoals[indexForGoal].milestones[milestoneIndex].feedAmbition=true
      const dd = JSON.parse(localStorage.getItem('doomsday'))
      if(dd && dd>new Date().getTime()){
        console.log('existing')
        localStorage.setItem('doomsday', JSON.stringify(dd+10000))
      } else {
        console.log('created')
        localStorage.setItem('doomsday', JSON.stringify(new Date().getTime()+10000))
      }
    }

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
        toggle, viewToggle, viewId, setViewId, deleteGoal, toggleChecked, setId
      }}>
      
      <div className='container'>  
        {goalsLS && goalsLS.length>0 && 
          <div className='top-section'>
              <div>
                <AmbitionBar/>
                <CompletedBar/>
              </div>
            
            <div className='upcoming-milestones-and-preview'>
              <UpcomingMilestone/>
              <ViewGoal id={viewId} goals = {goalsLS} />
            </div>
          </div>
        }

        <div className='container-inner'>
          <Goals toggle={toggle} setIsAddingGoal={setIsAddingGoal} isViewingInitModal={isViewingInitModal} hideButton={setIsViewingInitModal}>
              {goalsLS && goals}
          </Goals>

          {isAddingGoal && <Modal />}
          {isEditingGoal && <Modal id={id} />}
        </div>

      </div>
    </GoalContext.Provider>
  )
}

export default App
export { GoalContext }

