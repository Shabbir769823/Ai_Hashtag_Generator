
import React, { useState, useRef } from 'react';
import Hero from '@/components/Hero';
import HashtagForm from '@/components/HashtagForm';
import HashtagResults from '@/components/HashtagResults';
import Footer from '@/components/Footer';
import { generateHashtags } from '@/utils/hashtagGenerator';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleGenerateHashtags = async (inputTopic: string, apiKey?: string) => {
    setIsLoading(true);
    setTopic(inputTopic);
    
    try {
      // Call the generateHashtags function with optional API key
      const generatedHashtags = await generateHashtags(inputTopic, apiKey);
      setHashtags(generatedHashtags);
      
      if (apiKey) {
        toast({
          title: "Using API",
          description: "Hashtags generated using the provided API key",
        });
      } else {
        toast({
          description: "Using built-in hashtag generator (no API key)",
        });
      }
    } catch (error) {
      console.error('Error generating hashtags:', error);
      toast({
        title: "Error",
        description: "Failed to generate hashtags. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero scrollToForm={scrollToForm} />
        
        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Form Section */}
          <div ref={formRef} className="mb-8">
            <HashtagForm 
              onGenerate={handleGenerateHashtags} 
              isLoading={isLoading} 
            />
          </div>
          
          {/* Results Section */}
          {hashtags.length > 0 && (
            <HashtagResults 
              hashtags={hashtags} 
              topic={topic} 
            />
          )}
          
          {/* Features Section */}
          <div className="mt-24 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-12">
              Why Use Our <span className="gradient-text">Hashtag Generator</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl bg-white shadow-md">
                <div className="h-12 w-12 gradient-bg rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 10h7m-7 4h7m-7 4h7M7 4v16M4 7h6M4 17h6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Relevant Hashtags</h3>
                <p className="text-muted-foreground">Generate contextually relevant hashtags that boost your content's discoverability.</p>
              </div>
              
              <div className="p-6 rounded-xl bg-white shadow-md">
                <div className="h-12 w-12 gradient-bg rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.3 8H3.7C2.2 8 1 9.2 1 10.7v8.6c0 1.5 1.2 2.7 2.7 2.7h16.6c1.5 0 2.7-1.2 2.7-2.7v-8.6c0-1.5-1.2-2.7-2.7-2.7zM12 2L8 7h8l-4-5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Increase Reach</h3>
                <p className="text-muted-foreground">Expand your audience with optimized hashtags that help your content reach more people.</p>
              </div>
              
              <div className="p-6 rounded-xl bg-white shadow-md">
                <div className="h-12 w-12 gradient-bg rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Easy to Use</h3>
                <p className="text-muted-foreground">Simply enter your topic and instantly get a curated list of hashtags ready to copy and paste.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
