import { reactive } from "@vue/reactivity";
//import useValidators from '@/modules/validators'
import useValidators from "./validators";


const errors = reactive({});


export default function useFormValidation() {


    const { isEmpty, minLength, isEmail, isNum } = useValidators();

    const validateNameField = (fieldName, fieldValue) => {
        errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : minLength(fieldName, fieldValue, 3)
    }
    const validateTextField = (fieldName, fieldValue, validateLength = 0) => {
          errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : minLength(fieldName, fieldValue, validateLength)
        if(fieldName == 'email'){
         errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : isEmail(fieldName, fieldValue)
        }
    }

    const validateSelectField = (fieldName, fieldValue) =>{
        errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : ""
    }

    const validateEmailField = (fieldName, fieldValue) => {
        errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : isEmail(fieldName, fieldValue)
    }

    const validatePhoneField = (fieldName, fieldValue) => {
        errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : isNum(fieldName, fieldValue)
    }

    const validatePasswordField = (fieldName, fieldValue) => {
        errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : minLength(fieldName, fieldValue, 6)
    }
    const validateTextareaField = (fieldName, fieldValue) => {
        errors[fieldName] = !fieldValue ? "" : minLength(fieldName, fieldValue, 3)
    }


    return { 
        errors, 
        validateNameField,
        validateEmailField,
        validatePhoneField,
        validatePasswordField,
        validateTextareaField,
        validateTextField,
        validateSelectField
    }
}