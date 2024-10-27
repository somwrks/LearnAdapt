import { SignOutButton } from "@clerk/nextjs";
import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Features from "./Feature";

export default function Landing() {
  return (
    <div>
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-16">
          <Hero />
          <Features />
        </div>
      </div>
    </div>
  );
}
