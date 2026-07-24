import React from 'react';
import { useTemplateData } from '../TemplateContext';
import { motion } from 'framer-motion';

export default function Blog() {
  const data = useTemplateData();

  return (
    <section className="py-24 bg-white" id="blog">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif font-bold text-[var(--color-secondary)] mb-4"
            >
              {data.blog.title}
            </motion.h2>
            <p className="text-gray-500">
              Stay updated with our latest news and industry insights.
            </p>
          </div>
          <a href="#" className="border-b-2 border-[var(--color-primary)] pb-1 font-bold text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors uppercase tracking-wider text-sm">
            View All Posts
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.blog.posts.map((post: any, index: number) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden mb-6 aspect-[4/3]">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-white px-4 py-2 text-center shadow-lg">
                  <span className="block text-2xl font-bold font-serif text-[var(--color-secondary)] leading-none">{post.date.split(' ')[0]}</span>
                  <span className="block text-xs uppercase tracking-wider text-gray-500 mt-1">{post.date.split(' ')[1]}</span>
                </div>
              </div>
              
              <div className="flex items-center text-sm font-semibold text-[var(--color-primary)] mb-3 uppercase tracking-wider">
                <span>By {post.author}</span>
                <span className="mx-2">•</span>
                <span>{post.category}</span>
              </div>
              
              <h3 className="text-2xl font-serif font-bold text-[var(--color-secondary)] mb-4 group-hover:text-[var(--color-primary)] transition-colors">
                {post.title}
              </h3>
              
              <a href="#" className="text-gray-900 font-bold hover:text-[var(--color-primary)] transition-colors inline-flex items-center">
                Read More 
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
