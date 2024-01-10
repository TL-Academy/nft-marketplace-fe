const isFormValid = (formFields) => {
    // formFields must be array of objects with name and value properties
    for (const field of formFields) {
        if (!field.value) {
            return { field: field.name, isValid: false };
        }
    }
    return true;
};

export default isFormValid;
