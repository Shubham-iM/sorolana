import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";
import MainComponent from "@/component/MainComponent";

export default function Home() {
  console.log("dev environment.");
  return (
    <>
      <Navbar />
      <MainComponent />
      <Footer />
    </>
  );
}
