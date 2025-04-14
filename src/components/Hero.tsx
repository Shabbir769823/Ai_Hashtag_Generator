
import React from 'react';
import { Sparkles } from 'lucide-react';

interface HeroProps {
  scrollToForm: () => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToForm }) => {
  return (
    <div className="w-full py-16 md:py-24 px-4 flex flex-col items-center text-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted mb-8">
        <Sparkles size={18} className="text-primary" />
        <span className="text-sm font-medium">Boost your social media presence</span>
      </div>
      
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Generate Perfect <span className="gradient-text">Hashtags</span> for Any Topic
      </h1>
      
      <p className="text-lg text-muted-foreground max-w-2xl mb-8">
        Instantly create relevant, trending hashtags to increase your content's reach and engagement across all social media platforms.
      </p>
      
      <button 
        onClick={scrollToForm}
        className="gradient-bg text-white px-8 py-3 rounded-full font-medium 
                   hover:opacity-90 transition-all shadow-lg hover:shadow-xl
                   flex items-center gap-2"
      >
        Get Started
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
};

export default Hero;
