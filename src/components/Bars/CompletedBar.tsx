import { useContext, useEffect } from "react"
import { GoalContext } from "../../App"

let completedMilestonesLength
let completedMilestones

export default function CompletedBar(){
    const {goalsLS} = useContext(GoalContext)

    const milestones = goalsLS.map(goal=>{
        return goal.milestones.map(milestone=>{
            return milestone
        })
    }).flat()

    const milestonesCompletedArr = milestones.map(milestone=>milestone.checked)
    const totalMilestones = milestonesCompletedArr
    completedMilestones = milestonesCompletedArr.filter(milestone=>milestone===true)
    completedMilestonesLength = completedMilestones.length

    useEffect(()=>{
        localStorage.setItem('completed-milestones-count', completedMilestonesLength)
    }, [completedMilestonesLength])

    return (
        <div>
            <div className='completion-bar-container' >
                <label htmlFor='completed'>Completed: {completedMilestones.length+'/'+totalMilestones.length} </label>
                {
                    totalMilestones.map((milestone, index) => (
                        <progress key={index} className="completion-bar" max='1' value={completedMilestones[index]?'1':'0'}></progress>
                    ))
                }

                
            </div>
        </div>
    )
}

export {completedMilestonesLength, completedMilestones}