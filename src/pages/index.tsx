import ContainerBackground from "@components/ContainerBackground/ContainerBackground";
import type { NextPage } from "next";
import Head from "next/head";
import PostForm from "../components/PostForm/PostForm";

const Home: NextPage = () => {
  return (
    <ContainerBackground>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PostForm />
    </ContainerBackground>
  );
};

export default Home;
