import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { AnimatedSection } from '../ui/AnimatedSection';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { TextArea } from '../ui/TextArea';

export const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, you would handle form submission
    alert('Message sent! (This is a demo - no actual message was sent)');
  };
  
  return (
    <AnimatedSection id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a project in mind or want to discuss a potential collaboration? Feel free to reach out!
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact form */}
          <div className="bg-gray-50 rounded-lg p-8 shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Me a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  type="text"
                  id="name"
                  name="name"
                  label="Your Name"
                  placeholder="John Doe"
                  required
                  fullWidth
                />
                <Input
                  type="email"
                  id="email"
                  name="email"
                  label="Your Email"
                  placeholder="john@example.com"
                  required
                  fullWidth
                />
              </div>
              <Input
                type="text"
                id="subject"
                name="subject"
                label="Subject"
                placeholder="Project Inquiry"
                required
                fullWidth
              />
              <TextArea
                id="message"
                name="message"
                label="Message"
                placeholder="Tell me about your project..."
                rows={5}
                required
                fullWidth
              />
              <Button type="submit" fullWidth>
                Send Message
              </Button>
            </form>
          </div>
          
          {/* Contact information */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
            <div className="space-y-8">
              <div className="flex items-start">
                <Mail className="text-blue-600 mr-4 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                  <a href="mailto:contact@example.com" className="text-gray-600 hover:text-blue-600 transition-colors">
                    contact@example.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="text-blue-600 mr-4 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                  <a href="tel:+1234567890" className="text-gray-600 hover:text-blue-600 transition-colors">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="text-blue-600 mr-4 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Location</h4>
                  <p className="text-gray-600">San Francisco, California</p>
                </div>
              </div>
              
              {/* Social media links */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Follow Me</h4>
                <div className="flex space-x-4">
                  {['LinkedIn', 'GitHub', 'Twitter', 'Instagram'].map((platform) => (
                    <a
                      key={platform}
                      href="#"
                      className="bg-gray-200 hover:bg-blue-600 hover:text-white transition-colors px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {platform}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};