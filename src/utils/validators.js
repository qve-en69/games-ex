const hasUppercase = val => /[A-Z]/.test(val)
const hasLowercase = val => /[a-z]/.test(val)
const hasNumber = val => /[0-9]/.test(val)
const hasSpecialChar = val => /[!-*]/.test(val)

export { hasUppercase, hasLowercase, hasNumber, hasSpecialChar }
