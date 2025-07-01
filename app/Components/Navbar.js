import React from 'react'
import Link from 'next/link'
import Image from 'next/image'


const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo / Site Name */}
        <div className="text-xl font-bold">
          <Link href="/">   
        iArticle
            </Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="hover:text-gray-300 transition duration-200">Home</Link>
          </li>
          <li>
            <Link href="/blog" className="hover:text-gray-300 transition duration-200">Blog</Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-gray-300 transition duration-200">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
