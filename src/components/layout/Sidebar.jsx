import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Sidebar = ({ onSearch }) => {
  const [categories, setCategories] = useState([])
  const [recentPosts, setRecentPosts] = useState([])
  const [tags, setTags] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  
  useEffect(() => {
    // Fetch blog data to dynamically generate categories
    const fetchCategories = async () => {
      try {
        const response = await fetch('/data/blogs.json')
        if (!response.ok) throw new Error('Failed to fetch blog data')
        
        const data = await response.json()
        
        // Extract categories and count occurrences
        const categoryMap = {}
        data.forEach(post => {
          const category = post.category
          categoryMap[category] = (categoryMap[category] || 0) + 1
        })
        
        // Convert to array format needed for display
        const categoryArray = Object.entries(categoryMap).map(([name, count], index) => ({
          id: index + 1,
          name,
          count
        }))
        
        // Sort by count (descending)
        categoryArray.sort((a, b) => b.count - a.count)
        
        setCategories(categoryArray)
      } catch (error) {
        console.error('Error fetching categories:', error)
        setCategories([])
      }
    }
    
    fetchCategories()
    
    // Fetch recent posts
    const fetchRecentPosts = async () => {
      try {
        const response = await fetch('/data/blogs.json')
        if (!response.ok) throw new Error('Failed to fetch recent posts')
        
        const data = await response.json()
        // Sort by date and take the 4 most recent posts
        const recent = [...data]
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 4)
        
        setRecentPosts(recent)
      } catch (error) {
        console.error('Error fetching recent posts:', error)
        setRecentPosts([])
      }
    }
    
    fetchRecentPosts()
    
    // Fetch tags - updated to match the blog content themes
    setTags([
      { id: 1, name: 'Writing' },
      { id: 2, name: 'Self-Discovery' },
      { id: 3, name: 'Creativity' },
      { id: 4, name: 'IT Education' },
      { id: 5, name: 'Manila' },
      { id: 6, name: 'Baguio' },
      { id: 7, name: 'Journaling' },
      { id: 8, name: 'Nature' },
      { id: 9, name: 'Museums' },
      { id: 10, name: 'Technology' }
    ])
  }, [])
  
  // Handle real-time search
  const handleSearchChange = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    onSearch(query)
  }
  
  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="bg-white rounded-lg shadow-md p-5">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Search Articles</h3>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Type to search..." 
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
            <svg 
              className="w-5 h-5" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          {searchQuery && (
            <button 
              onClick={() => {
                setSearchQuery('')
                onSearch('')
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-rose-500 transition-colors"
            >
              <svg 
                className="w-5 h-5" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
        {searchQuery && (
          <p className="mt-2 text-sm text-slate-500">
            Showing results for: <span className="font-medium text-rose-600">{searchQuery}</span>
          </p>
        )}
      </div>
      
      {/* Categories */}
      <div className="bg-white rounded-lg shadow-md p-5">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Categories</h3>
        <ul className="space-y-2">
          {categories.map(category => (
            <li key={category.id} className="flex justify-between items-center">
              <a 
                href="#" 
                className="text-slate-600 hover:text-rose-600 transition-colors"
              >
                {category.name}
              </a>
              <span className="bg-slate-100 text-slate-500 text-xs font-medium px-2 py-1 rounded-full">
                {category.count}
              </span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Recent Posts */}
      <div className="bg-white rounded-lg shadow-md p-5">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Posts</h3>
        <div className="space-y-4">
          {recentPosts.map(post => (
            <div key={post.id} className="flex space-x-3">
              <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden">
                <img 
                  src={post.coverImage} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium text-sm hover:text-rose-600 transition-colors line-clamp-2">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Tags */}
      <div className="bg-white rounded-lg shadow-md p-5">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <a 
              key={tag.id} 
              href="#" 
              className="inline-block px-3 py-1 text-sm bg-slate-100 text-slate-700 rounded-md hover:bg-rose-100 hover:text-rose-700 transition-colors"
            >
              {tag.name}
            </a>
          ))}
        </div>
      </div>
      

      
      {/* Field Trip Series Highlight */}
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 rounded-lg shadow-md p-5 text-white">
        <h3 className="text-lg font-semibold mb-3">IT Educational Trip Series</h3>
        <p className="text-slate-200 text-sm mb-4">
          Follow my 7-day journey exploring technology infrastructure and cultural sites across Luzon.
        </p>
        <Link to="/field-trip-series" className="inline-block px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 transition-colors text-sm font-medium">
          Read the Series
        </Link>
      </div>
    </div>
  )
}

export default Sidebar