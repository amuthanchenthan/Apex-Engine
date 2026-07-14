import { useState } from "react";

import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/common/Hero";
import Stats from "../../components/common/Stats";
import Footer from "../../components/layout/Footer";

function Home() {
  const [platformVisible, setPlatformVisible] = useState(false);

  const handlePlatform = () => {
    if (!platformVisible) {
      setPlatformVisible(true);

      setTimeout(() => {
        const section = document.getElementById("platform");

        if (section) {
          section.scrollIntoView({
            behavior: "smooth",
          });
        }
      }, 100);
    } else {
      setPlatformVisible(false);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Navbar />

      <Hero
        showPlatform={handlePlatform}
        platformVisible={platformVisible}
      />

      {platformVisible && <Stats />}

      <Footer />
    </>
  );
}

export default Home;