import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    x: "100vw",
    rotateY: -90,
    scale: 0.8
  },
  in: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    scale: 1
  },
  out: {
    opacity: 0,
    x: "-100vw",
    rotateY: 90,
    scale: 0.8
  }
};

const pageTransition = {
  type: "tween",
  ease: [0.43, 0.13, 0.23, 0.96], 
  duration: 0.4, 
  delay: 0.1, 
};

export const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        width: '100%', 
        height: '100%' 
      }}
    >
      {children}
    </motion.div>
  );
};