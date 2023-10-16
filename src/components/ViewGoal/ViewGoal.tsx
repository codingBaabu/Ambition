import { getDateFormat } from "../../utils/utils";

export default function ViewGoal({id, goals}){
    const goal = goals.find(goal=>id==goal.id)

    function getMilestoneElements(){
        return goal.milestones.map((milestone, index)=>{
            return (
                    <div className='view-upcoming-milestone' key={index}>
                        <h3>{milestone.milestoneTitle}</h3>
                        <div className='view-dates'>
                            <p>{getDateFormat(milestone.startDate)}</p>
                            <p className='to'>to</p>
                            <p>{getDateFormat(milestone.endDate)}</p>
                        </div>
                    </div>
            )
        })
    }

    if (!goal) {
        return <div>Goal not found</div>;
      }
      
    return (
        <div className='view-goal-section'>
            <div className='view-top-section'>
                <h2>{goal.title}</h2>
                <p className='view-goal-description'>{goal.description}</p>
            </div>
            <div className='view-goal-milestones '>
            {getMilestoneElements()}           
            </div> 
        </div>
    )
}


