import { PrismaClient } from '@prisma/client/extension'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'

const app = new Hono<{
  Bindings:{
    DATABASE_URL:string
  }
}>()

app.post('/api/v1/user/signup', async (c) => {
  const prisma = new PrismaClient({
    dataasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    
  } catch (error) {
    console.log(error)
    c.json({
      msg:"Invalid",
      err:error
    })
  }

  return c.text('Hello Hono!')
})
app.post('/api/v1/user/signin', async (c) => {
  const prisma = new PrismaClient({
    dataasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    
  } catch (error) {
    console.log(error)
    c.json({
      msg:"Invalid",
      err:error
    })
  }

  return c.text('Hello Hono!')
})
app.post('/api/v1/blog', async (c) => {
  const prisma = new PrismaClient({
    dataasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    
  } catch (error) {
    console.log(error)
    c.json({
      msg:"Invalid",
      err:error
    })
  }

  return c.text('Hello Hono!')
})
app.put('/api/v1/blog', async (c) => {
  const prisma = new PrismaClient({
    dataasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    
  } catch (error) {
    console.log(error)
    c.json({
      msg:"Invalid",
      err:error
    })
  }

  return c.text('Hello Hono!')
})
app.get('/api/v1/blog/:id', async (c) => {
  const prisma = new PrismaClient({
    dataasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    
  } catch (error) {
    console.log(error)
    c.json({
      msg:"Invalid",
      err:error
    })
  }

  return c.text('Hello Hono!')
})
app.get('/api/v1/blog/bulk', async (c) => {
  const prisma = new PrismaClient({
    dataasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    
  } catch (error) {
    console.log(error)
    c.json({
      msg:"Invalid",
      err:error
    })
  }

  return c.text('Hello Hono!')
})

export default app
