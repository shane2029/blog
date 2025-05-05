import { Link } from 'react-router-dom'

const FeaturedPost = ({ post }) => {
  const { slug, title, excerpt, author, category, date, coverImage, readTime } = post

  // Format the date
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:flex-shrink-0 md:w-1/2">
          <Link to={`/blog/${slug}`} className="block">
            <div className="relative h-64 md:h-full overflow-hidden">
              <img 
                src={coverImage} 
                alt={title} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute top-4 left-4">
                <span className="inline-block px-3 py-1 text-sm font-medium bg-indigo-600 text-white rounded">
                  Featured
                </span>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="p-6 md:p-8 md:w-1/2">
          <div className="flex items-center space-x-2 mb-2">
            <span className="inline-block px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded">
              {category}
            </span>
            <span className="flex items-center text-sm text-slate-500">
              <svg 
                className="w-4 h-4 mr-1" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z" />
              </svg>
              {readTime} min read
            </span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-4 hover:text-indigo-600 transition-colors">
            <Link to={`/blog/${slug}`}>{title}</Link>
          </h2>
          
          <p className="text-slate-600 mb-6 line-clamp-3 md:line-clamp-4">{excerpt}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src={author.avatar} 
                alt={author.name} 
                className="w-10 h-10 rounded-full object-cover mr-3"
              />
              <div>
                <p className="font-medium text-slate-800">{author.name}</p>
                <p className="text-sm text-slate-500">{formattedDate}</p>
              </div>
            </div>
            
            <Link to={`/blog/${slug}`} className="btn btn-primary">
              Read More
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedPost