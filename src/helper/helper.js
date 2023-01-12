export const formatterBRL = (value) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
}

export const getUserLocalStorage = () => {
    return JSON.parse(localStorage.getItem('user'));
}