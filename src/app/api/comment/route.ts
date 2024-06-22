import { NextRequest } from "next/server"
import { nanoid } from "nanoid"
import { redis } from "@/lib/redis"

export const POST = async (req: NextRequest) => {
  try {

    const body = await req.json()
    const { text, tags } = body

    const commnetId = nanoid()

    // retrieve and store comment details
    const comment = {
      text,
      tags: {
        TypeScript: true
      },
      upvotes: 0,
      timestamp: new Date(),
      author: req.cookies.get('userId')?.value,
    }

    // await redis.json.numincrby('commenet:1r0nPg_Z6x1UUvv17C1g4', '$.upvotes', 1)

    await Promise.all([
      redis.rpush('comments', commnetId),
      redis.json.set(`comment:${commnetId}`, `$`, comment),
    ])

    return new Response('OK')
  } catch (err) {
    console.log(err)
  }
}