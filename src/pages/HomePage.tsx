import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cross, Sparkles } from 'lucide-react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';

function HomePage() {
  const navigate = useNavigate();
  const controls = useAnimation();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);
  const parallaxY = useTransform(mouseY, [-0.5, 0.5], [-50, 50]);
  const parallaxX = useTransform(mouseX, [-0.5, 0.5], [-50, 50]);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX - innerWidth / 2) / innerWidth);
    mouseY.set((clientY - innerHeight / 2) / innerHeight);
  };

  useEffect(() => {
    controls.start({
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    });

    // Preload faith pages
    const preloadPages = async () => {
      const pages = ['ChristianPage', 'HinduPage', 'IslamicPage'];
      await Promise.all(pages.map(page => 
        import(`../pages/${page}.tsx`).catch(console.error)
      ));
    };
    preloadPages();
  }, [controls]);

  const FaithSymbol = ({ 
    children, 
    bgClass, 
    textClass, 
    path, 
    delay,
    label 
  }: { 
    children: React.ReactNode, 
    bgClass: string, 
    textClass: string, 
    path: string, 
    delay: number,
    label: string 
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      onClick={() => navigate(path)}
      role="button"
      aria-label={`Navigate to ${label} section`}
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && navigate(path)}
      className="relative group"
    >
      <motion.div
        style={{ 
          rotateX, 
          rotateY, 
          transformStyle: "preserve-3d",
          z: useTransform(mouseY, [-0.5, 0.5], [50, -50])
        }}
        className="cursor-pointer perspective-1000"
      >
        <motion.div 
          animate={controls}
          className={`w-40 h-40 flex items-center justify-center ${bgClass} rounded-2xl shadow-2xl transform transition-all duration-300 group-hover:scale-110 focus:ring-4 focus:ring-purple-500`}
          style={{ transformStyle: "preserve-3d" }}
          whileHover={{ 
            scale: 1.1,
            rotateZ: [0, 5, -5, 0],
            transition: { duration: 0.5 }
          }}
        >
          <div className="relative">
            {children}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [1, 1.5, 1],
                  x: Math.random() * 100 - 50,
                  y: Math.random() * 100 - 50
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
                className="absolute -inset-2"
              >
                <Sparkles className="w-6 h-6 text-white/50 absolute" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.3 }}
        className={`mt-6 text-xl font-semibold ${textClass} text-center`}
      >
        {label}
      </motion.p>
    </motion.div>
  );

  return (
    <div 
      className="min-h-screen bg-gray-900 text-white overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <motion.div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80')] bg-cover bg-center"
        style={{ x: parallaxX, y: parallaxY }}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 1.5 }}
      />
      
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.1) 0%, rgba(30, 64, 175, 0.2) 100%)',
          x: useTransform(mouseX, [-0.5, 0.5], [-20, 20]),
          y: useTransform(mouseY, [-0.5, 0.5], [-20, 20]),
        }}
      />
      
      <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h1 className="sr-only">Sacred Paths - A Multi-Faith Portal</h1>
          <motion.h2 
            className="text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
            animate={{ 
              backgroundPosition: ['0%', '100%'],
              filter: ['hue-rotate(0deg)', 'hue-rotate(360deg)']
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity,
              ease: "linear"
            }}
          >
            Sacred Paths
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-gray-300"
          >
            Illuminate Your Spiritual Quest
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24 max-w-6xl mx-auto">
          <FaithSymbol 
            bgClass="bg-gradient-to-br from-blue-500 to-blue-700"
            textClass="text-blue-400"
            path="/christian"
            delay={0.2}
            label="Christian"
          >
            <Cross size={80} className="text-white transform transition-transform group-hover:rotate-12" />
          </FaithSymbol>

          <FaithSymbol 
            bgClass="bg-gradient-to-br from-orange-500 to-red-700"
            textClass="text-orange-400"
            path="/hindu"
            delay={0.4}
            label="Hindu"
          >
            <span className="text-6xl text-white transform transition-transform group-hover:scale-110">ॐ</span>
          </FaithSymbol>

          <FaithSymbol 
            bgClass="bg-gradient-to-br from-green-500 to-green-700"
            textClass="text-green-400"
            path="/islamic"
            delay={0.6}
            label="Islamic"
          >
            <span className="text-6xl text-white transform transition-transform group-hover:rotate-12">☪</span>
          </FaithSymbol>
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-20 text-gray-400 text-center max-w-2xl text-lg"
        >
          Embark on a mystical journey through ancient wisdom and divine traditions. Each symbol opens a gateway to timeless knowledge and spiritual enlightenment.
        </motion.p>
      </div>
    </div>
  );
}

export default HomePage;