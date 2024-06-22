'use client'

import axios from 'axios'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

const Home = () => {
  const comment = async () => {
    const { data } = await axios.post('/api/comment', {
      text: 'hello',
      tags: ['TypeScript'],
    })

    console.log(data)
  }
  return (
    <div className="flex flex-col gap-8 items-start">
      <Link href={"/comments"} prefetch={false}>
        see comments
      </Link>
      <Button onClick={comment}>up vote</Button>
    </div>
  )
}

export default Home
