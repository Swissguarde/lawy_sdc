import { motion } from "framer-motion";

export const MathPatterns = () => {
  return (
    <>
      {/* Grid Pattern */}
      <svg
        className="absolute top-0 left-0 opacity-10"
        width="100%"
        height="100%"
      >
        <pattern
          id="grid"
          x="0"
          y="0"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
          />
        </pattern>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Floating Mathematical Symbols */}
      <motion.div
        className="absolute right-10 top-20"
        animate={{ y: [0, 20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          className="opacity-20"
        >
          <path
            d="M20,50 L80,50 M50,20 L50,80"
            stroke="white"
            strokeWidth="2"
          />
          <circle
            cx="50"
            cy="50"
            r="30"
            fill="none"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
      </motion.div>

      {/* Sine Wave */}
      <motion.div
        className="absolute left-10 bottom-20"
        animate={{ x: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      >
        <svg
          width="150"
          height="50"
          viewBox="0 0 150 50"
          className="opacity-20"
        >
          <path
            d="M0,25 C37.5,0 37.5,50 75,25 C112.5,0 112.5,50 150,25"
            fill="none"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
      </motion.div>

      {/* Geometric Pattern */}
      <motion.div
        className="absolute right-20 bottom-40"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 360, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80" className="opacity-20">
          <polygon
            points="40,0 80,40 40,80 0,40"
            fill="none"
            stroke="white"
            strokeWidth="2"
          />
          <polygon
            points="40,10 70,40 40,70 10,40"
            fill="none"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
      </motion.div>
    </>
  );
};
