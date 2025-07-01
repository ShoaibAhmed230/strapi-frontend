"use client"

import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import React, { useEffect, useState } from 'react'

export default function Home() {


  const [article, setArticle] = useState(null)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch('http://localhost:1337/api/articles/?populate=*')
        const json = await res.json()
        setArticle(json.data[0]) // Get first article's blocks
      } catch (err) {
        console.error('Error fetching article:', err)
      }
    }

    fetchArticle()
  }, [])

   const renderBlock = (block) => {
    switch (block.__component) {
      case 'shared.rich-text':
        return (
          <div key={block.id} className="prose prose-invert max-w-none mb-8">
            <ReactMarkdown>{block.body}</ReactMarkdown>
          </div>
        )
      case 'shared.quote':
        return (
          <blockquote
            key={block.id}
            className="border-l-4 border-blue-500 pl-4 italic text-gray-300 mb-6"
          >
            <p className="text-lg">"{block.body}"</p>
            <footer className="text-sm text-blue-400 mt-2">— {block.title}</footer>
          </blockquote>
        )
      case 'shared.media':

              return (
          <div key={block.id} className="bg-gray-800 rounded-lg p-4 text-gray-400 mb-6">
            [Media block here – implement if needed]
          </div>
        )
      case 'shared.slider':
        return (
          <div key={block.id} className="bg-gray-800 rounded-lg p-4 text-gray-400 mb-6">
            [Slider block here – implement if needed]
          </div>
        )
      default:
        return null
    }
  }


  return (
    <main className="bg-gray-900 min-h-screen text-gray-300 mb-5">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-extrabold text-gray-50 mb-4">
          Welcome to <span className="text-blue-500">My Article Site</span>
        </h1>
        <p className="text-xl text-gray-400 mb-6">
          Discover inspiring, informative, and insightful articles — all in one place.
        </p>
        <Link
          href="/blog"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
        >
          Explore Blog
        </Link>
      </section>

      <div className="max-w-4xl mx-auto">
     

        {article?.blocks?.map((block) => renderBlock(block))}

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
          >
            Explore More Articles →
          </Link>
        </div>
      </div>
    </main>
  )
}
