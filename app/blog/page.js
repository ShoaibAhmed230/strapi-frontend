'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const Blog = () => {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await fetch("http://localhost:1337/api/articles/?populate=*", {
          cache: 'no-store'
        })
        const response = await data.json()
        setArticles(response.data)
      } catch (error) {
        console.error('Error fetching articles:', error)
      }
    }

    fetchArticles()
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Latest Articles</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {articles.map(article => (

          <div
            key={article.id}
            className="bg-white shadow-md rounded-xl p-6 border hover:shadow-lg transition duration-300"
          >
                      <Link href={`/blogpost/${article.slug}`} className="hover:underline">
            {/* Cover Image */}
            {article.cover && article.cover.url && (
              <img
                src={`http://localhost:1337${article.cover.url}`}
                alt={article.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              
                {article.title}
            </h2>

            <p className="text-gray-600 text-sm mb-3">{article.description}</p>

            <div className="text-xs text-gray-400">
              <span className="block">Slug: {article.slug}</span>
              <span className="block">Created At: {new Date(article.createdAt).toLocaleDateString()}</span>
            </div>

            {/* Author */}
            {article.author && (
              <p className="text-sm text-gray-700 mt-2">
                <strong>Author:</strong> {article.author.name}
              </p>
            )}
              </Link>
          </div>

        ))}
      </div>
    </div>
  )
}

export default Blog
