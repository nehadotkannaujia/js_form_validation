const formProcessing = (formSelector) => {
   const formElement = document.querySelector(formSelector);
   formElement.setAttribute("novalidate", "");

   const validateOptions = [
    {
        attribute : "pattern",
        isValid : (input) => {
           const patternRegex = new RegExp(input.pattern)
          return patternRegex.test(input.value)
        },
        errorMessage : label => `${label.textContent} should be valid`
    },
    {
        attribute : "required",
        isValid : (input) => input.value.trim() !== "",
        errorMessage : label => `${label.textContent} is mandatory`
    }
   ]

   const validateSingleFormGroup = formGroup => {
    const label = formGroup.querySelector("label");
    const input = formGroup.querySelector("input");
    const error = formGroup.querySelector(".error-text");
    const errorIcon = formGroup.querySelector(".warning-icon");
    const validIcon = formGroup.querySelector(".valid-icon");
    let formError = false;

    for(const option of validateOptions){

        if(input.hasAttribute(option.attribute) && !option.isValid(input)){
            formError = true;
            error.textContent = option.errorMessage(label);
            errorIcon.classList.add("show");
            errorIcon.classList.remove("hide");
            input.classList.add("red-border");
            input.classList.remove("green-border");
            validIcon.classList.add("hide");
            validIcon.classList.remove("show");
        }

    }
    if(!formError){
        error ? error.textContent = null : "";
        input.classList.remove("red-border");
        input.classList.add("green-border");
        errorIcon ? errorIcon.classList.add("hide") : "";
        errorIcon ? errorIcon.classList.remove("show") : "";
        validIcon ? validIcon.classList.add("show"): "";
        validIcon ? validIcon.classList.remove("hide") : "";
    }

    return !formError;

   }

   const validateFormGroup = () => {

    const formGroups = Array.from(formElement.querySelectorAll(".form-field-group"))
    const validForm = formGroups.every(formGroup => { return validateSingleFormGroup(formGroup)})
    return validForm

   }

   //validate form on blur event
   Array.from(formElement.elements).forEach((element) =>{
    element.addEventListener("blur", event => {
        validateSingleFormGroup(event.srcElement.parentElement.parentElement)
    })
   } );

  //captures all form data 
   const getFormData = () => {
       const formInputFields = Array.from(formElement.elements)
       const formData = formInputFields.filter(item => item.type !== 'submit').reduce((acc, item) => ({...acc, [item.id] : item.value }));
       console.log(formData);
   }

   //validate form on submit click
   document.addEventListener("submit", (event) => {
   event.preventDefault();
   const validForm =  validateFormGroup();

    if(validForm){
        console.log("form is valid")
        getFormData();
    }
    else{
       
    }
   })

} 
formProcessing("#registerForm");