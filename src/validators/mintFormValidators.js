const isFormValid = (formFields) => {
    for (const field of formFields) {
        if (!field.value) {
            return { field: field.name, isValid: false };
        }
    }
    return true;
};

export default isFormValid;
