import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Key, Lock, Shield, Fingerprint } from "lucide-react";
import PixelCard from "../components/ReactBits/PixelCard";
import DecryptedText from "../components/ReactBits/DecryptedTextEffect";
import { motion, useScroll, useTransform } from "framer-motion";
import cryptimage from "../assets/crypto.jpg";
import cryptvid from "../assets/video.mp4"
import { motion as motion1 } from "motion/react";
import { HeroHighlight, Highlight } from "../components/ui/hero-highlight";
import GradientText from "../components/ReactBits/GradientText";

// Loader Component
const Loader = () => {
  const loaderRef = useRef(null);

  useEffect(() => {
    const loader = loaderRef.current;
    gsap.to(loader, {
      opacity: 0,
      delay: 2,
      onComplete: () => {
        loader.style.display = "none";
      },
    });
  }, []);

  return (
    <div
      ref={loaderRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <motion.div
        style={{ fontSize: "3rem", color: "white" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        🔒
      </motion.div>
      <motion.div
        style={{ fontSize: "2rem", color: "white", marginLeft: "1rem" }}
        animate={{ x: [0, 20, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        🔑
      </motion.div>
    </div>
  );
};

const TextParallaxContent = ({
  mediaUrl,
  mediaType = "image",
  subheading,
  heading,
  children,
}) => {
  return (
    <div className="relative h-[150vh]">
      <StickyMedia mediaUrl={mediaUrl} mediaType={mediaType} />
      <OverlayCopy heading={heading} subheading={subheading} />
      {children}
    </div>
  );
};

const StickyMedia = ({ mediaUrl, mediaType }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  return (
    <motion.div
      ref={targetRef}
      style={{
        scale,
        marginLeft:"55px"
      }}
      className="sticky top-0 w-[90vw] h-full rounded-3xl overflow-hidden"
    >
      {mediaType === "video" ? (
        <video
          src={mediaUrl}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      ) : (
        <div
          style={{
            backgroundImage: `url(${mediaUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="w-full h-full"
        />
      )}
    </motion.div>
  );
};

const OverlayCopy = ({ subheading, heading }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);

  return (
    <motion.div
      ref={targetRef}
      style={{ y }}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <p className="text-xl md:text-3xl">{subheading}</p>
      <p className="text-4xl font-bold md:text-7xl">{heading}</p>
    </motion.div>
  );
};


function Home() {
  const [scrollY, setScrollY] = useState(0);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (headerRef.current) {
      const scale = Math.max(0.5, 1 - scrollY / 500); // Adjust 500 for sensitivity
      const yOffset = -scrollY * 0.5; // Adjust for vertical movement

      gsap.to(headerRef.current, {
        scale: scale,
        y: yOffset,
        ease: "power2.out",
      });
    }
  }, [scrollY]);

  const algorithms = [
    {
      name: "AES",
      description:
        "Advanced Encryption Standard - A symmetric block cipher algorithm that has become the global standard for secure data encryption.",
      icon: Lock,
      features: [
        "128, 192, or 256-bit key sizes",
        "Highly secure and widely adopted",
        "Fast performance in both hardware and software",
      ],
    },
    {
      name: "3DES",
      description:
        "Triple Data Encryption Standard - Applies DES encryption three times to each data block for enhanced security.",
      icon: Key,
      features: [
        "168-bit effective key length",
        "Backwards compatible with DES",
        "Proven security track record",
      ],
    },
    {
      name: "Twofish",
      description:
        "A symmetric key block cipher with a block size of 128 bits and key sizes up to 256 bits.",
      icon: Shield,
      features: [
        "Flexible key size up to 256 bits",
        "Fast on both 32-bit and 8-bit CPUs",
        "Free for any use (unpatented)",
      ],
    },
    {
      name: "Blowfish",
      description:
        "A symmetric block cipher designed as a fast, free alternative to existing encryption algorithms.",
      icon: Fingerprint,
      features: [
        "Variable key length up to 448 bits",
        "Simple structure for easy implementation",
        "Fast encryption speed",
      ],
    },
  ];

  return (
    <div className="-mt-10 mb-10">
      <Loader />
      <div className="top-0 left-0 w-full h-[100vh] z-10 text-center py-10 bg-white text-black">
        <HeroHighlight>
          <section
            ref={headerRef}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              zIndex: 0,
            }}
          >
            <motion1.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [20, -5, 0] }}
              transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1], delay: 2 }}
              className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-4"
            >
              Welcome to{" "}
              <Highlight className="text-black dark:text-white">
                <DecryptedText
                  text="Cryptify"
                  revealDirection="start"
                  speed={190}
                  delay={1500}
                  className="revealed"
                  sequential="false"
                />
              </Highlight>
            </motion1.h1>
            <p className="text-lg text-muted-foreground max-w-[800px] mx-auto">
              Secure Encryption and Decryption Made Simple
            </p>
          </section>
        </HeroHighlight>
      </div>

      <TextParallaxContent
        mediaUrl={cryptvid}
        mediaType="video"
        subheading="Secure"
        heading="Protect what matters."
      />
      <ExampleContent1 />
      <TextParallaxContent
        mediaUrl={cryptimage}
        subheading="Protect what matters."
        heading="Encryption without compromise."
      />
      <ExampleContent2 />

      <TextParallaxContent
        mediaUrl="https://images.unsplash.com/photo-1504610926078-a1611febcad3"
        subheading="User-Friendly"
        heading="Security made simple."
      />
      <ExampleContent3 />

      <div className="-mt-14 -mb-5">
        <GradientText
          colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
          animationSpeed={8}
          showBorder={false}
          className="text-7xl font-bold text-center "
        >
          Our 4 Algorithms 
        </GradientText>
      </div>
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 px-4 sm:px-6 lg:px-8">
        {algorithms.map((algo) => (
          <PixelCard key={algo.name} variant="blue" className="flex flex-col">
            <div className="relative z-10">
              <Card>
                <CardHeader>
                  <div className="mb-4 w-fit rounded-lg bg-primary/10 p-2">
                    <algo.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{algo.name}</CardTitle>
                  <CardDescription>{algo.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="list-disc pl-4 space-y-2 text-sm text-muted-foreground">
                    {algo.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </PixelCard>
        ))}
      </section>
    </div>
  );
}

const ExampleContent1 = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      Advanced encryption at your fingertips.
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
        In today's digital world, security is not an option — it's a necessity.
        Cryptify ensures top-tier encryption using industry-standard algorithms
        like AES, Blowfish, Twofish, and 3DES to keep your data secure.
      </p>
      <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
        With Cryptify, your sensitive files, messages, and documents remain safe
        from prying eyes. 
      </p>
    </div>
  </div>
);

const ExampleContent2 = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      Security should never slow you down.
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
        Cryptify is built for speed and efficiency. Our lightweight encryption
        engine ensures that your files are secured instantly without
        compromising system performance.
      </p>
      <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
        Whether you're encrypting text, documents, or media files, Cryptify
        delivers seamless protection without delays.
      </p>
    </div>
  </div>
);

const ExampleContent3 = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      Encryption shouldn't be complicated.
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
        With Cryptify's intuitive interface, you don't need to be a tech expert
        to secure your data. Our simple User Interface ensures
        that anyone can protect their files with ease.
      </p>
      <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
        Take control of your privacy effortlessly—encrypt, protect, and stay
        safe with Cryptify.
      </p>
    </div>
  </div>
);

export default Home;
