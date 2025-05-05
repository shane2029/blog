import { Link } from 'react-router-dom'

const AboutPage = () => {
  const values = [
    {
      id: 1,
      title: 'Creative Expression',
      description: 'I believe in the power of words to express our deepest thoughts and emotions, creating connections that transcend boundaries.',
      icon: 'M12 6.253v13h-8.253l8.253-13zm8.253 0h-8.253l8.253 13 8.253-13h-8.253zm-12.253 0v13h-8.253l8.253-13z'
    },
    {
      id: 2,
      title: 'Authenticity',
      description: 'Every story I share comes from a place of genuine experience and heartfelt emotion, creating authentic connections with my readers.',
      icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
    },
    {
      id: 3,
      title: 'Growth Mindset',
      description: 'I embrace challenges as opportunities for growth, constantly evolving my craft and perspective through new experiences.',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z'
    },
    {
      id: 4,
      title: 'Community',
      description: 'I value the connections formed through shared stories and experiences, building a community of like-minded individuals.',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
    }
  ]
  
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl overflow-hidden shadow-xl">
        <div className="container mx-auto px-6 py-16 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              About Shane Almae
            </h1>
            <p className="text-pink-100 text-lg md:text-xl max-w-2xl lg:mx-0 mx-auto">
              A passionate writer and creative soul dedicated to sharing stories that inspire, connect, and transform lives.
            </p>
          </div>
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <img 
              src="/images/about/hero.jpg" 
              alt="Shane Almae" 
              className="rounded-lg shadow-lg w-full max-w-md"
            />
          </div>
        </div>
      </section>
      
      {/* My Story */}
      <section>
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
              <h2 className="text-3xl font-bold text-slate-800 mb-6">My Journey</h2>
              <p className="text-slate-600 mb-4">
                From a young age, I've been captivated by the power of words to tell stories and express emotions. My journey as a writer began with personal journals and evolved into sharing my experiences with a wider audience.
              </p>
              <p className="text-slate-600 mb-4">
                Through my writing, I explore themes of self-discovery, personal growth, and the beauty of everyday moments. Each piece I create is a reflection of my journey and an invitation for others to join me in exploring life's wonders.
              </p>
              <p className="text-slate-600">
                My goal is to create content that resonates with readers, offering insights and perspectives that inspire personal growth and meaningful connections.
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="/images/about/writing.jpg" 
                  alt="Writing process" 
                  className="rounded-lg shadow-md"
                />
                <img 
                  src="/images/about/inspiration.jpg" 
                  alt="Creative inspiration" 
                  className="rounded-lg shadow-md"
                />
                <img 
                  src="/images/about/reading.jpg" 
                  alt="Reading and research" 
                  className="rounded-lg shadow-md"
                />
                <img 
                  src="/images/about/community.jpg" 
                  alt="Community engagement" 
                  className="rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* My Values */}
      <section className="bg-slate-50 py-16 rounded-xl">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">My Values</h2>
            <p className="text-slate-600 max-w-3xl mx-auto">
              These principles guide my creative journey and shape the content I share with my readers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map(value => (
              <div 
                key={value.id} 
                className="bg-white p-6 rounded-lg shadow-md border-t-4 border-pink-500"
              >
                <div className="mb-4 w-12 h-12 flex items-center justify-center bg-pink-100 text-pink-600 rounded-full">
                  <svg 
                    className="w-6 h-6" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d={value.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">{value.title}</h3>
                <p className="text-slate-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-white rounded-xl shadow-md p-8 text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Join My Creative Journey</h2>
        <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
          Subscribe to receive my latest stories, personal reflections, and creative insights directly to your inbox.
        </p>
        <div className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button className="px-6 py-3 bg-pink-500 text-white font-medium rounded-md hover:bg-pink-600 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage