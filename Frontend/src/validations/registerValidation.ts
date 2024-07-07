import * as yup from "yup"

export const registerSchema = yup.object().shape({
	email: yup.string().email("Invalid email format").required("Email is required"),
	password: yup
		.string()
		.min(8, "Password must be at least 8 characters long")
		.matches(/[a-zA-Z]/, "Password must contain at least one letter")
		.matches(/[0-9]/, "Password must contain at least one number")
		.required("Password is required"),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password")], "Passwords must match")
		.required("Password confirmation is required"),
})
