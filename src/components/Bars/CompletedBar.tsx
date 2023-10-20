import { useContext, useEffect } from "react"
import { GoalContext } from "../../App"
import { goalFormType } from "../AddGoal/useForm"

let completedMilestonesLength:number
let completedMilestones:boolean[]

export default function CompletedBar(){
    const {goalsLS}:{goalsLS:goalFormType[]} = useContext(GoalContext)

    const milestones = goalsLS.map(goal=>{
        return goal.milestones.map(milestone=>{
            return milestone
        })
    }).flat()

    const milestonesCompletedArr = milestones.map(milestone=>milestone.checked)
    const totalMilestones = milestonesCompletedArr
    completedMilestones = milestonesCompletedArr.filter((milestone:boolean)=>milestone===true)
    completedMilestonesLength = completedMilestones.length

    useEffect(()=>{
        localStorage.setItem('completed-milestones-count', completedMilestonesLength as unknown as string)
    }, [completedMilestonesLength])

    return (
        <div>
            <div className='completion-bar-container' >
                <label htmlFor='completed'>Completed: {completedMilestones.length+'/'+totalMilestones.length} </label>
                {
                    totalMilestones.map((_, index) => (
                        <progress key={index} className="completion-bar" max='1' value={completedMilestones[index]?'1':'0'}></progress>
                    ))
                }

                
            </div>
        </div>
    )
}

export {completedMilestonesLength, completedMilestones}