'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useFormSubmit } from '@/hooks/useFormSubmit';
import { useState } from 'react';

const DEFAULT_CONTACT = {
  sectionTitle: 'Get in Touch',
  sectionSubtitle: 'Have questions about our financing solutions? We\'re here to help you make the right decision for your business.',
  contactInfo: [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'support@financeapp.com',
      description: 'Send us an email anytime'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      description: 'Mon-Fri from 8am to 6pm EST'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: '123 Finance Street, Suite 100',
      description: 'New York, NY 10001'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Monday - Friday',
      description: '8:00 AM - 6:00 PM EST'
    }
  ],
  formTitle: 'Send us a Message',
  formDescription: 'Fill out the form below and we\'ll get back to you within 24 hours.',
} as const;

type ContactProps = Partial<typeof DEFAULT_CONTACT>;

export default function Contact(props: ContactProps) {
  const config = { ...DEFAULT_CONTACT, ...props };
  const { handleSubmit, isSubmitting, isSuccess, message } = useFormSubmit();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    await handleSubmit(e);
    if (isSuccess) {
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      });
    }
  };

  return (
    <section id="contact" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span data-editable="sectionTitle">{config.sectionTitle}</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              <span data-editable="sectionSubtitle">{config.sectionSubtitle}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {config.contactInfo.map((info, idx) => {
                    const IconComponent = info.icon;
                    return (
                      <Card key={idx} className="bg-card border-border">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="bg-primary/10 p-3 rounded-lg">
                              <IconComponent className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold mb-1">
                                <span data-editable={`contactInfo[${idx}].title`}>{info.title}</span>
                              </h3>
                              <p className="text-foreground font-medium mb-1">
                                <span data-editable={`contactInfo[${idx}].details`}>{info.details}</span>
                              </p>
                              <p className="text-muted-foreground text-sm">
                                <span data-editable={`contactInfo[${idx}].description`}>{info.description}</span>
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    <span data-editable="formTitle">{config.formTitle}</span>
                  </CardTitle>
                  <p className="text-muted-foreground">
                    <span data-editable="formDescription">{config.formDescription}</span>
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={onSubmit} data-form-id="contact" className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Your Company"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        placeholder="How can we help you?"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        placeholder="Tell us more about your financing needs..."
                        className="min-h-32"
                      />
                    </div>

                    {message && (
                      <div className={`p-4 rounded-md ${
                        isSuccess 
                          ? 'bg-green-50 text-green-800 border border-green-200' 
                          : 'bg-red-50 text-red-800 border border-red-200'
                      }`}>
                        {message}
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}