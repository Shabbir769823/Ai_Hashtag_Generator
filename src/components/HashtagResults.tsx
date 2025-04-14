
import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface HashtagResultsProps {
  hashtags: string[];
  topic: string;
}

const HashtagResults: React.FC<HashtagResultsProps> = ({ hashtags, topic }) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  if (!hashtags.length) return null;

  const allHashtagsText = hashtags.join(' ');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(allHashtagsText);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Hashtags copied to clipboard",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  const handleHashtagClick = (hashtag: string) => {
    navigator.clipboard.writeText(hashtag);
    toast({
      description: `${hashtag} copied to clipboard`,
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 p-6 md:p-8 bg-white rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold">{hashtags.length} Hashtags for "{topic}"</h2>
        
        <button
          onClick={copyToClipboard}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg border transition-all",
            copied 
              ? "bg-green-50 border-green-200 text-green-600" 
              : "hover:bg-muted/50"
          )}
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
          <span>{copied ? 'Copied!' : 'Copy All'}</span>
        </button>
      </div>
      
      <div className="p-4 bg-muted/30 rounded-lg mb-6 overflow-x-auto">
        <p className="text-sm whitespace-normal break-words">
          {allHashtagsText}
        </p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {hashtags.map((hashtag, index) => (
          <div 
            key={index}
            onClick={() => handleHashtagClick(hashtag)}
            className="hashtag-item"
            title={`Click to copy ${hashtag}`}
          >
            {hashtag}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HashtagResults;
