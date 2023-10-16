
import { useState, ChangeEvent } from 'react'
import { v4 as uuidv4 } from 'uuid'

export default function useForm(id?:string){
    const uuid = id?id:uuidv4()
    const emptyGoal = {
        id:uuid, title:'', description:'', milestones:[{
            milestoneTitle:'', feedAmbition:false, startDate:'', endDate:'', checked:false
        }]
    }

    const formObject = id?getExistingGoal():emptyGoal
    const [formData, setFormData] = useState<goalFormType>(formObject)

    function getExistingGoal(){
        const goals = localStorage.getItem('goals')
        const goalsParsed = JSON.parse(goals)
        return goalsParsed.find(goal=>goal.id===id
        )
    }

    const formChanged:formChangedType = (e, milestoneIndex)=>{
        const value = e.target.value
        const name = e.target.name

        setFormData(prev=>{
            if(typeof milestoneIndex !== 'undefined'){
                const updatedMilestones = [...prev.milestones]
                updatedMilestones[milestoneIndex] = {
                    ...updatedMilestones[milestoneIndex],
                    [name]:value
                }    
            return { ...prev, milestones:updatedMilestones }                
            } else {
               return { ...prev, [name]:value }
            }
        })
    }

    function addMilestone(){
        setFormData(prev=>{
            return {
                ...prev,
                milestones:[
                    ...prev.milestones, 
                    {  milestoneTitle:'', startDate:'',  endDate:'' },             
                ],
            }
        })
    }

    function removeMilestone(index: number) {
        if(formData.milestones.length>1){
            setFormData((prev) => {
                let updatedMilestones = [...prev.milestones]
                updatedMilestones.splice(index, 1);  
            
                return {
                    ...prev,
                    milestones: updatedMilestones,
                };
            });
        }
    }

    return {
        formData, 
        formChanged,
        addMilestone,
        removeMilestone,
        setFormData
    }
}

type goalFormType = {
    id:string,
    title:string,
    description:string,
    milestones:{
        milestoneTitle:string,
        startDate:string,
        endDate:string,        
    }[]
}

type formChangedType = 
    (e: ChangeEvent<HTMLInputElement>, milestoneIndex?: number) => void


export type {
    goalFormType,
    formChangedType
}