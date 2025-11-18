import React, { useEffect, useRef, useState } from 'react';
import GlareHover from '@/components/ui/card';

interface ResultSectionProps {
  results?: any[];
  isLoading?: boolean;
  searchMethod?: 'tfidf' | 'jaccard' | 'hybrid';
  hasSearched?: boolean;
}

// Function to parse markdown-like text and convert to JSX
const parseMarkdownText = (text: string) => {
  if (!text) return '';
  
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|~~[^~]+~~|__[^_]+__|_[^_]+_)/);
  
  return parts.map((part, index) => {
    // Bold: **text** or __text__
    if ((part.startsWith('**') && part.endsWith('**')) || (part.startsWith('__') && part.endsWith('__'))) {
      const content = part.startsWith('**') ? part.slice(2, -2) : part.slice(2, -2);
      return <strong key={index} style={{ fontWeight: 'bold' }}>{content}</strong>;
    }
    // Italic: *text* or _text_
    else if ((part.startsWith('*') && part.endsWith('*')) || (part.startsWith('_') && part.endsWith('_'))) {
      const content = part.slice(1, -1);
      return <em key={index} style={{ fontStyle: 'italic' }}>{content}</em>;
    }
    // Strikethrough: ~~text~~
    else if (part.startsWith('~~') && part.endsWith('~~')) {
      const content = part.slice(2, -2);
      return <del key={index} style={{ textDecoration: 'line-through' }}>{content}</del>;
    }
    // Regular text
    else {
      return part;
    }
  });
};

const ResultSection: React.FC<ResultSectionProps> = ({ results = [], isLoading = false, searchMethod = 'hybrid', hasSearched = false }) => {
    const defaultMessageRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -10% 0px'
            }
        );

        if (defaultMessageRef.current) {
            observer.observe(defaultMessageRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    // Use search results if available, otherwise show nothing
    let displayData = results;
    
    // Sort by score based on selected method (highest first)
    if (results.length > 0) {
        displayData = [...displayData].sort((a, b) => {
            let scoreA = 0;
            let scoreB = 0;
            
            // Use appropriate score based on search method
            if (searchMethod === 'tfidf') {
                scoreA = a.tfidf_score || 0;
                scoreB = b.tfidf_score || 0;
            } else if (searchMethod === 'jaccard') {
                scoreA = a.jaccard_score || 0;
                scoreB = b.jaccard_score || 0;
            } else {
                // hybrid - use combined score
                scoreA = a.score || 0;
                scoreB = b.score || 0;
            }
            
            return scoreB - scoreA;
        });
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center my-20">
                <div 
                    className="text-white/50 text-xl font-michroma"
                    style={{
                        animation: 'pulse 1.5s ease-in-out infinite',
                    }}
                >
                    Mencari...
                </div>
            </div>
        );
    }

    // Show default message if no search has been performed
    if (!hasSearched) {
        return (
            <div 
                ref={defaultMessageRef}
                className="flex justify-center items-center my-20"
            >
                <div 
                    className="text-white/50 text-xl font-michroma"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
                    }}
                >
                    Hasil akan muncul disini
                </div>
            </div>
        );
    }

    // Show no results message if search returned empty
    if (displayData.length === 0) {
        return (
            <div className="flex justify-center items-center my-20">
                <div 
                    className="text-white/50 text-xl font-michroma"
                    style={{
                        animation: 'fadeInUp 0.8s ease-out',
                    }}
                >
                    Tidak ada hasil ditemukan
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-15 lg:mb-25 z-30">
                {displayData.map((item, index) => (
                    <div key={index} className={`flex justify-center ${index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'}`} style={{ position: 'relative' }}>
                        <div className="relative">
                            {/* Score Badge - Top Right */}
                            {(item.tfidf_score !== undefined || item.jaccard_score !== undefined || item.score !== undefined) && (
                                <div className="absolute top-2 right-2 lg:top-6 lg:right-6 z-[110] flex gap-2">
                                    {/* Method Badge - always show if available */}
                                    {/* {item.method && (
                                        <div className="bg-gradient-to-r from-[#8f5bff]/90 to-[#4A9DE3]/90 backdrop-blur-md text-center px-3 py-1 lg:px-5 lg:py-2 rounded-full border border-white/30">
                                            <span className="text-white text-xs lg:text-base font-semibold" style={{ fontFamily: "'Michroma', monospace" }}>
                                                {item.method}
                                            </span>
                                        </div>
                                    )}
                                    */}
                                    {/* Show scores based on selected method */}
                                    {searchMethod === 'hybrid' && (
                                        <>
                                            {item.tfidf_score !== undefined && (
                                                <div className="bg-black/50 backdrop-blur-md px-3 py-1 lg:px-5 lg:py-2 rounded-lg border border-[#4A9DE3]/50">
                                                    <span className="text-[#4A9DE3] text-xs lg:text-base font-semibold">TF-IDF: </span>
                                                    <span className="text-white text-xs lg:text-base font-bold">{(item.tfidf_score * 100).toFixed(1)}%</span>
                                                </div>
                                            )}
                                            {item.jaccard_score !== undefined && (
                                                <div className="bg-black/50 backdrop-blur-md px-3 py-1 lg:px-5 lg:py-2 rounded-lg border border-[#8f5bff]/50">
                                                    <span className="text-[#8f5bff] text-xs lg:text-base font-semibold">Jaccard: </span>
                                                    <span className="text-white text-xs lg:text-base font-bold">{(item.jaccard_score * 100).toFixed(1)}%</span>
                                                </div>
                                            )}
                                            {item.score !== undefined && (
                                                <div className="bg-gradient-to-r from-[#8f5bff]/40 to-[#4A9DE3]/40 backdrop-blur-md px-3 py-1 lg:px-5 lg:py-2 rounded-lg border border-white/50">
                                                    <span className="text-white text-xs lg:text-base font-semibold">Hybrid: </span>
                                                    <span className="text-white text-xs lg:text-base font-bold">{(item.score * 100).toFixed(1)}%</span>
                                                </div>
                                            )}
                                        </>
                                    )}
                                    
                                    {searchMethod === 'tfidf' && item.tfidf_score !== undefined && (
                                        <div className="bg-black/50 backdrop-blur-md px-3 py-1 lg:px-5 lg:py-2 rounded-lg border border-[#4A9DE3]/50">
                                            <span className="text-[#4A9DE3] text-xs lg:text-base font-semibold">TF-IDF: </span>
                                            <span className="text-white text-xs lg:text-base font-bold">{(item.tfidf_score * 100).toFixed(1)}%</span>
                                        </div>
                                    )}
                                    
                                    {searchMethod === 'jaccard' && item.jaccard_score !== undefined && (
                                        <div className="bg-black/50 backdrop-blur-md px-3 py-1 lg:px-5 lg:py-2 rounded-lg border border-[#8f5bff]/50">
                                            <span className="text-[#8f5bff] text-xs lg:text-base font-semibold">Jaccard: </span>
                                            <span className="text-white text-xs lg:text-base font-bold">{(item.jaccard_score * 100).toFixed(1)}%</span>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Text overlay */}
                            <div className="absolute inset-0 flex flex-col justify-center m-4 sm:m-6 md:m-8 lg:mx-12 lg:my-20 text-left z-100">
                                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl" style={{
                                    fontWeight: '900',
                                    color: '#ffffff',
                                    margin: '0 0px 12px 0',
                                    fontFamily: "'Michroma', monospace",
                                    textShadow: '2px 2px 8px rgba(0,0,0,0.8)'
                                    }}>
                                    {item.title || item.judul}
                                </h3>
                                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl" style={{
                                    color: '#ffffff',
                                    marginRight: '12rem',
                                    lineHeight: 1.4,
                                    opacity: 0.9,
                                    textShadow: '1px 1px 4px rgba(0,0,0,0.8)',
                                    overflow: 'hidden',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 4,
                                    WebkitBoxOrient: 'vertical'
                                    }}>
                                    {parseMarkdownText(item.description || item.isi || item.content || '')}
                                </p>

                                <button className="mt-4 sm:mt-6 md:mt-8 px-6 sm:px-8 md:px-10 py-2 bg-gradient-to-r from-[#8f5bff] to-[#4A9DE3] border border-white/50 text-white rounded-lg font-medium w-fit hover:cursor-pointer hover:bg-[#4A9DE3] hover:scale-110 transition-all duration-300 text-xs sm:text-sm md:text-base">
                                    Selengkapnya
                                </button>
                            </div>
                            <GlareHover
                                glareColor="#ffffff"
                                glareOpacity={0.3}
                                glareAngle={-30}
                                glareSize={300}
                                transitionDuration={800}
                                playOnce={false}
                            >
                                <img 
                                src={item.poster} 
                                alt={item.title || item.judul}
                                style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                }}
                            />

                            {/* Dark overlay for better text readability */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a14]/90 to-transparent hover:cursor-pointer"></div>

                            </GlareHover>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResultSection;