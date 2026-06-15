'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Riya Sharma',
    role: 'Computer Science Student',
    avatar: 'RS',
    color: 'from-neon-blue to-neon-purple',
    text: 'JSForge Runtime is mind-blowing! I finally understand how JavaScript engines work under the hood. The interactive playground made everything click.',
    stars: 5,
  },
  {
    name: 'Arjun Mehta',
    role: 'Hackathon Judge',
    avatar: 'AM',
    color: 'from-neon-purple to-neon-pink',
    text: 'One of the most technically impressive hackathon submissions I\'ve seen. Building a JS runtime from scratch in C++ is no small feat — and the documentation is excellent.',
    stars: 5,
  },
  {
    name: 'Priya Patel',
    role: 'Full-Stack Developer',
    avatar: 'PP',
    color: 'from-emerald-400 to-neon-blue',
    text: 'The architecture diagram alone taught me more about compilers than 3 months of online courses. Love the live code execution feature!',
    stars: 5,
  },
]

export function Testimonials() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-tag">What people say</span>
          <h2 className="text-4xl font-bold text-white">
            Community <span className="gradient-text">Feedback</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map(({ name, role, avatar, color, text, stars }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass-card p-7 flex flex-col gap-5"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array(stars).fill(0).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-cyber-yellow text-cyber-yellow" />
                ))}
              </div>

              <p className="text-slate-300 text-sm leading-relaxed flex-1">"{text}"</p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                  {avatar}
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">{name}</div>
                  <div className="text-slate-500 text-xs">{role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
