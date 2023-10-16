
type toggleType = {
    toggle:()=>void
}

export default function AddGoalButton( {toggle} : toggleType ){
    return (
        <div>
            <div>
                <h2>Goals</h2>
                <button className='goal-button' onClick={()=>toggle()}>+</button>
            </div>
            {children}
        </div>
    )
}