import React from "react";
import Image from "next/image";

function HomeCentreImage() {
  return (
    <div style={{ zIndex: "-1" }}>
      <Image src="/assets/HomeImage.jpg" alt="home image" fill />
    </div>
  );
}

export default HomeCentreImage;
