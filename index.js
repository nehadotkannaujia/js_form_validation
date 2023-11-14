const formProcessing = (formSelector) => {
   const formElement = document.querySelector(formSelector);
   formElement.setAttribute("novalidate", "");

   const validateOptions = [
    {
        attribute : "required",
        isValid : (input) => input.value.trim() !== "",
        errorMessage : label => `${label.textContent} is mandatory`
    }
   ]

   const validateSingleFormGroup = formGroup => {
    const label = formGroup.querySelector("label");
    const input = formGroup.querySelector("input")
    const error = formGroup.querySelector(".error")
    let formError = false;

    for(const option of validateOptions){

        if(input.hasAttribute(option.attribute) && !option.isValid(input)){
            formError = true
            error.textContent = option.errorMessage(label)
        }

    }
    if(!formError){
        error.textContent = null;
    }

   }

   const validateFormGroup = () => {

    const formGroups = Array.from(formElement.querySelectorAll(".form-field-group"))
    formGroups.forEach(formGroup => { validateSingleFormGroup(formGroup)})

   }

   document.addEventListener("submit", (event) => {
    event.preventDefault();
    validateFormGroup();
   })

} 
formProcessing("#registerForm");