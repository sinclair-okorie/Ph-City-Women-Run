import React, { useState, useEffect } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

import Button from "../../Button";
import ScheduleCountdown from "../scheduleCount";

const VolunSection = ({ openVolunteerform }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const hygraphEndpoint =
    "https://ap-south-1.cdn.hygraph.com/content/cm25wyi9i064707wegesycex9/master";

  const query = `{
    volunteer(where: { id: "cm3f4go1z15ae07o6l5jc1424" }) {
      title
      subtitle
      subtext
      startDate
      endDate
      slideText
      coverImage { url }
    }
  }`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(hygraphEndpoint, { query });
        setData(response.data.data.volunteer);
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

  // ✅ Correct: extract dates from CMS data
  const { startDate, endDate } = data;

  return (
    <section className="relative pt-[151px] flex flex-col w-full">
      <div className="auto-container flex flex-col items-center w-full pt-[110px] pb-[20px] at500:px-[72px]">
        <div
          className="relative flex flex-col bg-cover px-[20px] sm:px-[50px] py-[100px] w-full at500:rounded-[24px]"
          style={{
            backgroundImage: `url(${data.coverImage.url})`,
            backgroundColor: "#00000099",
            backgroundBlendMode: "multiply",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex gap-[20px] flex-col w-full sm:h-[320px]">
            <h4 className="text-white font-extrabold sm:text-[40px] md:w-[456px]">
              {data.title}
            </h4>

            <ScheduleCountdown
              startDate={startDate}
              endDate={endDate}
              openOverlay={openVolunteerform}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VolunSection;
