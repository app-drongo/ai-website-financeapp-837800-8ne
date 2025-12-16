'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Circle, Twitter, Youtube } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FOOTER = {
  companyName: 'FinanceApp',
  tagline: 'Streamline your financing decisions with intelligent automation and real-time insights',
  companyLinks: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
  ],
  legalLinks: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
  socialLinks: [
    { platform: 'LinkedIn', href: 'https://linkedin.com/company/financeapp', icon: 'linkedin' },
    { platform: 'Twitter', href: 'https://twitter.com/financeapp', icon: 'twitter' },
  ],
  copyrightText: '© 2024 FinanceApp. All rights reserved.',
  contactEmail: 'hello@financeapp.com',
  supportEmail: 'support@financeapp.com',
} as const;

type FooterProps = Partial<typeof DEFAULT_FOOTER>;

export default function Footer(props: FooterProps) {
  const config = { ...DEFAULT_FOOTER, ...props };
  const navigate = useSmartNavigation();

  const handleLinkClick = (href: string) => {
    if (href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      navigate(href);
    }
  };

  const getSocialIcon = (iconType: string) => {
    switch (iconType) {
      case 'linkedin':
        return <Circle className="h-5 w-5" />;
      case 'twitter':
        return <Twitter className="h-5 w-5" />;
      case 'youtube':
        return <Youtube className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <section id="footer" className="bg-background text-foreground border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-foreground">
                <span data-editable="companyName">{config.companyName}</span>
              </h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-md">
              <span data-editable="tagline">{config.tagline}</span>
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {config.socialLinks.map((social, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  size="sm"
                  className="h-10 w-10 p-0 hover:bg-accent hover:text-accent-foreground"
                  onClick={() => handleLinkClick(social.href)}
                  data-editable-href={`socialLinks[${idx}].href`}
                  data-href={social.href}
                  aria-label={`Visit our ${social.platform} page`}
                >
                  {getSocialIcon(social.icon)}
                </Button>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <nav className="space-y-3">
              {config.companyLinks.map((link, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground justify-start font-normal"
                  onClick={() => handleLinkClick(link.href)}
                  data-editable-href={`companyLinks[${idx}].href`}
                  data-href={link.href}
                >
                  <span data-editable={`companyLinks[${idx}].label`}>{link.label}</span>
                </Button>
              ))}
            </nav>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <nav className="space-y-3">
              {config.legalLinks.map((link, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground justify-start font-normal"
                  onClick={() => handleLinkClick(link.href)}
                  data-editable-href={`legalLinks[${idx}].href`}
                  data-href={link.href}
                >
                  <span data-editable={`legalLinks[${idx}].label`}>{link.label}</span>
                </Button>
              ))}
            </nav>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
            <div>
              Contact:
              <Button
                variant="link"
                className="h-auto p-0 ml-1 text-sm text-muted-foreground hover:text-foreground"
                onClick={() => (window.location.href = `mailto:${config.contactEmail}`)}
              >
                <span data-editable="contactEmail">{config.contactEmail}</span>
              </Button>
            </div>
            <div>
              Support:
              <Button
                variant="link"
                className="h-auto p-0 ml-1 text-sm text-muted-foreground hover:text-foreground"
                onClick={() => (window.location.href = `mailto:${config.supportEmail}`)}
              >
                <span data-editable="supportEmail">{config.supportEmail}</span>
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            <span data-editable="copyrightText">{config.copyrightText}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
