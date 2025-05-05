import { Link } from 'react-router-dom'

const BlogCard = ({ blog }) => {
  const { id, slug, title, excerpt, author, category, date, coverImage, readTime } = blog

  // Format the date
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="card group hover:translate-y-[-5px]">
      <Link to={`/blog/${slug}`} className="block">
        <div className="relative aspect-[16/9] overflow-hidden">
          <img 
            src={coverImage} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <span className="inline-block px-2 py-1 text-xs font-medium bg-indigo-600 text-white rounded">
              {category}
            </span>
          </div>
        </div>
      </Link>

      <div className="p-5">
        <div className="flex items-center space-x-4 text-sm text-slate-500 mb-3">
          <span className="flex items-center">
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
          <span>{formattedDate}</span>
        </div>

        <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-600 transition-colors">
          <Link to={`/blog/${slug}`}>{title}</Link>
        </h3>
        
        <p className="text-slate-600 mb-4 line-clamp-2">{excerpt}</p>
        
        <div className="flex items-center">
          <img 
            src={author.avatar} 
            alt={author.name} 
            className="w-10 h-10 rounded-full object-cover mr-3"
          />
          <div>
            <p className="font-medium text-slate-800">{author.name}</p>
            <p className="text-sm text-slate-500">{author.role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogCard