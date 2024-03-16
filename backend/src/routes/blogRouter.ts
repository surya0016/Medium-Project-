import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { decode, verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string, 
        JWT_SECRET:string
    },
    Variables:{
        id:string
    }
}>();


blogRouter.use("/*", async (c, next)=>{
    try {
        const token = c.req.header('Authorization') || "";
        const user = await verify(token, c.env.JWT_SECRET);
        if (user) {
            c.set("id", user.id);
            await next()
        }else{
            c.status(403);
            return c.json({message:"You are not Logged in !"})
        }  
    } catch (error) {
        c.status(403);
        return c.json({
            message:"You are not Logged in !"
        })
    }
    
})

blogRouter.get("/test",async (c)=>{
    return c.json({message:"f"})
})

blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const userId = c.get("id");
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    try {

        const blog = await prisma.blog.create({
            data:{
                title:body.title,
                content:body.content,
                thumbnail:body.thumbnail,
                authorId:userId
            }
        })
        return c.json({
            message:"Blog created",
            blog
        })
    } catch (error) {
      console.log(error)
      return c.json({
        msg:"Invalid",
        err:error
      })
    }
  
  })
  blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    try {
        await prisma.blog.update({
            where:{
                id:body.id
            },
            data:{
                content:body.content,
                title:body.title,
            }
        })
        return c.json({
            message:"Blog updated"
        })
    } catch (error) {
      console.log(error)
      return c.json({
        msg:"Invalid",
        err:error
      })
    }
  
  })
  blogRouter.get('/bulk', async (c) => {

    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    try {
        const blogs = await prisma.blog.findMany();
        return c.json({
            blogs
        })
    } catch (error) {
      console.log(error)
      return c.json({
        msg:"Invalid",
        err:error
      })
    }
  
  })
  blogRouter.get('/:id', async (c) => {
    const id = c.req.param('id');
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    try {
        const blog = await prisma.blog.findFirst({
            where:{
                id
            }
        })
        return c.json({
            blog
        })
    } catch (error) {
      console.log(error)
      return c.json({
        msg:"Invalid",
        err:error
      })
    }
  
  })
  
  