'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Shield, 
  Zap, 
  BarChart3, 
  Clock, 
  Users, 
  CheckCircle, 
  Globe,
  Brain,
  Lock,
  Smartphone,
  Database
} from 'lucide-react';
import { useState, useEffect } from 'react';

const DEFAULT_FEATURES = {
  sectionTitle: 'Powerful Features for Modern Finance',
  sectionSubtitle: 'Everything you need to streamline your financing decisions and accelerate business growth',
  features: [
    {
      icon: Brain,
      title: 'AI-Powered Risk Assessment',
      description: 'Advanced machine learning algorithms analyze creditworthiness and risk factors in real-time, providing accurate scoring within seconds.',
      category: 'AI & Analytics'
    },
    {
      icon: Zap,
      title: 'Instant Decision Engine',
      description: 'Automated approval workflows that reduce processing time from days to minutes, enabling faster business decisions.',
      category: 'Automation'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade encryption, SOC 2 compliance, and multi-factor authentication ensure your financial data stays protected.',
      category: 'Security'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics Dashboard',
      description: 'Comprehensive reporting and analytics with customizable dashboards to track performance and identify trends.',
      category: 'Analytics'
    },
    {
      icon: Database,
      title: 'Seamless Integrations',
      description: 'Connect with 100+ financial institutions, accounting software, and CRM systems through our robust API.',
      category: 'Integration'
    },
    {
      icon: Clock,
      title: 'Real-Time Monitoring',
      description: 'Continuous monitoring of market conditions, regulatory changes, and portfolio performance with instant alerts.',
      category: 'Monitoring'
    },
    {
      icon: Users,
      title: 'Multi-User Collaboration',
      description: 'Team-based workflows with role-based permissions, approval chains, and collaborative decision-making tools.',
      category: 'Collaboration'
    },
    {
      icon: Smartphone,
      title: 'Mobile-First Design',
      description: 'Full-featured mobile app with offline capabilities, ensuring you can manage finances anywhere, anytime.',
      category: 'Mobile'
    },
    {
      icon: CheckCircle,
      title: 'Compliance Management',
      description: 'Automated compliance checks, regulatory reporting, and audit trails to meet industry standards effortlessly.',
      category: 'Compliance'
    }
  ],
  categories: ['All', 'AI & Analytics', 'Automation', 'Security', 'Integration'],
  statsTitle: 'Trusted by Industry Leaders',
  stats: [
    { number: '500+', label: 'Financial Institutions' },
    { number: '75%', label: 'Faster Approvals' },
    { number: '99.9%', label: 'Uptime Guarantee' },
    { number: '$2B+', label: 'Loans Processed' }
  ]
} as const;

type FeaturesProps = Partial<typeof DEFAULT_FEATURES>;

export default function Features(props: FeaturesProps) {
  const config = { ...DEFAULT_FEATURES, ...props };
  const [activeCategory, setActiveCategory] = useState('All');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredFeatures = activeCategory === 'All' 
    ? config.features 
    : config.features.filter(feature => feature.category === activeCategory);

  return (
    <section id="features" className="bg-muted/30 text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span data-editable="sectionTitle">{config.sectionTitle}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              <span data-editable="sectionSubtitle">{config.sectionSubtitle}</span>
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {config.categories.map((category, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-background text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <span data-editable={`categories[${idx}]`}>{category}</span>
              </button>
            ))}
          </div>

          {/* Features Grid */}
          <div 
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {filteredFeatures.map((feature, idx) => {
              const IconComponent = feature.icon;
              return (
                <Card 
                  key={idx} 
                  className="bg-card border-border hover:shadow-lg transition-all duration-300 hover:scale-105 group"
                >
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <Badge variant="secondary" className="text-xs mb-3">
                        <span data-editable={`features[${idx}].category`}>{feature.category}</span>
                      </Badge>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      <span data-editable={`features[${idx}].title`}>{feature.title}</span>
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      <span data-editable={`features[${idx}].description`}>{feature.description}</span>
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Stats Section */}
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">
                <span data-editable="statsTitle">{config.statsTitle}</span>
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {config.stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    <span data-editable={`stats[${idx}].number`}>{stat.number}</span>
                  </div>
                  <div className="text-muted-foreground font-medium">
                    <span data-editable={`stats[${idx}].label`}>{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}