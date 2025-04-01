"use client";
import React, { useState } from 'react';

const FAQ = () => {
  const [openSection, setOpenSection] = useState<number | null>(null);

  const faqSections = [
    {
      question: "What materials are your beanies made from?",
      answer: "Our beanies are crafted from high-quality, sustainable materials including organic cotton and recycled polyester blends. Each beanie is carefully selected to ensure both comfort and durability."
    },
    {
      question: "How do I care for my beanie?",
      answer: "We recommend hand washing your beanie in cold water with mild detergent. Lay flat to dry to maintain its shape. Avoid using bleach or putting it in the dryer."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for unworn items in their original packaging. Please contact us at dejan.gaspar@gmail.com to initiate a return."
    },
    {
      question: "How long does shipping take?",
      answer: "Shipping times vary by location. Within Europe, typical delivery times are 3-7 business days. You'll receive a tracking number once your order ships."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. You can see our shipping rates table during checkout."
    },
    {
      question: "How do I track my order?",
      answer: "Once your order ships, you'll receive an email with tracking information. You can use this to monitor your package's journey to you."
    }
  ];

  return (
    <div className='w-full pb-10 bg-gray-50 relative'>
      <div className="relative h-[300px] w-full bg-cover bg-center bg-no-repeat bg-[url('/beanie.webp')]">
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <h1 className="text-3xl sm:text-6xl font-extrabold text-white absolute top-20 left-1/2 transform -translate-x-1/2">
        Frequently Asked Questions
      </h1>

      <div className="max-w-3xl mx-auto mt-20 px-4">
        <div className="space-y-6">
          {faqSections.map((section, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                onClick={() => setOpenSection(openSection === index ? null : index)}
              >
                <span className="font-medium text-gray-900">{section.question}</span>
                <span className="ml-6 flex-shrink-0">
                  {openSection === index ? (
                    <span className="text-gray-900">−</span>
                  ) : (
                    <span className="text-gray-900">+</span>
                  )}
                </span>
              </button>
              {openSection === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-700">{section.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-700 mb-4">Still have questions?</p>
          <div className="space-y-4">
            <a
              href="mailto:dejan.gaspar@gmail.com"
              className="block text-blue-600 hover:underline"
            >
              Email us at dejan.gaspar@gmail.com
            </a>
            <a
              href="/contact"
              className="block text-blue-600 hover:underline"
            >
              Use our contact form
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 