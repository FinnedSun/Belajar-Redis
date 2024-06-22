import { redis } from '@/lib/redis'
import Link from 'next/link'
import React from 'react'

const CommentsPage = async () => {
  const commnetIds = await redis.lrange('comments', 0, 3)

  const comments = await Promise.all(
    commnetIds.map(async (commnetId) => {
      const details: any = await redis.hgetall(`comment_details:${commnetId}`)
      const tags = await redis.smembers(`tags:${commnetId}`)

      return {
        commnetId,
        details,
        tags
      }
    })

  )

  return (
    <div>
      <Link href={'/'}>Homepage</Link>
      {comments.map((comment) => (
        <div className='flex flex-col gap-2'>
          <h1>{comment.details.author}</h1>
          <p>{comment.details.text}</p>
        </div>
      ))}
    </div>
  )
}

export default CommentsPage