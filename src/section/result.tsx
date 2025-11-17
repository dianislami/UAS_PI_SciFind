import React from 'react';
import GlareHover from '@/components/ui/card';
import filmData from '@/data.json';

// Function to parse markdown-like text and convert to JSX
const parseMarkdownText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|~~.*?~~|__.*?__|_.*?_)/);
  
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

const ResultSection: React.FC = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-auto my-10 z-30">
            <div className="flex justify-center lg:justify-end" style={{ position: 'relative' }}>
                <div className="relative">
                    {/* Text overlay */}
                    <div className="absolute inset-0 flex flex-col justify-center m-4 sm:m-6 md:m-8 lg:mx-12 lg:my-20 text-left z-100">
                        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl" style={{
                            fontWeight: '900',
                            color: '#ffffff',
                            margin: '0 0 12px 0',
                            fontFamily: "'Michroma', monospace",
                            textShadow: '2px 2px 8px rgba(0,0,0,0.8)'
                            }}>
                            {filmData[0].judul}
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
                            {parseMarkdownText(filmData[0].isi)}
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
                        src={filmData[0].poster} 
                        alt={filmData[0].judul}
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
            
            <div className="flex justify-center lg:justify-start" style={{ position: 'relative' }}>
                <div className="relative">
                    {/* Text overlay */}
                    <div className="absolute inset-0 flex flex-col justify-center m-4 sm:m-6 md:m-8 lg:mx-12 lg:my-20 text-left z-100">
                        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl" style={{
                            fontWeight: '900',
                            color: '#ffffff',
                            margin: '0 0 12px 0',
                            fontFamily: "'Michroma', monospace",
                            textShadow: '2px 2px 8px rgba(0,0,0,0.8)'
                            }}>
                            {filmData[1].judul}
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
                            {parseMarkdownText(filmData[1].isi)}
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
                        src={filmData[1].poster} 
                        alt={filmData[1].judul}
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
        </div>
    );
};

export default ResultSection;