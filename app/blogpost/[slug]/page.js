'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export default function Page() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch('http://localhost:1337/api/articles/?populate=*', {
          cache: 'no-store',
        })
        const json = await res.json()
        const matched = json.data.find(( item) => item.slug === slug)
        setArticle(matched)
      } catch (err) {
        console.error('Failed to fetch article:', err)
      }
    }

    fetchArticle()
  }, [slug])
  
  const Spinner = () => (
  <svg
  className='h-6  w-6'
    version="1.1"
    id="L7"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 100 100"
    xmlSpace="preserve"
  >
    <path
      fill="#fff"
      d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3
        c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z"
    >
      <animateTransform
        attributeName="transform"
        attributeType="XML"
        type="rotate"
        dur="2s"
        from="0 50 50"
        to="360 50 50"
        repeatCount="indefinite"
      />
    </path>
    <path
      fill="#fff"
      d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7
        c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z"
    >
      <animateTransform
        attributeName="transform"
        attributeType="XML"
        type="rotate"
        dur="1s"
        from="0 50 50"
        to="-360 50 50"
        repeatCount="indefinite"
      />
    </path>
    <path
      fill="#fff"
      d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5
        L82,35.7z"
    >
      <animateTransform
        attributeName="transform"
        attributeType="XML"
        type="rotate"
        dur="2s"
        from="0 50 50"
        to="360 50 50"
        repeatCount="indefinite"
      />
    </path>
  </svg>
)

  if (!article) {
    return (
      <div className="text-center text-gray-300 py-20 bg-gray-900 min-h-screen">
       <Spinner />
      </div>
    )
  }






  return (
    <div className="bg-gray-900 min-h-screen text-gray-300 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-50 mb-4 capitalize">
          {article.title}
        </h1>

        {/* Metadata */}
        <div className="flex items-center text-sm text-gray-500 mb-6 space-x-4">
          <span>
            Published on:{' '}
            {new Date(article.createdAt).toLocaleDateString('en-US')}
          </span>
          <span>•</span>
          <span>Author: {article.author?.name || 'Unknown'}</span>
        </div>

        {/* Cover Image */}
        {article.cover?.url && (
          <div className="w-full h-64 bg-gray-800 rounded-lg mb-6 overflow-hidden">
            <img
              src={`http://localhost:1337${article.cover.url}`}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Blog Content */}
        <div className="prose prose-invert max-w-none prose-p:text-gray-400 prose-headings:text-gray-50">
          {article.content ? (
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          ) : (
            <p className="text-gray-400">{article.description}</p>
          )}
        </div>

        {/* Back Link */}
        <div className="mt-10">
          <a
            href="/blog"
            className="inline-block text-blue-500 hover:underline hover:text-blue-400 transition"
          >
            ← Back to Blog
          </a>
        </div>
      </div>
    </div>
  )
}
