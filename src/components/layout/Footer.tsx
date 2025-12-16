'use client';

import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FOOTER = {
  brand: 'FinanceApp',
  brandHref: '/',
  description: 'Accelerate your financing decisions with AI-powered insights and automated risk assessment.',
  links: [
    {
      title: 'Product',
      items: [
        { label: 'Features', href: '/#features' },
        { label: 'Pricing', href: '/#pricing' },
        { label: 'API', href: '/api' },
        { label: 'Documentation', href: '/docs' },
      ],
    },
    {
      title: 'Company',
      items: [
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Careers', href: '/careers' },
        { label: 'Blog', href: '/blog' },
      ],
    },
    {
      title: 'Support',
      items: [
        { label: 'Help Center', href: '/help' },
        { label: 'Community', href: '/community' },
        { label: 'Status', href: '/status' },
        { label: 'Contact Support', href: '/contact' },
      ],
    },
    {
      title: 'Legal',
      items: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
        { label: 'Security', href: '/security' },
      ],
    },
  ],
  socialLinks: [
    { label: 'Twitter', href: 'https://twitter.com/financeapp' },
    { label: 'LinkedIn', href: 'https://linkedin.com/company/financeapp' },
    { label: 'GitHub', href: 'https://github.com/financeapp' },
  ],
  copyright: '© 2024 FinanceApp. All rights reserved.',
} as const;

type FooterProps = Partial<typeof DEFAULT_FOOTER>;

export default function Footer(props: FooterProps) {
  const config = { ...DEFAULT_FOOTER, ...props };
  const navigate = useSmartNavigation();

  const handleLinkClick = (href: string) => {
    navigate(href);
  };

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <button
              onClick={() => handleLinkClick(config.brandHref)}
              className="text-xl font-bold text-foreground hover:text-primary transition-colors mb-4 block"
              data-editable-href="brandHref"
              data-href={config.brandHref}
            >
              <span data-editable="brand">{config.brand}</span>
            </button>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              <span data-editable="description">{config.description}</span>
            </p>
          </div>

          {/* Links Sections */}
          {config.links.map((section, sectionIdx) => (
            <div key={sectionIdx} className="">
              <h3 className="font-semibold text-foreground mb-4">
                <span data-editable={`links[${sectionIdx}].title`}>{section.title}</span>
              </h3>
              <ul className="space-y-3">
                {section.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <button
                      onClick={() => handleLinkClick(item.href)}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                      data-editable-href={`links[${sectionIdx}].items[${itemIdx}].href`}
                      data-href={item.href}
                    >
                      <span data-editable={`links[${sectionIdx}].items[${itemIdx}].label`}>
                        {item.label}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            <span data-editable="copyright">{config.copyright}</span>
          </p>
          
          {/* Social Links */}
          <div className="flex space-x-6 mt-4 sm:mt-0">
            {config.socialLinks.map((social, idx) => (
              <button
                key={idx}
                onClick={() => handleLinkClick(social.href)}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                data-editable-href={`socialLinks[${idx}].href`}
                data-href={social.href}
              >
                <span data-editable={`socialLinks[${idx}].label`}>{social.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}