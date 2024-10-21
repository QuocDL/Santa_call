import {z} from 'zod'

export const loginSchema = z.object({
    email_or_username: z.string({message: 'Email are required!'}).email('The email must be in the correct format!'), 
    password: z.string({message: 'Password are required!'}).min(6,'Password must have at least 6 characters!').max(32, 'Password can not more than 32 characters!')
})

export const registerSchema = z.object({
    user_name: z.string({message: 'Username are required!'}).min(3, 'Username must have at least 6 characters!'),
    email: z.string({message: 'Email are required!'}).email('The email must be in the correct format!'), 
    password: z.string({message: 'Password are required!'}).min(6,'Password must have at least 6 characters!').max(32, 'Password can not more than 32 characters!'),
    confirmPassword: z.string().min(6, { message: "Confirm password must be at least 6 characters long!" }).max(32, 'Password can not more than 32 characters!'),
    acp: z.boolean().refine((val) => val === true, {
        message: "You must accept the terms and services!",
      }),
   
      
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords must match!",
    path: ["confirmPassword"], 
  });