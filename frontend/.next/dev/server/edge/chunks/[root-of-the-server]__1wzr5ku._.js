(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push(["chunks/[root-of-the-server]__1wzr5ku._.js",
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[project]/frontend/i18n/request.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$getRequestConfig$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__default__as__getRequestConfig$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/next-intl/dist/esm/development/server/react-server/getRequestConfig.js [middleware-edge] (ecmascript) <export default as getRequestConfig>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$i18n$2f$routing$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/i18n/routing.ts [middleware-edge] (ecmascript)");
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$getRequestConfig$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__default__as__getRequestConfig$3e$__["getRequestConfig"])(async ({ requestLocale })=>{
    let locale = await requestLocale;
    if (!locale || !__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$i18n$2f$routing$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["routing"].locales.includes(locale)) {
        locale = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$i18n$2f$routing$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["routing"].defaultLocale;
    }
    return {
        locale,
        messages: (await __turbopack_context__.f({
            "../messages/en.json": {
                id: ()=>"[project]/frontend/messages/en.json.[json].cjs [middleware-edge] (ecmascript)",
                module: ()=>Promise.resolve().then(()=>__turbopack_context__.i("[project]/frontend/messages/en.json.[json].cjs [middleware-edge] (ecmascript)"))
            },
            "../messages/kk.json": {
                id: ()=>"[project]/frontend/messages/kk.json.[json].cjs [middleware-edge] (ecmascript)",
                module: ()=>Promise.resolve().then(()=>__turbopack_context__.i("[project]/frontend/messages/kk.json.[json].cjs [middleware-edge] (ecmascript)"))
            },
            "../messages/ru.json": {
                id: ()=>"[project]/frontend/messages/ru.json.[json].cjs [middleware-edge] (ecmascript)",
                module: ()=>Promise.resolve().then(()=>__turbopack_context__.i("[project]/frontend/messages/ru.json.[json].cjs [middleware-edge] (ecmascript)"))
            }
        }).import(`../messages/${locale}.json`)).default
    };
});
}),
"[project]/frontend/i18n/routing.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Link",
    ()=>Link,
    "getPathname",
    ()=>getPathname,
    "redirect",
    ()=>redirect,
    "routing",
    ()=>routing,
    "usePathname",
    ()=>usePathname,
    "useRouter",
    ()=>useRouter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$routing$2f$defineRouting$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__default__as__defineRouting$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/next-intl/dist/esm/development/routing/defineRouting.js [middleware-edge] (ecmascript) <export default as defineRouting>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$react$2d$server$2f$createNavigation$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__default__as__createNavigation$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/next-intl/dist/esm/development/navigation/react-server/createNavigation.js [middleware-edge] (ecmascript) <export default as createNavigation>");
;
;
const routing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$routing$2f$defineRouting$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__default__as__defineRouting$3e$__["defineRouting"])({
    locales: [
        'en',
        'ru',
        'kk'
    ],
    defaultLocale: 'en'
});
const { Link, redirect, usePathname, useRouter, getPathname } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$react$2d$server$2f$createNavigation$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__default__as__createNavigation$3e$__["createNavigation"])(routing);
}),
"[project]/frontend/messages/en.json.[json].cjs [middleware-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {

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
"[project]/frontend/messages/kk.json.[json].cjs [middleware-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = {
    "HomePage": {
        "title": "Тағылымдама платформасына қош келдіңіз",
        "description": "Үздік компанияларда мансап бастауға арналған платформа.",
        "register": "Тіркелу",
        "login": "Кіру",
        "languageSwitcher": "Тіл"
    },
    "RegisterPage": {
        "title": "Аккаунт құру",
        "subtitle": "Тағылымдамалар мен мансап платформасына қосылыңыз",
        "role": "Мен",
        "student": "Студентпін",
        "employer": "Жұмыс берушімін",
        "firstName": "Аты",
        "lastName": "Тегі",
        "universityId": "Университет ID (9 сан)",
        "email": "Электрондық пошта",
        "password": "Құпия сөз",
        "confirmPassword": "Құпия сөзді растау",
        "submit": "Тіркелу",
        "errors": {
            "firstNameRequired": "Аты міндетті",
            "firstNameInvalid": "Тек әріптер, бос орындар мен дефистер",
            "lastNameRequired": "Тегі міндетті",
            "lastNameInvalid": "Тек әріптер, бос орындар мен дефистер",
            "universityIdInvalid": "Дәл 9 цифр болуы керек",
            "emailRequired": "Email міндетті",
            "emailInvalid": "Қате email форматы",
            "passwordMin": "Құпия сөз кемінде 8 таңбадан тұруы керек",
            "passwordsMismatch": "Құпия сөздер сәйкес келмейді",
            "general": "Тіркелу сәтсіз аяқталды. Қайта көріңіз."
        }
    },
    "VerifyPage": {
        "title": "Электрондық поштаны растаңыз",
        "instruction": "{email} мекенжайына жіберілген 6 таңбалы растау коды енгізіңіз.",
        "codeLabel": "Растау коды",
        "verify": "Кодты растау",
        "resend": "Кодты қайта жіберу",
        "resendIn": "{seconds}с кейін қайта жіберу",
        "resendSuccess": "Растау коды сәтті қайта жіберілді.",
        "errors": {
            "codeInvalid": "Жарамды 6 таңбалы кодты енгізіңіз",
            "wrongOrExpired": "Қате немесе мерзімі өткен растау коды",
            "general": "Растау сәтсіз аяқталды. Қайта көріңіз."
        }
    },
    "LoginPage": {
        "title": "Қош келдіңіз",
        "subtitle": "Аккаунтқа кіру",
        "email": "Электрондық пошта",
        "password": "Құпия сөз",
        "submit": "Кіру",
        "verifyLink": "Поштаны осында растаңыз",
        "errors": {
            "emailRequired": "Email міндетті",
            "emailInvalid": "Қате email форматы",
            "passwordRequired": "Құпия сөз міндетті",
            "general": "Кіру қатесі. Мәліметтерді тексеріңіз.",
            "emailNotConfirmed": "Email расталмаған. Аккаунтты растаңыз."
        }
    },
    "DashboardPage": {
        "title": "Басқару панелі",
        "welcome": "Қош келдіңіз, {name}",
        "role": "Рөлі: {role}",
        "logout": "Шығу"
    }
};
}),
"[project]/frontend/messages/ru.json.[json].cjs [middleware-edge] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = {
    "HomePage": {
        "title": "Добро пожаловать на платформу стажировок",
        "description": "Ваш путь к началу карьеры в ведущих компаниях.",
        "register": "Регистрация",
        "login": "Войти",
        "languageSwitcher": "Язык"
    },
    "RegisterPage": {
        "title": "Создать аккаунт",
        "subtitle": "Присоединяйтесь к платформе поиска стажировок и карьеры",
        "role": "Я",
        "student": "Студент",
        "employer": "Работодатель",
        "firstName": "Имя",
        "lastName": "Фамилия",
        "universityId": "ID университета (9 цифр)",
        "email": "Электронная почта",
        "password": "Пароль",
        "confirmPassword": "Подтвердите пароль",
        "submit": "Зарегистрироваться",
        "errors": {
            "firstNameRequired": "Имя обязательно",
            "firstNameInvalid": "Только буквы, пробелы и дефисы",
            "lastNameRequired": "Фамилия обязательна",
            "lastNameInvalid": "Только буквы, пробелы и дефисы",
            "universityIdInvalid": "Должно состоять ровно из 9 цифр",
            "emailRequired": "Email обязателен",
            "emailInvalid": "Неверный формат email",
            "passwordMin": "Пароль должен быть не менее 8 символов",
            "passwordsMismatch": "Пароли не совпадают",
            "general": "Ошибка регистрации. Пожалуйста, попробуйте снова."
        }
    },
    "VerifyPage": {
        "title": "Подтвердите вашу почту",
        "instruction": "Введите 6-значный код подтверждения, отправленный на {email}.",
        "codeLabel": "Код подтверждения",
        "verify": "Подтвердить код",
        "resend": "Отправить код повторно",
        "resendIn": "Повторная отправка через {seconds}с",
        "resendSuccess": "Код подтверждения успешно отправлен повторно.",
        "errors": {
            "codeInvalid": "Пожалуйста, введите действительный 6-значный код",
            "wrongOrExpired": "Неверный или просроченный код подтверждения",
            "general": "Ошибка подтверждения. Пожалуйста, попробуйте снова."
        }
    },
    "LoginPage": {
        "title": "С возвращением",
        "subtitle": "Войдите в свой аккаунт",
        "email": "Электронная почта",
        "password": "Пароль",
        "submit": "Войти",
        "verifyLink": "Подтвердите почту здесь",
        "errors": {
            "emailRequired": "Email обязателен",
            "emailInvalid": "Неверный формат email",
            "passwordRequired": "Пароль обязателен",
            "general": "Ошибка входа. Проверьте учетные данные.",
            "emailNotConfirmed": "Email не подтвержден. Пожалуйста, подтвердите ваш аккаунт."
        }
    },
    "DashboardPage": {
        "title": "Панель управления",
        "welcome": "Добро пожаловать, {name}",
        "role": "Роль: {role}",
        "logout": "Выйти"
    }
};
}),
"[project]/frontend/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$middleware$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next-intl/dist/esm/development/middleware/middleware.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$i18n$2f$routing$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/i18n/routing.ts [middleware-edge] (ecmascript)");
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$middleware$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$i18n$2f$routing$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["routing"]);
const config = {
    matcher: [
        '/',
        '/(en|ru|kk)/:path*'
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__1wzr5ku._.js.map