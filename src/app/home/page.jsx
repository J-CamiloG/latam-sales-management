'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { motion, useInView } from 'framer-motion'

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const heroRef = useRef(null)
  const content1Ref = useRef(null)
  const content2Ref = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" })
  const isContent1InView = useInView(content1Ref, { once: true, margin: "-100px" })
  const isContent2InView = useInView(content2Ref, { once: true, margin: "-100px" })

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-4 sm:p-6 sticky top-0 bg-white z-50">
        <div className="text-2xl font-bold text-gray-900">Logo</div>
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <Link href="#" className="text-gray-600 hover:text-gray-900">
            Content 1
          </Link>
          <Link href="#" className="text-gray-600 hover:text-gray-900">
            Content 2
          </Link>
          <Link href="/login" className=" text-blue-500 hover:bg-blue-50">
            Login
          </Link>

        </div>
        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-2">
          <Link href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
            Content 1
          </Link>
          <Link href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
            Content 2
          </Link>
          <Link href="/login" className="block px-4 py-2 text-blue-500 hover:bg-blue-50">
            Login
          </Link>
        </div>
      )}

      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex items-center bg-gray-50">
        <motion.div 
          className="container mx-auto px-4 sm:px-6 py-16"
          style={{
            transform: isHeroInView ? "none" : "translateY(100px)",
            opacity: isHeroInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
          }}
        >
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8 md:space-y-12 flex flex-col justify-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Lorem ipsum Design
              </h1>
              <p className="text-lg sm:text-xl text-gray-500 max-w-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
              </p>
              <div>
                  <Link href="/login" className="bg-blue-500 hover:bg-blue-600 text-white text-base sm:text-lg font-semibold px-6 sm:px-10 py-3 sm:py-4 rounded-md transition-colors">
                      Login
                  </Link>
              </div>
            </div>
            <div className="flex justify-center items-center h-full mt-8 md:mt-0">
              <div className="relative w-full aspect-square max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
                <Image
                  src="/Ilustraciones/Home.png"
                  alt="Design illustration"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Content 1 Section */}
      <section ref={content1Ref} className="min-h-screen flex items-center bg-white">
        <motion.div 
          className="container mx-auto px-4 py-16"
          style={{
            transform: isContent1InView ? "none" : "translateY(100px)",
            opacity: isContent1InView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Content 1</h2>
          <p className="text-gray-600 mb-12 max-w-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <motion.div
                key={item}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                animate={isContent1InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: item * 0.1 }}
              >
                <div className="bg-blue-500 p-8">
                  <Image
                    src="/Ilustraciones/Home.png"
                    alt={`Feature ${item}`}
                    width={200}
                    height={200}
                    className="w-full"
                  />
                </div>
                <div className="p-6">
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Content 2 Section */}
      <section ref={content2Ref} className="min-h-screen flex items-center bg-gray-50">
        <motion.div 
          className="container mx-auto px-4 py-16"
          style={{
            transform: isContent2InView ? "none" : "translateY(100px)",
            opacity: isContent2InView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
          }}
        >
          <div className="text-right mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Content 2</h2>
            <p className="text-gray-600 max-w-2xl ml-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                className={`p-6 rounded-lg ${item === 2 ? 'border-2 border-blue-500' : 'border border-gray-200'}`}
                initial={{ opacity: 0, y: 50 }}
                animate={isContent2InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: item * 0.1 }}
              >
                <div className="space-y-2">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 rounded ${
                        item === 2 ? 'bg-blue-500' : 'bg-gray-200'
                      } ${i === 0 ? 'w-1/2' : 'w-full'}`}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  )
}