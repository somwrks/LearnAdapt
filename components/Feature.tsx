import React from 'react';
import { Brain, Heart, Sparkles, MessageSquare, Activity, Users } from 'lucide-react';

export default function Features() {
  const features = [
    {
      name: 'Emotion Recognition',
      description: 'Real-time facial expression analysis to understand and respond to your child\'s emotional state.',
      icon: Heart,
    },
    {
      name: 'Adaptive Learning',
      description: 'Personalized content that adjusts to your child\'s progress and learning style.',
      icon: Brain,
    },
    {
      name: 'Interactive Activities',
      description: 'Engaging exercises designed to develop essential life skills and cognitive abilities.',
      icon: Sparkles,
    },
    {
      name: 'Speech Recognition',
      description: 'Advanced voice interaction for natural and effective communication practice.',
      icon: MessageSquare,
    },
    {
      name: 'Progress Tracking',
      description: 'Detailed insights and analytics to monitor your child\'s development journey.',
      icon: Activity,
    },
    {
      name: 'Community Support',
      description: 'Connect with therapists and other parents for guidance and shared experiences.',
      icon: Users,
    },
  ];

  return (
    <div className="py-12 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need for your child's growth
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our comprehensive suite of tools and features is designed to support your child's unique learning journey.
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                <p className="mt-2 ml-16 text-base text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}