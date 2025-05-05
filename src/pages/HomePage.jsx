import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FeaturedPost from '../components/blog/FeaturedPost'
import BlogList from '../components/blog/BlogList'
import Sidebar from '../components/layout/Sidebar'

const HomePage = () => {
  const [featuredPost, setFeaturedPost] = useState(null)
  const [popularCategories, setPopularCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/blogs.json')
        
        if (!response.ok) {
          throw new Error('Failed to fetch blogs')
        }
        
        const data = await response.json()
        
        const featured = data.find(post => post.featured) ||
          [...data].sort((a, b) => new Date(b.date) - new Date(a.date))[0]
        
        setFeaturedPost(featured)
        
        setPopularCategories([
          { id: 1, name: 'Personal Growth', icon: 'M9.5 14.25v-2.625q0-.3-.225-.525Q9.05 10.875 8.75 10.875h-3q-.3 0-.525.225-.225.225-.225.525v2.625q0 .3.225.525.225.225.525.225h3q.3 0 .525-.225.225-.225.225-.525Zm0-3.75v-2.625q0-.3-.225-.525Q9.05 7.125 8.75 7.125h-3q-.3 0-.525.225-.225.225-.225.525v2.625q0 .3.225.525.225.225.525.225h3q.3 0 .525-.225.225-.225.225-.525Zm4.5 3.75v-2.625q0-.3-.225-.525-.225-.225-.525-.225h-3q-.3 0-.525.225-.225.225-.225.525v2.625q0 .3.225.525.225.225.525.225h3q.3 0 .525-.225.225-.225.225-.525Zm0-3.75v-2.625q0-.3-.225-.525-.225-.225-.525-.225h-3q-.3 0-.525.225-.225.225-.225.525v2.625q0 .3.225.525.225.225.525.225h3q.3 0 .525-.225.225-.225.225-.525Zm4.5 3.75v-2.625q0-.3-.225-.525-.225-.225-.525-.225h-3q-.3 0-.525.225-.225.225-.225.525v2.625q0 .3.225.525.225.225.525.225h3q.3 0 .525-.225.225-.225.225-.525Zm0-3.75v-2.625q0-.3-.225-.525-.225-.225-.525-.225h-3q-.3 0-.525.225-.225.225-.225.525v2.625q0 .3.225.525.225.225.525.225h3q.3 0 .525-.225.225-.225.225-.525ZM7.5 21q-.65 0-1.075-.425Q6 20.15 6 19.5v-15q0-.65.425-1.075Q6.85 3 7.5 3h15q.65 0 1.075.425Q24 3.85 24 4.5v15q0 .65-.425 1.075Q23.15 21 22.5 21Zm0-1.5h15v-15h-15v15Zm-4.5 3q-.65 0-1.075-.425Q1.5 21.65 1.5 21v-14q0-.3.15-.55.15-.25.4-.4.25-.15.55-.15.3 0 .55.15.25.15.4.4.15.25.15.55H3V21h16.5q.3 0 .55.15.25.15.4.4.15.25.15.55 0 .3-.15.55-.15.25-.4.4-.25.15-.55.15ZM7.5 4.5v15-15Z' },
          { id: 2, name: 'Creative Writing', icon: 'M6 22q-.825 0-1.412-.587Q4 20.825 4 20V10q0-.825.588-1.413Q5.175 8 6 8h1V6q0-2.075 1.463-3.538Q9.925 1 12 1t3.538 1.462Q17 3.925 17 6v2h1q.825 0 1.413.587Q20 9.175 20 10v10q0 .825-.587 1.413Q18.825 22 18 22Zm6-5q.825 0 1.413-.588Q14 15.825 14 15q0-.825-.587-1.413Q12.825 13 12 13q-.825 0-1.412.587Q10 14.175 10 15q0 .825.588 1.412Q11.175 17 12 17ZM9 8h6V6q0-1.25-.875-2.125T12 3q-1.25 0-2.125.875T9 6Z' },
          { id: 3, name: 'Life Stories', icon: 'M12 21.975q-3.425 0-6.212-1.788Q3 18.4 3 15.475V8.525q0-2.925 2.788-4.712Q8.575 2.025 12 2.025q3.425 0 6.213 1.787Q21 5.6 21 8.525v6.95q0 2.925-2.787 4.712-2.788 1.788-6.213 1.788Zm0-16.3q-2.6 0-4.3 1.012Q6 7.7 6 8.525q0 .825 1.7 1.837 1.7 1.013 4.3 1.013t4.3-1.013q1.7-1.012 1.7-1.837 0-.825-1.7-1.838-1.7-1.012-4.3-1.012ZM12 19.3q2.6 0 4.3-1.013 1.7-1.012 1.7-1.837v-5.375q0 .825-1.7 1.838-1.7 1.012-4.3 1.012t-4.3-1.012Q6 11.9 6 11.075V16.45q0 .825 1.7 1.837 1.7 1.013 4.3 1.013Zm0 1.65q2.35 0 4.138-.875 1.787-.875 2.462-2.275-.675-1.4-2.462-2.275Q14.35 14.65 12 14.65q-2.35 0-4.137.875-1.788.875-2.463 2.275.675 1.4 2.463 2.275Q9.65 20.95 12 20.95Zm0-6.3Zm0 0Zm0 0Zm0 3.15q-.85 0-1.425-.575Q10 16.65 10 15.8q0-.85.575-1.425.575-.575 1.425-.575.85 0 1.425.575.575.575.575 1.425 0 .85-.575 1.425-.575.575-1.425.575Z' },
          { id: 4, name: 'Inspiration', icon: 'M12 12.5ZM5.5 21v-1q0-.8.35-1.5.35-.7.95-1.225-1.325-.55-2.062-1.688Q4 14.45 4 13q0-1.5.75-2.75T7 8.5V5.25q0-.95.663-1.625T9.275 3h5.45q.925 0 1.6.675.675.675.675 1.6V8.5q1.5.75 2.25 2T20 13q0 1.45-.738 2.587-.737 1.138-2.062 1.688.6.525.95 1.225.35.7.35 1.5v1Zm5.5-10q0 .425.288.713.287.287.712.287t.713-.287Q13 11.425 13 11t-.287-.713Q12.425 10 12 10t-.712.287Q11 10.575 11 11Zm3.5 7h-5q0 1.05.725 1.775Q14.95 20.5 16 20.5t1.775-.725Q18.5 19.05 18.5 18Zm-6.75-8H8.5V5.5h3.25Zm4.75 0h-3.25V5.5h3.25Z' }
        ])
        
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])
  
  const handleSearch = (query) => {
    setSearchQuery(query)
  }
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
      </div>
    )
  }
  
  return (
    <div>
      {/* Hero Section */}
      <section className="mb-12 bg-gradient-to-r from-rose-500 to-rose-700 rounded-xl overflow-hidden shadow-xl">
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Welcome to Shane's Creative Corner
          </h1>
          <p className="text-rose-100 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Join me on a journey of self-discovery, creative expression, and personal growth through the power of words.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/about" className="px-6 py-3 bg-white text-rose-700 font-medium rounded-md hover:bg-rose-50 transition-colors">
              My Story
            </Link>
            <Link to="/contact" className="px-6 py-3 bg-transparent text-white font-medium rounded-md border border-white hover:bg-white/10 transition-colors">
              Let's Connect
            </Link>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Content Area */}
        <div className="lg:col-span-2 space-y-12">
          {/* Featured Post */}
          {featuredPost && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Featured Story</h2>
              </div>
              <FeaturedPost post={featuredPost} />
            </section>
          )}
          
          {/* Popular Categories */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Explore My Writing</h2>
              <a href="#" className="text-rose-600 hover:text-rose-800 text-sm font-medium">
                View All Categories
              </a>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {popularCategories.map(category => (
                <div 
                  key={category.id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-rose-500"
                >
                  <div className="flex items-start">
                    <div className="mr-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-rose-100 text-rose-600 rounded-full">
                        <svg 
                          className="w-6 h-6" 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d={category.icon} />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">{category.name}</h3>
                      <a 
                        href="#" 
                        className="inline-flex items-center text-rose-600 hover:text-rose-800 font-medium"
                      >
                        Read Stories
                        <svg 
                          className="w-5 h-5 ml-1" 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Latest Posts */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Latest Stories</h2>
              <a href="#" className="text-rose-600 hover:text-rose-800 text-sm font-medium">
                View All Stories
              </a>
            </div>
            
            <BlogList searchQuery={searchQuery} />
          </section>
          
          {/* CTA Section */}
          <section className="bg-slate-800 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Join My Creative Journey</h2>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Subscribe to receive my latest stories, personal reflections, and creative insights directly to your inbox.
            </p>
            <button className="px-6 py-3 bg-rose-500 text-white font-medium rounded-md hover:bg-rose-600 transition-colors">
              Subscribe Now
            </button>
          </section>
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Sidebar onSearch={handleSearch} />
        </div>
      </div>
    </div>
  )
}

export default HomePage