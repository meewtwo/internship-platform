module.exports = [
"[project]/frontend/messages/en.json.[json].cjs [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = {
    "HomePage": {
        "title": "Welcome to Internship Platform",
        "description": "Your gateway to launching your career with top companies.",
        "register": "Register",
        "login": "Login",
        "languageSwitcher": "Language"
    },
    "RegisterPage": {
        "title": "Create an Account",
        "subtitle": "Join the internship & career matching platform",
        "role": "I am a",
        "student": "Student",
        "employer": "Employer",
        "firstName": "First Name",
        "lastName": "Last Name",
        "universityId": "University ID (9 digits)",
        "email": "Email Address",
        "password": "Password",
        "confirmPassword": "Confirm Password",
        "submit": "Register",
        "errors": {
            "firstNameRequired": "First name is required",
            "firstNameInvalid": "Letters, spaces, and hyphens only",
            "lastNameRequired": "Last name is required",
            "lastNameInvalid": "Letters, spaces, and hyphens only",
            "universityIdInvalid": "Must be exactly 9 digits",
            "emailRequired": "Email is required",
            "emailInvalid": "Invalid email address",
            "passwordMin": "Password must be at least 8 characters",
            "passwordsMismatch": "Passwords do not match",
            "general": "Registration failed. Please try again."
        }
    },
    "VerifyPage": {
        "title": "Verify Your Email",
        "instruction": "Please enter the 6-digit verification code sent to {email}.",
        "codeLabel": "Verification Code",
        "verify": "Verify Code",
        "resend": "Resend Code",
        "resendIn": "Resend in {seconds}s",
        "resendSuccess": "Verification code resent successfully.",
        "errors": {
            "codeInvalid": "Please enter a valid 6-digit code",
            "wrongOrExpired": "Invalid or expired verification code",
            "general": "Verification failed. Please try again."
        }
    },
    "LoginPage": {
        "title": "Welcome Back",
        "subtitle": "Sign in to your account",
        "email": "Email Address",
        "password": "Password",
        "submit": "Login",
        "verifyLink": "Verify your email here",
        "errors": {
            "emailRequired": "Email is required",
            "emailInvalid": "Invalid email address",
            "passwordRequired": "Password is required",
            "general": "Login failed. Please check your credentials.",
            "emailNotConfirmed": "Email not confirmed. Please verify your account."
        }
    },
    "DashboardPage": {
        "title": "Dashboard",
        "welcome": "Welcome, {name}",
        "role": "Role: {role}",
        "logout": "Logout"
    }
};
}),
];

//# sourceMappingURL=frontend_messages_en_json_%5Bjson%5D_cjs_0gmdqg-._.js.map