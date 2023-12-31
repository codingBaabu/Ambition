
import { useState, ChangeEvent } from 'react'
import { v4 as uuidv4 } from 'uuid'

export default function useForm(id?:string){
    const uuid = id?id:uuidv4()
    const emptyGoal:goalFormType = {
        id:uuid, title:'', description:'', milestones:[{
            milestoneId:uuidv4(), 
            milestoneTitle:'', 
            feedAmbition:false, 
            startDate:'', 
            endDate:'', 
            checked:false
        }]
    }

    const formObject = id?getExistingGoal():emptyGoal
    const [formData, setFormData] = useState<goalFormType>(formObject)

    function getExistingGoal(){
        const goals:string | null = localStorage.getItem('goals')
        const goalsParsed:goalFormType[] | null = goals?JSON.parse(goals):null
        const existingGoal = goalsParsed?goalsParsed.find(goal=>goal.id===id):null

        return existingGoal?existingGoal:emptyGoal
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
                   { milestoneId:uuidv4(), milestoneTitle:'', feedAmbition:false, startDate:'', endDate:'', checked:false }
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
        milestoneId:string,
        milestoneTitle:string,
        startDate:string,
        endDate:string,     
        feedAmbition:boolean,
        checked:boolean
    }[]
}

type formChangedType = 
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, milestoneIndex?: number) => void


export type {
    goalFormType,
    formChangedType
}