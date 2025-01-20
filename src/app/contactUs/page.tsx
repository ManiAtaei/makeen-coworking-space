import Container from "@/components/container/Container";
import HeaderContact from "@/components/headerContact/HeaderContact";
import Location from "@/components/locationContact/Location";
import React from "react";

export default function AboutUs() {
  return (
    <>
      <div className="mt-[80px] relative ">
        <img
          className="w-screen sm:hidden"
          src="/imageLanding/HeroMobile.svg"
          alt="img"
        />
        <img
          className="w-screen hidden sm:block max-w-[1440px] mx-auto"
          src="/imageLanding/Hero.svg"
          alt="img"
        />
      <Container>
        <HeaderContact />
        <Location />
      </Container>
      </div>
    </>
  );
}
