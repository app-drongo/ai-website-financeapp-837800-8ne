'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, TrendingUp, Shield, Zap, BarChart3 } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';
import { useState, useEffect } from 'react';

const DEFAULT_HERO = {
  headline: 'Accelerate Your Financing Decisions with AI-Powered Insights',
  subheadline:
    'Transform complex financial data into actionable intelligence. Our SaaS platform helps businesses and financial professionals make faster, smarter financing decisions with automated risk assessment and real-time market analysis.',
  ctaText: 'Start Free Trial',
  ctaHref: '/signup',
  secondaryCtaText: 'Watch Demo',
  secondaryCtaHref: '/demo',
  keyBenefits: [
    'Reduce approval time by 75%',
    'Automated risk scoring',
    'Real-time compliance monitoring',
    'Seamless integration with existing systems',
  ],
  trustBadge: 'SOC 2 Compliant',
  statsLabel: 'Trusted by 500+ financial institutions',
} as const;

type HeroProps = Partial<typeof DEFAULT_HERO>;

export default function Hero(props: HeroProps) {
  const config = { ...DEFAULT_HERO, ...props };
  const navigate = useSmartNavigation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handlePrimaryCTA = () => {
    navigate(config.ctaHref);
  };

  const handleSecondaryCTA = () => {
    navigate(config.secondaryCtaHref);
  };

  const benefitIcons = [TrendingUp, Shield, Zap, BarChart3];

  return (
    <section id="hero" className="bg-background text-foreground py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="mb-6">
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
              >
                <Shield className="w-3 h-3 mr-1" />
                <span data-editable="trustBadge">{config.trustBadge}</span>
              </Badge>
            </div>

            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <span
                data-editable="headline"
                className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent"
              >
                {config.headline}
              </span>
            </h1>

            <p
              className={`text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <span data-editable="subheadline">{config.subheadline}</span>
            </p>

            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <Button
                size="lg"
                onClick={handlePrimaryCTA}
                data-editable-href="ctaHref"
                data-href={config.ctaHref}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span data-editable="ctaText">{config.ctaText}</span>
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleSecondaryCTA}
                data-editable-href="secondaryCtaHref"
                data-href={config.secondaryCtaHref}
                className="border-border text-foreground hover:bg-accent hover:text-accent-foreground px-8 py-6 text-lg font-semibold rounded-lg transition-all duration-200 hover:scale-105"
              >
                <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
              </Button>
            </div>
          </div>

          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {config.keyBenefits.map((benefit, idx) => {
              const IconComponent = benefitIcons[idx] || TrendingUp;
              return (
                <Card
                  key={idx}
                  className="bg-card text-card-foreground border-border hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <CardContent className="p-6 text-center">
                    <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <p className="font-medium text-sm">
                      <span data-editable={`keyBenefits[${idx}]`}>{benefit}</span>
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div
            className={`text-center transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <p className="text-muted-foreground text-sm font-medium">
              <span data-editable="statsLabel">{config.statsLabel}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
