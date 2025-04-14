
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-10 px-4 mt-20 border-t">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <span className="text-xl font-bold gradient-text">#HashGen</span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Hashtag Generator. All rights reserved.
          </div>
          
          <div className="flex gap-4">
            <a href="#" className="text-sm hover:text-primary">About</a>
            <a href="#" className="text-sm hover:text-primary">Privacy</a>
            <a href="#" className="text-sm hover:text-primary">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
