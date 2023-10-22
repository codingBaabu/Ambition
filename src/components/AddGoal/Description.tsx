import { goalFormType, formChangedType } from "./useForm"

export default function Description({formChanged, formData}:merged){
    return (
        <div className='goal-description'>
            <textarea 
                className='form-input description-field' minLength={1} maxLength={250} placeholder='Description' name='description'
                value={formData.description} onChange={formChanged} required
            />
        </div>
    )
}

type merged = {
    formChanged:formChangedType,
    formData:goalFormType
}