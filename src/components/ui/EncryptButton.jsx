import { useRef, useState } from "react";
import { FiLock } from "react-icons/fi";
import { motion } from "framer-motion";

const EncryptButton = ({ targetText = "Encrypt data", onClick }) => {
  return (
    <div className="grid min-h-[10px] place-content-center p-4">
      <Enc targetText={targetText} onClick={onClick} />
    </div>
  );
};

const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;
const CHARS = "!@#$%^&*():{};|,.<>/?";

const Enc = ({ targetText, onClick }) => {
  const intervalRef = useRef(null);
  const [text, setText] = useState(targetText);

  const scramble = () => {
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = targetText
        .split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }
          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          return CHARS[randomCharIndex];
        })
        .join("");

      setText(scrambled);
      pos++;

      if (pos >= targetText.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    clearInterval(intervalRef.current || undefined);
    setText(targetText);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.975 }}
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
      onClick={onClick}
      className="group relative overflow-hidden rounded-lg bg-white px-4 py-2 font-mono font-medium uppercase border transition-colors border-black cursor-pointer"
      style={{ "--hover-color": "#3bcf92" }}
    >
      <div
        className="relative z-10 flex items-center gap-2 transition-colors"
        style={{ color: "inherit" }}
      >
        <FiLock />
        <span>{text}</span>
      </div>
      <motion.span
        initial={{ y: "100%" }}
        animate={{ y: "-100%" }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 1,
          ease: "linear",
        }}
        className="duration-300 absolute inset-0 z-0 scale-125 bg-gradient-to-t opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(to top, rgba(59, 207, 146, 0) 40%, #3bcf92 100%, rgba(59, 207, 146, 0) 60%)",
        }}
      />
    </motion.button>
  );
};

export default EncryptButton;
