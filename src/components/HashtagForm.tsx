
import React, { useState, useRef } from 'react';
import { Search, Key, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HashtagFormProps {
  onGenerate: (topic: string, apiKey?: string) => void;
  isLoading: boolean;
}

const HashtagForm: React.FC<HashtagFormProps> = ({ onGenerate, isLoading }) => {
  const [topic, setTopic] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onGenerate(topic.trim(), apiKey.trim() || undefined);
    } else {
      inputRef.current?.focus();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 md:p-8 bg-white rounded-2xl shadow-lg">
      <h2 className="text-xl md:text-2xl font-bold mb-6">Find the perfect hashtags</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Input
            ref={inputRef}
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a topic (e.g., travel, food, fashion)"
            className="w-full px-4 py-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            disabled={isLoading}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="text-sm text-primary flex items-center gap-1 hover:underline"
            onClick={() => setShowApiKey(!showApiKey)}
          >
            <Key size={16} />
            {showApiKey ? 'Hide API Key' : 'Use API Key'}
          </button>
          
          {showApiKey && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info size={16} className="text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-xs">
                    Using an API key provides more accurate, trendy, and niche hashtags. 
                    Sign up at hashtaggenerator.app to get your API key.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        
        {showApiKey && (
          <div className="relative">
            <Input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API key"
              className="w-full px-4 py-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              disabled={isLoading}
            />
            <Key className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        )}
        
        <button
          type="submit"
          className={cn(
            "w-full gradient-bg text-white py-3 rounded-lg font-medium transition-all",
            isLoading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
          )}
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate Hashtags'}
        </button>
      </form>
      
      <div className="mt-6 text-sm text-muted-foreground">
        <p>Examples: photography, digital marketing, vegan cooking, travel europe</p>
        {showApiKey && (
          <div className="mt-2 rounded-md p-2 bg-muted/30">
            {!apiKey.trim() ? (
              <p className="text-xs text-muted-foreground">
                No API key provided - will use local generation with limited features.
              </p>
            ) : (
              <p className="text-xs text-primary">
                Using API key for enhanced hashtag generation with trending and niche tags.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HashtagForm;
