'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, Quote } from 'lucide-react';
import { useState, useEffect } from 'react';

const DEFAULT_REVIEWS = {
  sectionTitle: 'What Our Customers Say',
  sectionSubtitle: 'Trusted by thousands of businesses worldwide to accelerate their financing decisions',
  reviews: [
    {
      id: 1,
      name: 'Sarah Chen',
      title: 'CFO',
      company: 'TechStart Inc.',
      avatar: '/avatars/sarah-chen.jpg',
      rating: 5,
      review: 'FinanceApp transformed our loan approval process. What used to take weeks now happens in hours. The AI-powered risk assessment is incredibly accurate and has helped us make better financing decisions.',
      featured: true
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      title: 'VP of Finance',
      company: 'Growth Dynamics',
      avatar: '/avatars/michael-rodriguez.jpg',
      rating: 5,
      review: 'The automation features are game-changing. We\'ve reduced our processing time by 75% and our team can now focus on strategic decisions rather than manual paperwork.',
      featured: false
    },
    {
      id: 3,
      name: 'Emily Watson',
      title: 'Financial Director',
      company: 'Innovate Solutions',
      avatar: '/avatars/emily-watson.jpg',
      rating: 5,
      review: 'Outstanding platform with excellent customer support. The real-time analytics and compliance features give us complete confidence in our financing operations.',
      featured: false
    },
    {
      id: 4,
      name: 'David Kim',
      title: 'CEO',
      company: 'NextGen Ventures',
      avatar: '/avatars/david-kim.jpg',
      rating: 5,
      review: 'FinanceApp\'s integration capabilities are impressive. We connected all our existing systems seamlessly, and the mobile app keeps us connected on the go.',
      featured: false
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      title: 'Head of Operations',
      company: 'Scale Partners',
      avatar: '/avatars/lisa-thompson.jpg',
      rating: 5,
      review: 'The security features and compliance management tools are top-notch. We feel completely secure knowing our financial data is protected with bank-grade encryption.',
      featured: false
    },
    {
      id: 6,
      name: 'James Wilson',
      title: 'Finance Manager',
      company: 'Rapid Growth Co.',
      avatar: '/avatars/james-wilson.jpg',
      rating: 5,
      review: 'Incredible ROI since implementing FinanceApp. The automated workflows and intelligent insights have streamlined our entire financing process.',
      featured: false
    }
  ],
  trustBadges: [
    { text: 'SOC 2 Certified', variant: 'secondary' },
    { text: '99.9% Uptime', variant: 'outline' },
    { text: 'Bank-Grade Security', variant: 'secondary' }
  ]
} as const;

type ReviewsProps = Partial<typeof DEFAULT_REVIEWS>;

export default function Reviews(props: ReviewsProps) {
  const config = { ...DEFAULT_REVIEWS, ...props };
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const featuredReview = config.reviews.find(review => review.featured);
  const regularReviews = config.reviews.filter(review => !review.featured);

  return (
    <section id="reviews" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span data-editable="sectionTitle">{config.sectionTitle}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              <span data-editable="sectionSubtitle">{config.sectionSubtitle}</span>
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-3">
              {config.trustBadges.map((badge, idx) => (
                <Badge key={idx} variant={badge.variant as any} className="px-3 py-1">
                  <span data-editable={`trustBadges[${idx}].text`}>{badge.text}</span>
                </Badge>
              ))}
            </div>
          </div>

          {/* Featured Review */}
          {featuredReview && (
            <div 
              className={`mb-16 transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 shadow-lg">
                <CardContent className="p-8 md:p-12">
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="flex-shrink-0">
                      <Quote className="w-12 h-12 text-primary/30 mb-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-4">
                        {renderStars(featuredReview.rating)}
                      </div>
                      <blockquote className="text-lg md:text-xl leading-relaxed mb-6 text-foreground">
                        <span data-editable={`reviews[${config.reviews.findIndex(r => r.id === featuredReview.id)}].review`}>
                          "{featuredReview.review}"
                        </span>
                      </blockquote>
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage 
                            src={featuredReview.avatar} 
                            alt={featuredReview.name}
                          />
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {featuredReview.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold text-foreground">
                            <span data-editable={`reviews[${config.reviews.findIndex(r => r.id === featuredReview.id)}].name`}>
                              {featuredReview.name}
                            </span>
                          </div>
                          <div className="text-muted-foreground text-sm">
                            <span data-editable={`reviews[${config.reviews.findIndex(r => r.id === featuredReview.id)}].title`}>
                              {featuredReview.title}
                            </span>
                            {' at '}
                            <span data-editable={`reviews[${config.reviews.findIndex(r => r.id === featuredReview.id)}].company`}>
                              {featuredReview.company}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Regular Reviews Grid */}
          <div 
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {regularReviews.map((review, idx) => {
              const originalIndex = config.reviews.findIndex(r => r.id === review.id);
              return (
                <Card key={review.id} className="bg-card border-border hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {renderStars(review.rating)}
                    </div>
                    <blockquote className="text-muted-foreground mb-6 leading-relaxed">
                      <span data-editable={`reviews[${originalIndex}].review`}>
                        "{review.review}"
                      </span>
                    </blockquote>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage 
                          src={review.avatar} 
                          alt={review.name}
                        />
                        <AvatarFallback className="bg-muted text-muted-foreground font-medium">
                          {review.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-foreground text-sm">
                          <span data-editable={`reviews[${originalIndex}].name`}>
                            {review.name}
                          </span>
                        </div>
                        <div className="text-muted-foreground text-xs">
                          <span data-editable={`reviews[${originalIndex}].title`}>
                            {review.title}
                          </span>
                          {' at '}
                          <span data-editable={`reviews[${originalIndex}].company`}>
                            {review.company}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}