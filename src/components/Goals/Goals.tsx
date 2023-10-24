import { ReactNode, useContext } from 'react'
import { GoalContext } from '../../App'
import { goalFormType } from '../AddGoal/useForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

type GoalProps = {
    children:ReactNode,
    toggle:(e:React.MouseEvent<HTMLOrSVGElement>)=>void,
    isViewingInitModal:boolean
}

export default 
    function Goals( 
        {children, toggle, isViewingInitModal} : GoalProps ) : JSX.Element {
            const {goalsLS}:{goalsLS:goalFormType[]} = useContext(GoalContext)
        return (
            <div className={`goals-container ${!goalsLS || (goalsLS && goalsLS.length <=0)?'':''}`}>
                {goalsLS && goalsLS.length>0 && 
                    <div className='goals-inner'>
                        <h2 className='goals-title' >Goals</h2>
                        <FontAwesomeIcon icon={faCirclePlus} className='goal-button' onClick={(e)=>toggle(e)} />
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