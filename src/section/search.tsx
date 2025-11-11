import React, { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { ThreeDMarquee } from '@/components/ui/shadcn-io/3d-marquee';
import { ScrollVelocity } from '@/components/ui/shadcn-io/scroll-velocity';

const images = [
  "https://i.pinimg.com/736x/d3/ea/d3/d3ead348e20974003f14fb996c59dd07.jpg",
  "https://i.pinimg.com/736x/89/86/8b/89868b8a0b1c7d0cc080dfe79ec08cc9.jpg",
  "https://i.pinimg.com/736x/0c/35/40/0c3540ef81d547e7d05b4593d3f18be3.jpg",
  "https://i.pinimg.com/736x/1f/97/52/1f9752467b4a213dd9067418fafbf77a.jpg",
  "https://i.pinimg.com/736x/ce/14/44/ce14440d1a2dc1052bd00ab0f2894cba.jpg",
  "https://i.pinimg.com/736x/18/c8/aa/18c8aa6bd8785b4aeb8bf1ee836046b4.jpg",
  "https://i.pinimg.com/736x/06/15/70/061570b3a9b5ef3d7d6881e32876bb3c.jpg",
  "https://i.pinimg.com/736x/40/d2/93/40d2938b69860ca2d77c252e7c970ed0.jpg",


  "https://i.pinimg.com/736x/d3/ea/d3/d3ead348e20974003f14fb996c59dd07.jpg",
  "https://i.pinimg.com/736x/89/86/8b/89868b8a0b1c7d0cc080dfe79ec08cc9.jpg",
  "https://i.pinimg.com/1200x/50/f2/86/50f286114202281079dda7b44db2735f.jpg",
  "https://i.pinimg.com/1200x/c9/35/56/c93556f30fa3a740b7b624c235686bd6.jpg",
  "https://i.pinimg.com/736x/13/7f/56/137f56e53cfb6c7753641468f146b6d4.jpg",
  "https://i.pinimg.com/1200x/46/31/79/4631796ecb1b76f681c4daf2a1061b85.jpg",
  "https://i.pinimg.com/736x/06/15/70/061570b3a9b5ef3d7d6881e32876bb3c.jpg",
  "https://i.pinimg.com/736x/40/d2/93/40d2938b69860ca2d77c252e7c970ed0.jpg",


  "https://i.pinimg.com/736x/0c/35/40/0c3540ef81d547e7d05b4593d3f18be3.jpg",
  "https://i.pinimg.com/736x/1f/97/52/1f9752467b4a213dd9067418fafbf77a.jpg",
  "https://i.pinimg.com/736x/ce/14/44/ce14440d1a2dc1052bd00ab0f2894cba.jpg",
  "https://i.pinimg.com/1200x/7a/2e/a2/7a2ea2c1322eb7a8273f46fc91ff4202.jpg",
  "https://i.pinimg.com/736x/51/21/67/512167af7cd7c6ae53536d9c51440170.jpg",
  "https://i.pinimg.com/736x/33/7b/91/337b91c388d1d7543f646b73225b018c.jpg",
  "https://i.pinimg.com/1200x/1e/7b/58/1e7b58671c52cd5221afa12cb5a10f71.jpg",
  "https://i.pinimg.com/736x/e0/b4/75/e0b47517e30732b611dfbb9445f57fce.jpg",


  "https://i.pinimg.com/736x/18/c8/aa/18c8aa6bd8785b4aeb8bf1ee836046b4.jpg",
  "https://i.pinimg.com/1200x/bf/e4/1d/bfe41d7965657f03f9ee819f291b7ced.jpg",
  "https://i.pinimg.com/736x/b6/41/06/b6410694a7325936ca965e82d77ee765.jpg",
  "https://i.pinimg.com/1200x/7d/97/82/7d9782b6bae145ca6bfd8e1b85c980f4.jpg",
  "https://i.pinimg.com/1200x/c0/b4/87/c0b4875f00cee9f3ef1478610f6591f8.jpg",
  "https://i.pinimg.com/1200x/88/d4/af/88d4afa40bc73fb6757d478d78ddc845.jpg",
  "https://i.pinimg.com/1200x/c5/31/db/c531dbe87bbce19b10a09c058e2de697.jpg",
  "https://i.pinimg.com/736x/de/08/6b/de086be9a2f36028c9ec2be80508bd3c.jpg",


  "https://i.pinimg.com/1200x/1e/7b/58/1e7b58671c52cd5221afa12cb5a10f71.jpg",
  "https://i.pinimg.com/1200x/5b/e6/5e/5be65ec2cddd96032701e030da69fc17.jpg",
  "https://i.pinimg.com/1200x/94/14/19/941419ce653a6b7080d12a932aac607f.jpg",
  "https://i.pinimg.com/736x/99/b9/d4/99b9d408c4fba0e274d95d3d1fa56d1b.jpg",
  "https://i.pinimg.com/736x/d0/d3/be/d0d3befde404f8e436e99bffbce9aab9.jpg",
  "https://i.pinimg.com/1200x/dd/12/5d/dd125d9fee14610a4a6ecef23d34d0dd.jpg",
  "https://i.pinimg.com/736x/59/92/2c/59922ce5295f44057131765791ba1c76.jpg",


  "https://i.pinimg.com/736x/18/c8/aa/18c8aa6bd8785b4aeb8bf1ee836046b4.jpg",
  "https://i.pinimg.com/1200x/bf/e4/1d/bfe41d7965657f03f9ee819f291b7ced.jpg",
  "https://i.pinimg.com/736x/b6/41/06/b6410694a7325936ca965e82d77ee765.jpg",
  "https://i.pinimg.com/1200x/7d/97/82/7d9782b6bae145ca6bfd8e1b85c980f4.jpg",
  "https://i.pinimg.com/1200x/ed/85/ea/ed85ead80da6213156e00faedd8467ab.jpg",
  "https://i.pinimg.com/1200x/46/31/79/4631796ecb1b76f681c4daf2a1061b85.jpg",
  "https://i.pinimg.com/1200x/bf/e4/1d/bfe41d7965657f03f9ee819f291b7ced.jpg",
  "https://i.pinimg.com/736x/de/08/6b/de086be9a2f36028c9ec2be80508bd3c.jpg",


  "https://i.pinimg.com/736x/0c/35/40/0c3540ef81d547e7d05b4593d3f18be3.jpg",
  "https://i.pinimg.com/736x/1f/97/52/1f9752467b4a213dd9067418fafbf77a.jpg",
  "https://i.pinimg.com/736x/ce/14/44/ce14440d1a2dc1052bd00ab0f2894cba.jpg",
  "https://i.pinimg.com/1200x/7a/2e/a2/7a2ea2c1322eb7a8273f46fc91ff4202.jpg",
  "https://i.pinimg.com/736x/51/21/67/512167af7cd7c6ae53536d9c51440170.jpg",
  "https://i.pinimg.com/736x/33/7b/91/337b91c388d1d7543f646b73225b018c.jpg",
  "https://i.pinimg.com/1200x/ed/85/ea/ed85ead80da6213156e00faedd8467ab.jpg",
  "https://i.pinimg.com/736x/e0/b4/75/e0b47517e30732b611dfbb9445f57fce.jpg",

];

const Searching: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const searchSectionRef = useRef<HTMLDivElement>(null);

  const [marqueeVisible, setMarqueeVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px'
    };

    const marqueeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setMarqueeVisible(true);
          }
        });
      },
      observerOptions
    );

    const searchObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSearchVisible(true);
          }
        });
      },
      observerOptions
    );

    if (marqueeRef.current) marqueeObserver.observe(marqueeRef.current);
    if (searchSectionRef.current) searchObserver.observe(searchSectionRef.current);

    return () => {
      marqueeObserver.disconnect();
      searchObserver.disconnect();
    };
  }, []);

  return (
    <div className="relative">
      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-[#331574]/30 via-[#4A9DE3]/80 to-[#331574] m-0"></div>

      <div className="w-screen overflow-hidden" style={{ fontFamily: "'Nova Square', monospace" }}>
        <ScrollVelocity
          texts={['Explore Sci-Fi Discover Reviews Find Articles Dive into Sci-Fi']}
          velocity={50}
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

      <div 
        ref={marqueeRef}
        className="relative"
        style={{
          opacity: marqueeVisible ? 1 : 0,
          transform: marqueeVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
          transitionDelay: '0.1s'
        }}
      >
        <ThreeDMarquee images={images} />
      </div>

      <div 
        ref={searchSectionRef}
        className="min-h-200 mx-auto px-6 lg:px-8 relative -mt-[280px] md:-mt-[400px] lg:-mt-[420px] z-10"
        style={{
          opacity: searchVisible ? 1 : 0,
          transform: searchVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
          transitionDelay: '0.2s'
        }}
      >
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Cari Artikel & Review <br />Film Sci-Fi Disini
          </h1>
        </div>

        {/* Search Bar */}
        <div className="mt-10 flex justify-center">
          <div className="relative w-full max-w-4xl">
            <input
              type="text"
              placeholder="Cari artikel atau review film Sci-Fi..."
              className="block w-full pl-12 pr-4 py-4 rounded-full text-sm lg:text-base bg-white/20 backdrop-blur-md border border-white/20 
                        rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-[#4A9DE3] 
                        focus:ring-2 focus:ring-[#4A9DE3]/50 transition-all duration-300"
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-slate-400" />
            </div>
            <button
              className="absolute inset-y-2 right-0 mr-2 px-5 lg:px-6 bg-gradient-to-r from-[#124F88] to-[#4A9DE3]
                              text-white rounded-full font-small lg:font-medium
                              transition-all duration-300 ease-in-out hover:cursor-pointer
                              hover:brightness-105 hover:saturate-125
                              hover:[box-shadow:inset_0_3px_6px_rgba(0,0,0,0.60)]"
            >
              Cari
            </button>
          </div>
        </div>

      </div>
    </div>  
  );
};

export default Searching;