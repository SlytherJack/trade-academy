export function validateEmail(email) {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
}

export function validateCode(code) {
    return /[0-9]{6}/g.test(code);
}

export function validatePassword(pass) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/g.test(pass);
}

export function validateUsername(username) {
    return /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/igm.test(username);
}
