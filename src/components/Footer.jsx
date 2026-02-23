import React from 'react';
import { Coffee, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-chai-brown text-milk-cream mt-12 py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-2">
          <Coffee className="w-5 h-5" />
          <span className="text-sm font-medium">
            Powered by Chai ☕ Hosted on GitHub Stall
          </span>
          <Github className="w-5 h-5" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
