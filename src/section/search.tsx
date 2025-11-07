import React from 'react';
import { Search } from 'lucide-react';
import { ThreeDMarquee } from '@/components/ui/shadcn-io/3d-marquee';
import { ScrollVelocity } from '@/components/ui/shadcn-io/scroll-velocity';
import Animation from '@/section/animation';

const images = [
  "https://assets.aceternity.com/cloudinary_bkp/3d-card.png",
  "https://assets.aceternity.com/animated-modal.png",
  "https://assets.aceternity.com/animated-testimonials.webp",
  "https://assets.aceternity.com/cloudinary_bkp/Tooltip_luwy44.png",
  "https://assets.aceternity.com/github-globe.png",
  "https://assets.aceternity.com/glare-card.png",
  "https://assets.aceternity.com/layout-grid.png",
  "https://assets.aceternity.com/flip-text.png",
  "https://assets.aceternity.com/hero-highlight.png",
  "https://assets.aceternity.com/carousel.webp",
  "https://assets.aceternity.com/placeholders-and-vanish-input.png",
  "https://assets.aceternity.com/shooting-stars-and-stars-background.png",
  "https://assets.aceternity.com/signup-form.png",
  "https://assets.aceternity.com/cloudinary_bkp/stars_sxle3d.png",
  "https://assets.aceternity.com/spotlight-new.webp",
  "https://assets.aceternity.com/cloudinary_bkp/Spotlight_ar5jpr.png",
  "https://assets.aceternity.com/cloudinary_bkp/Parallax_Scroll_pzlatw_anfkh7.png",
  "https://assets.aceternity.com/tabs.png",
  "https://assets.aceternity.com/cloudinary_bkp/Tracing_Beam_npujte.png",
  "https://assets.aceternity.com/cloudinary_bkp/typewriter-effect.png",
  "https://assets.aceternity.com/glowing-effect.webp",
  "https://assets.aceternity.com/hover-border-gradient.png",
  "https://assets.aceternity.com/cloudinary_bkp/Infinite_Moving_Cards_evhzur.png",
  "https://assets.aceternity.com/cloudinary_bkp/Lamp_hlq3ln.png",
  "https://assets.aceternity.com/macbook-scroll.png",
  "https://assets.aceternity.com/cloudinary_bkp/Meteors_fye3ys.png",
  "https://assets.aceternity.com/cloudinary_bkp/Moving_Border_yn78lv.png",
  "https://assets.aceternity.com/multi-step-loader.png",
  "https://assets.aceternity.com/vortex.png",
  "https://assets.aceternity.com/wobble-card.png",
  "https://assets.aceternity.com/world-map.webp",
];

const Searching: React.FC = () => {

  return (
    <div className="relative">
      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-[#331574]/30 via-[#4A9DE3]/80 to-[#331574] m-0"></div>

      <div className="w-screen overflow-hidden" style={{ fontFamily: "'Nova Square', monospace" }}>
        <ScrollVelocity
          texts={['Explore Sci-Fi Discover Reviews Find Articles Dive into Sci-Fi']}
          velocity={30}
          className="h-12"
          damping={50}
          stiffness={100}
          numCopies={4}
          velocityMapping={{ input: [0, 1000], output: [0, 2] }}
          parallaxClassName="text-xl lg:text-3xl font-bold block bg-gradient-to-r from-[#4A9DE3] via-[#4A9DE3] to-[#331574] bg-clip-text text-transparent select-none w-screen"
          scrollerClassName="text-xl lg:text-3xl font-bold block bg-gradient-to-r from-[#4A9DE3] via-[#4A9DE3] to-[#331574] bg-clip-text text-transparent select-none"
        />
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-[#331574]/30 via-[#4A9DE3]/80 to-[#331574] m-0"></div>

      <div className="relative">
        <ThreeDMarquee images={images} />
        <div className="hidden md:hidden lg:flex absolute -top-18 right-16 h-full items-center z-20">
          <Animation />
        </div>
      </div>

      <div className="min-h-200 bg-gradient-to-b from-transparent via-[#0a0a14] to-[#331574]/5 mx-auto px-6 lg:px-8 relative -mt-[280px] lg:-mt-[420px] z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Cari Artikel & Review
            <span className="block bg-gradient-to-r from-[#4A9DE3] to-[#331574] bg-clip-text text-transparent pb-2">
              Film Sci-Fi Disini
            </span>
          </h1>
        </div>

        {/* Search Bar */}
        <div className="mt-10 flex justify-center">
          <div className="relative w-full max-w-4xl">
            <input
              type="text"
              placeholder="Cari artikel atau review film Sci-Fi..."
              className="block w-full pl-12 pr-4 py-4 rounded-full text-sm lg:text-base bg-white/10 backdrop-blur-sm border border-white/20 
                        rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-[#4A9DE3] 
                        focus:ring-2 focus:ring-[#4A9DE3]/50 transition-all duration-300"
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-slate-400" />
            </div>
            <button className="absolute inset-y-2 right-0 mr-2 px-5 lg:px-6 bg-gradient-to-r from-[#124F88] to-[#4A9DE3] 
                              text-white rounded-full font-small lg:font-medium hover:shadow-md hover:shadow-[#4A9DE3]/30 
                              transition-all duration-300 hover:scale-105">
              Cari
            </button>
          </div>
        </div>

      </div>
    </div>  
  );
};

export default Searching;