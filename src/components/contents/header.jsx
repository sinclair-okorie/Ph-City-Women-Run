import React, { useState } from "react";
import Navbar from "../navigation/navbar";
import Hero from "../slider/image_slider";
import SaveUrPotForm from "../form/saveUrPot";

function header() {
  const [isOpen, setIsOpen] = useState(false);
  const openOverlay = () => setIsOpen(true);
  const closeOverlay = () => setIsOpen(false);
  return (
    <>
      <SaveUrPotForm isOpen={isOpen} closeOverlay={closeOverlay} />
      <div className="flex flex-col justify-center items-center w-full">
        <Navbar openOverlay={openOverlay} />
        <Hero />
      </div>
    </>
  );
}

export default header;
