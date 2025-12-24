/**
 * ============================================
 * Marketing Block: Testimonials
 * ============================================
 */

import React from "react";

export interface Testimonial {
  name: string;
  role: string;
  company?: string;
  avatar?: string;
  content: string;
  rating?: number;
}

export interface TestimonialsProps {
  title?: string;
  subtitle?: string;
  testimonials: Testimonial[];
}

export function Testimonials({
  title = "What Our Customers Say",
  subtitle,
  testimonials,
}: TestimonialsProps) {
  return (
    <section className="testimonials-section py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        {title && <h2 className="text-3xl font-bold text-center mb-4">{title}</h2>}
        {subtitle && <p className="text-center text-neutral-600 mb-12">{subtitle}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card p-6 bg-white rounded-lg shadow-sm">
              {testimonial.rating && (
                <div className="mb-4">
                  {"⭐".repeat(testimonial.rating)}
                </div>
              )}
              <p className="text-neutral-700 mb-4 italic">"{testimonial.content}"</p>
              <div className="flex items-center gap-3">
                {testimonial.avatar && (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                )}
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-neutral-600">
                    {testimonial.role}
                    {testimonial.company && ` at ${testimonial.company}`}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

