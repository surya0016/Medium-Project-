import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify, decode } from "hono/jwt";
import { signupInput } from "@beastsurya47/medium-common";


export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string,
    }
}>();

userRouter.post('/signup', async (c) => {
    const body = await c.req.json();
    const {success} = signupInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message:"Incorrect Input"
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate());
    //ZOD Validation required
    try {
        const email = body.email;
        const password = body.password;
        const name = body.name;
        const user = await prisma.user.create({
            data:{
                email,
                password,
                name
            }
        })
        const userId = user.id;
        const token = await sign({
            id:user.id
        }, c.env.JWT_SECRET);
        c.header("Authorization", token);
        return c.json({message:"Sign up success!", token})

    } catch (error) {
        console.log(error)
        return c.json({
            msg:"Invalid",
            err:error
        })
    }
})
  
userRouter.post('/signin', async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const email = body.email;
        const password = body.password;

        const userExists = await prisma.user.findFirst({
            where:{
                email,
                password
            }
        })
        if(!userExists){
            c.status(403)
            return c.json({
                message:"Invalid email or password"
        })
        }
        const token =await sign({id:userExists.id}, c.env.JWT_SECRET);
        c.header("Authorization", token);
        return c.json({
            message:"Sign in successfull",
            token,
        })
        
    } catch (error) {
        console.log(error)
        return c.json({
            msg:"Invalid",
            err:error
        })
    }
})