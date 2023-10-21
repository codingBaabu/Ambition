import {ReactNode, useContext, useEffect} from 'react'
import { GoalContext } from '../../App'
import { goalFormType } from '../AddGoal/useForm'

type GoalProps = {
    children:ReactNode,
    toggle:(e:React.MouseEvent<HTMLButtonElement>)=>void,
    isViewingInitModal:boolean
}

export default 
    function Goals( 
        {children, toggle, isViewingInitModal} : GoalProps ) 
            : JSX.Element {
                
            const {goalsLS}:{goalsLS:goalFormType[]} = useContext(GoalContext)

            useEffect(()=>{
                !goalsLS || (goalsLS && goalsLS.length <= 0)?
                document.body.style.maxWidth = '100%': 
                document.body.style.maxWidth = '75%'
            })

        return (
            <div className={`goals-container ${!goalsLS || (goalsLS && goalsLS.length <=0)?'ambition-bg':''}`}>
                {goalsLS && goalsLS.length>0 && 
                    <div className='goals-inner'>
                        <h2 className='goals-title' >Goals</h2>
                        <button className='goal-button' onClick={(e)=>toggle(e)}>+</button>
                    </div>
                }

                {(!goalsLS || (goalsLS && goalsLS.length <=0)) &&  
                  <div className='init-container'>
                        <div className='goals-inner-init'>
                        {!isViewingInitModal && 
                            <div className='goals-inner-init-items'>
                                <h1 className='ambition-text'>AMBITION</h1>
                                <button className='goal-button-init' onClick={(e)=>toggle(e)}>+</button>
                                <p className='goal-text-init'>KEEP THE FIRE LIT</p>
                            </div>
                        }
                        </div>
                    </div>
                }

                {children}
            </div>
        )
    }