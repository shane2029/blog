import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar'

const BlogPage = () => {
  const { slug } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [relatedPosts, setRelatedPosts] = useState([])
  
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch('/data/blogs.json')
        
        if (!response.ok) {
          throw new Error('Failed to fetch blog')
        }
        
        const data = await response.json()
        const foundBlog = data.find(b => b.slug === slug)
        
        if (!foundBlog) {
          throw new Error('Blog not found')
        }
        
        setBlog(foundBlog)
        
        // Find related posts (same category)
        const related = data
          .filter(post => post.id !== foundBlog.id && post.category === foundBlog.category)
          .slice(0, 3)
        
        setRelatedPosts(related)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }
    
    fetchBlog()
    
    // Scroll to top when navigating to a blog
    window.scrollTo(0, 0)
  }, [slug])
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Error</h2>
        <p>{error}</p>
        <Link to="/" className="mt-6 inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          Return to Home
        </Link>
      </div>
    )
  }
  
  if (!blog) {
    return (
      <div className="bg-slate-50 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Blog not found</h2>
        <p>The blog post you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="mt-6 inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          Return to Home
        </Link>
      </div>
    )
  }
  
  // Format the date
  const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  
  // Render content based on type
  const renderContent = (content) => {
    switch (content.type) {
      case 'paragraph':
        return (
          <p className="mb-6 text-slate-700 leading-relaxed">
            {content.text}
          </p>
        )
      case 'image':
        return (
          <div className="my-8">
            <img 
              src={content.src} 
              alt={content.alt} 
              className="w-full rounded-lg shadow-md"
            />
            {content.caption && (
              <p className="text-sm text-slate-500 mt-2 text-center">
                {content.caption}
              </p>
            )}
          </div>
        )
      case 'quote':
        return (
          <blockquote className="border-l-4 border-indigo-500 pl-4 italic my-8">
            <p className="text-lg text-slate-700">{content.text}</p>
            {content.author && (
              <cite className="block text-sm mt-2 not-italic font-medium text-slate-600">
                — {content.author}
              </cite>
            )}
          </blockquote>
        )
      case 'list':
        return (
          <ul className="list-disc pl-6 my-6 space-y-2 text-slate-700">
            {content.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )
      default:
        return null
    }
  }
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Content Area */}
      <div className="lg:col-span-2">
        <article className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Cover Image */}
          <div className="relative">
            <img 
              src={blog.coverImage} 
              alt={blog.title} 
              className="w-full h-64 sm:h-96 object-cover"
            />
            <div className="absolute top-4 left-4 flex space-x-2">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-indigo-600 text-white rounded">
                {blog.category}
              </span>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6 sm:p-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
              {blog.title}
            </h1>
            
            <div className="flex items-center mb-6 text-slate-500 text-sm">
              <span className="flex items-center mr-4">
                <svg 
                  className="w-4 h-4 mr-1" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2M17 13H11V7H12.5V11.5H17V13Z" />
                </svg>
                {blog.readTime} min read
              </span>
              <span className="flex items-center mr-4">
                <svg 
                  className="w-4 h-4 mr-1" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M9,10H7V12H9V10M13,10H11V12H13V10M17,10H15V12H17V10M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V8H19V19Z" />
                </svg>
                {formattedDate}
              </span>
            </div>
            
            {/* Author */}
            <div className="flex items-center p-4 bg-slate-50 rounded-lg mb-8">
              <img 
                src={blog.author.avatar} 
                alt={blog.author.name} 
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <p className="font-medium text-slate-800">{blog.author.name}</p>
                <p className="text-sm text-slate-500">{blog.author.role}</p>
              </div>
            </div>
            
            {/* Blog Content */}
            <div className="prose prose-slate max-w-none">
              {blog.content.map((content, index) => (
                <div key={index}>
                  {renderContent(content)}
                </div>
              ))}
            </div>
            
            {/* Gallery */}
            {blog.gallery && blog.gallery.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {blog.gallery.map((image, index) => (
                    <div key={index} className="relative aspect-square overflow-hidden rounded-lg shadow-md">
                      <img 
                        src={image} 
                        alt={`Gallery image ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
        
        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(post => (
                <div key={post.id} className="card hover:translate-y-[-5px]">
                  <Link to={`/blog/${post.slug}`} className="block">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img 
                        src={post.coverImage} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </Link>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 hover:text-indigo-600 transition-colors">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-sm text-slate-500 mb-2">
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                    <p className="text-slate-600 line-clamp-2 text-sm">{post.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
      
      {/* Sidebar */}
      <div className="lg:col-span-1">
        <Sidebar />
      </div>
    </div>
  )
}

export default BlogPage