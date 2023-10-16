import { FormEvent, useContext } from 'react';
import { goalFormType } from './useForm';
import { GoalContext } from '../../App';
import { Dispatch, SetStateAction } from 'react';

export default function useAddGoalToLocalStorage(setFormData:SetFormDataType) {
  const { setGoalsLS, setId, goalsLS }:any = useContext(GoalContext);

  return (e: FormEvent<HTMLFormElement>, goalArray: goalFormType) => {
    e.preventDefault();
        
    const goalsLS = localStorage.getItem('goals');
    let goals;

    if (!goalsLS) {
      goals = JSON.stringify([goalArray]);
      
      //const today = new Date();
      //const currentTime = today.getSeconds();
      //const oneMinuteFromNow = new Date().setSeconds(today.getSeconds() + 60);
      //const difference = oneMinuteFromNow - currentTime
      //localStorage.setItem('doomsday', JSON.stringify(difference))
    } else {
      //const today = new Date();
      //const currentTime = today.getTime();
      //const futureTime = currentTime + 120000
      //localStorage.setItem('doomsday', JSON.stringify(futureTime))

      goals = JSON.parse(goalsLS);      
      const isEdited = goals.find(goal=>goal.id===goalArray.id)

      goals.forEach((goal, index)=>{
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
          milestoneTitle:'',
          startDate:'',
          endDate:'',
          checked:false
      }]
  })
  };
}

type SetFormDataType = Dispatch<SetStateAction<goalFormType>>