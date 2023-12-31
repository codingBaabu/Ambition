import { FormEvent, useContext } from 'react';
import { goalFormType } from './useForm';
import { GoalContext } from '../../App';
import { Dispatch, SetStateAction } from 'react';

export default function useAddGoalToLocalStorage(setFormData:SetFormDataType) {
  const { setGoalsLS } = useContext<GoalContextType>(GoalContext);

  return (e: FormEvent<HTMLFormElement>, goalArray: goalFormType) => {
    e.preventDefault();
        
    const goalsLS = localStorage.getItem('goals');
    let goals;

    if (!goalsLS) {
      goals = JSON.stringify([goalArray]);
    } else {
      goals = JSON.parse(goalsLS);      
      const isEdited = goals.find((goal:goalFormType)=>goal.id===goalArray.id)

      goals.forEach((goal:goalFormType, index:number)=>{
        if(goal.id===goalArray.id){
          goals[index] = goalArray
        } 
      })
      
      if(!isEdited){
        goals.unshift(goalArray);
      }
      
      goals = JSON.stringify(goals);
    }

    localStorage.setItem('goals', goals);
    const ls = localStorage.getItem('goals');
    const parsed = ls ? JSON.parse(ls) : null;
    setGoalsLS(parsed);

    setFormData({
      id:'',
      title:'',
      description:'',
      milestones:[{
          milestoneId:'',
          milestoneTitle:'',
          startDate:'',
          endDate:'',
          feedAmbition:false,
          checked:false
      }]
  })
  };
}

type SetFormDataType = Dispatch<SetStateAction<goalFormType>>
type GoalContextType = {
  setGoalsLS:(arr:goalFormType[])=>void
}