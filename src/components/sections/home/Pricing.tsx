'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_PRICING = {
  sectionTitle: 'Choose Your Plan',
  sectionSubtitle: 'Flexible pricing designed to scale with your business needs',
  billingToggle: true,
  plans: [
    {
      name: 'Starter',
      description: 'Perfect for small businesses getting started with financing automation',
      monthlyPrice: 49,
      yearlyPrice: 490,
      features: [
        'Up to 50 loan applications per month',
        'Basic credit scoring',
        'Email support',
        'Standard reporting',
        'API access',
      ],
      popular: false,
      ctaText: 'Start Free Trial',
      ctaHref: '/signup?plan=starter',
    },
    {
      name: 'Professional',
      description: 'Advanced features for growing businesses with complex financing needs',
      monthlyPrice: 149,
      yearlyPrice: 1490,
      features: [
        'Up to 500 loan applications per month',
        'Advanced AI credit scoring',
        'Priority support',
        'Custom reporting & analytics',
        'Full API access',
        'Risk assessment tools',
        'Automated decision workflows',
      ],
      popular: true,
      ctaText: 'Start Free Trial',
      ctaHref: '/signup?plan=professional',
    },
    {
      name: 'Enterprise',
      description: 'Complete solution for large organizations with custom requirements',
      monthlyPrice: 499,
      yearlyPrice: 4990,
      features: [
        'Unlimited loan applications',
        'Custom AI model training',
        'Dedicated account manager',
        'White-label solutions',
        'Advanced integrations',
        'Compliance management',
        'Custom workflows',
        'SLA guarantees',
      ],
      popular: false,
      ctaText: 'Contact Sales',
      ctaHref: '/contact?plan=enterprise',
    },
  ],
  guarantee: '30-day money-back guarantee',
  additionalInfo: 'All plans include free onboarding and training sessions',
} as const;

type PricingProps = Partial<typeof DEFAULT_PRICING>;

export default function Pricing(props: PricingProps) {
  const config = { ...DEFAULT_PRICING, ...props };
  const navigate = useSmartNavigation();
  const [isYearly, setIsYearly] = useState(true);

  const handlePlanSelect = (href: string) => {
    navigate(href);
  };

  return (
    <section id="pricing" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span data-editable="sectionTitle">{config.sectionTitle}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <span data-editable="sectionSubtitle">{config.sectionSubtitle}</span>
          </p>

          {/* Billing Toggle */}
          {config.billingToggle && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <span
                className={`text-sm ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}
              >
                Monthly
              </span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isYearly ? 'bg-primary' : 'bg-muted'
                }`}
                role="switch"
                aria-checked={isYearly}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                    isYearly ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
                Yearly
                <Badge variant="secondary" className="ml-2">
                  Save 17%
                </Badge>
              </span>
            </div>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
          {config.plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`relative ${
                plan.popular
                  ? 'border-primary bg-card shadow-lg scale-105'
                  : 'border-border bg-card'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <h3 className="text-xl font-semibold mb-2">
                  <span data-editable={`plans[${idx}].name`}>{plan.name}</span>
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  <span data-editable={`plans[${idx}].description`}>{plan.description}</span>
                </p>

                <div className="mb-4">
                  <span className="text-4xl font-bold">
                    ${isYearly ? Math.floor(plan.yearlyPrice / 12) : plan.monthlyPrice}
                  </span>
                  <span className="text-muted-foreground">/month</span>
                  {isYearly && (
                    <div className="text-sm text-muted-foreground mt-1">
                      Billed annually (${plan.yearlyPrice})
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        <span data-editable={`plans[${idx}].features[${featureIdx}]`}>
                          {feature}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handlePlanSelect(plan.ctaHref)}
                  className={`w-full ${
                    plan.popular
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
                  }`}
                  data-editable-href={`plans[${idx}].ctaHref`}
                  data-href={plan.ctaHref}
                >
                  <span data-editable={`plans[${idx}].ctaText`}>{plan.ctaText}</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer Info */}
        <div className="text-center mt-16 space-y-2">
          <p className="text-sm text-muted-foreground">
            <span data-editable="guarantee">{config.guarantee}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            <span data-editable="additionalInfo">{config.additionalInfo}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
