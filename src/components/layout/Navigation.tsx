'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_NAVIGATION = {
  brand: 'FinanceApp',
  brandHref: '/',
  navItems: [
    { label: 'Home', href: '/' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'Contact', href: '/contact' },
  ],
  ctaText: 'Get Started',
  ctaHref: '/signup',
} as const;

type NavigationProps = Partial<typeof DEFAULT_NAVIGATION>;

export default function Navigation(props: NavigationProps) {
  const config = { ...DEFAULT_NAVIGATION, ...props };
  const navigate = useSmartNavigation();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (href: string) => {
    navigate(href);
    setIsOpen(false);
  };

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <div className="flex-shrink-0">
            <button
              onClick={() => handleNavClick(config.brandHref)}
              className="text-xl font-bold text-foreground hover:text-primary transition-colors"
              data-editable-href="brandHref"
              data-href={config.brandHref}
            >
              <span data-editable="brand">{config.brand}</span>
            </button>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:block flex-1">
            <div className="flex items-center justify-center space-x-8">
              {config.navItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleNavClick(item.href)}
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                  data-editable-href={`navItems[${idx}].href`}
                  data-href={item.href}
                >
                  <span data-editable={`navItems[${idx}].label`}>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button
              onClick={() => handleNavClick(config.ctaHref)}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-editable-href="ctaHref"
              data-href={config.ctaHref}
            >
              <span data-editable="ctaText">{config.ctaText}</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-border/40">
              {config.navItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                  data-editable-href={`navItems[${idx}].href`}
                  data-href={item.href}
                >
                  <span data-editable={`navItems[${idx}].label`}>{item.label}</span>
                </button>
              ))}
              <div className="pt-4">
                <Button
                  onClick={() => handleNavClick(config.ctaHref)}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  data-editable-href="ctaHref"
                  data-href={config.ctaHref}
                >
                  <span data-editable="ctaText">{config.ctaText}</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}