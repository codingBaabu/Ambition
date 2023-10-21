import {useState} from 'react'
import { goalFormType } from './components/AddGoal/useForm'

export default function useToggles(){
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
    
      function toggleIsCollapsed(){
        localStorage.setItem('collapsed', JSON.stringify(!isCollapsed))
        setIsCollapsed(!isCollapsed)
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
            setDoomsDay()
        }
    
        const updatedGoalStringified = JSON.stringify(updatedGoals)
        localStorage.setItem('goals', updatedGoalStringified)    
        
        const ls = localStorage.getItem('goals');
        const parsed = ls ? JSON.parse(ls) : null;
        setGoalsLS(parsed);
      }

      function setDoomsDay(){
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
      
      return {
        toggle, editToggle, viewToggle, toggleIsCollapsed, toggleChecked, 
        goalsLS, goals, setGoals, setGoalsLS, isEditingGoal, viewGoalId, 
        setViewGoalId, isCollapsed, viewMilestoneId, setViewMilestoneId,
        setId, id, isViewingInitModal, isAddingGoal
      }
}

