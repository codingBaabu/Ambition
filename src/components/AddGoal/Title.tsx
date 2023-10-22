import { goalFormType, formChangedType } from "./useForm"

export default function Title({formChanged, formData}:merged){
    return (
        <div className='goal-title'>
            <input 
                className='form-input title-field' type='text' minLength={1} maxLength={50} placeholder='Title' name='title'
                value={formData.title} onChange={formChanged} required
            />
        </div>
    )
}

type merged = {
    formChanged:formChangedType,
    formData:goalFormType
}