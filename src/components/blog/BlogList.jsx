import { useState, useEffect } from 'react'
import BlogCard from './BlogCard'

const BlogList = ({ category = null, searchQuery = '' }) => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6
  
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/data/blogs.json')
        
        if (!response.ok) {
          throw new Error('Failed to fetch blogs')
        }
        
        const data = await response.json()
        
        // Filter by category if provided
        const filteredBlogs = category 
          ? data.filter(blog => blog.category === category)
          : data
        
        setBlogs(filteredBlogs)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }
    
    fetchBlogs()
  }, [category])
  
  // Filter blogs based on search query
  const filteredBlogs = blogs.filter(blog => {
    if (!searchQuery) return true
    const searchLower = searchQuery.toLowerCase()
    return (
      blog.title.toLowerCase().includes(searchLower) ||
      blog.excerpt.toLowerCase().includes(searchLower) ||
      blog.category.toLowerCase().includes(searchLower)
    )
  })
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage)
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredBlogs.slice(indexOfFirstPost, indexOfLastPost)
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        <p>Error: {error}</p>
        <p>Please try again later.</p>
      </div>
    )
  }
  
  // Search results header
  const renderSearchHeader = () => {
    if (!searchQuery) return null
    
    return (
      <div className="mb-6 bg-rose-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-rose-800">
          Search Results
        </h3>
        <p className="text-rose-600">
          Found {filteredBlogs.length} {filteredBlogs.length === 1 ? 'article' : 'articles'} matching "{searchQuery}"
        </p>
      </div>
    )
  }
  
  if (filteredBlogs.length === 0) {
    return (
      <div>
        {renderSearchHeader()}
        <div className="bg-slate-50 p-8 rounded-lg text-center">
          <h3 className="text-xl font-semibold mb-2">No blogs found</h3>
          {searchQuery ? (
            <p className="text-slate-600">
              No articles found matching "{searchQuery}". Please try a different search term.
            </p>
          ) : category ? (
            <p className="text-slate-600">
              No articles found in the "{category}" category. Please try another category.
            </p>
          ) : (
            <p className="text-slate-600">
              No articles found. Please try again later.
            </p>
          )}
        </div>
      </div>
    )
  }
  
  return (
    <div>
      {renderSearchHeader()}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPosts.map(blog => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
      
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-rose-500 text-white hover:bg-rose-600'
            }`}
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-4 py-2 rounded-md ${
                currentPage === number
                  ? 'bg-rose-600 text-white'
                  : 'bg-rose-500 text-white hover:bg-rose-600'
              }`}
            >
              {number}
            </button>
          ))}
          
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-rose-500 text-white hover:bg-rose-600'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default BlogList