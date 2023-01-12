export const validateEmail = (value) => {
    if (!value) {
        return 'This field is required';
    }

    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!regex.test(value)) {
        return 'This field must be a valid email';
    }

    return true;
}

export const validatePassword = (value) => {
    if (!value) {
        return 'This field is required';
    }
    if (value.length <= 6) {
        return 'this field must have more than 6 characters';
    }

    return true;
}

export const validateName = (value) => {
    if (!value) {
        return 'This field is required';
    }
    if (value.length <= 3) {
        return 'this field must have more than 3 characters';
    }

    return true;
}