import z from "zod";

export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(3),
    name:z.string().optional()
})

export type SignupInput = z.infer<typeof signupInput>

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(3)
})
export type SigninInput = z.infer<typeof signinInput>

export const createBlogInput = z.object({
    title: z.string().max(100),
    content: z.string(),
    thumbnail:z.string().optional()
})

export type CreateBlogInput = z.infer<typeof createBlogInput>

export const updateBlogInput = z.object({
    title: z.string().max(100),
    content: z.string(),
    thumbnail:z.string().optional(),
    id: z.string()
})

export type UpdateBlogInput = z.infer<typeof updateBlogInput>

