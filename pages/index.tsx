import Head from "next/head";
import { H1, Sverige } from "../components";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <H1 className="text-center fixed right-4 top-4">Creative Coding</H1>
      <div className="grid grid-rows-3">
        <Sverige />
      </div>
    </>
  );
}
