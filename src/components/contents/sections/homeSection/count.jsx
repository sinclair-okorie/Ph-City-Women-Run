import React, { useState, useEffect } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import Countdown from "../coutDown";
import SaveUrPotForm from "../../../form/saveUrPot";

function Thecount() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const openOverlay = () => setIsOpen(true);
  const closeOverlay = () => setIsOpen(false);

  const hygraphEndpoint =
    "https://ap-south-1.cdn.hygraph.com/content/cm25wyi9i064707wegesycex9/master";

  const query = `{
    homepage(where: { id: "cm34sksea08cp07pnkzjsinh1" }) {
      startDate
      endDate
      image1 { url }
    }
  }`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(hygraphEndpoint, { query });
        setData(response.data.data.homepage);
        setLoading(false);
      } catch {
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    AOS.init({ duration: 2000, once: true });
  }, []);

  if (loading) return null;

  if (error)
    return (
      <p className="h-[30vh] flex justify-center items-center text-white">
        Let's get you back online
      </p>
    );

  const { startDate, endDate, image1 } = data;

  return (
    <section
      className="relative flex justify-center items-center silver:h-[243px] w-full"
      style={{
        backgroundImage: `url(${image1.url})`,
        backgroundColor: "#000000BF",
        backgroundBlendMode: "multiply",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <SaveUrPotForm isOpen={isOpen} closeOverlay={closeOverlay} />

      <div className="auto-container flex justify-center items-center w-full px-[15px] py-[25px]">
        <div className="bg-[#8D12AB] rounded-[16px] p-[15px] sm:px-[40px] w-full">
          <Countdown
            startDate={startDate}
            endDate={endDate}
            openOverlay={openOverlay}
          />
        </div>
      </div>
    </section>
  );
}

export default Thecount;
