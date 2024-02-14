import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "DriveHoster" },
    { name: "description", content: "A Self Hosted File hosting service" },
  ];
};

export const loader = async () => {
  try {
    const ping = await fetch("http://localhost:6090/api/ping");
    return {
       ping: await ping.text(),
       running: true
    };
  } catch (e) {
    return {
      ping: "Server is not running",
      running: false
    };
  }
}

export default function Index() {
  const { ping, running } = useLoaderData<{ ping: string, running: number}>();

  return (
    <div className="main-page">
      <div className="side-panel side-left">
        <div className="header-container">
          <h1>DriveHoster</h1>
        </div>
        <div className="content-container">
        </div>
      </div>
      <main>
        {
          !running && <div className="error-container">
            <p>Server is not running</p>
          </div>
        }
        {
          running && (<><div className="header-container">
            <div className="flex flex-gap">
              <button className="btn-primary">
                Login
              </button>
              <button className="btn">
                Sign Up
              </button>
            </div>
          </div>
          <div className="content-container">
            <p>A Self Hosted File hosting service</p>
            <p>Server Status: {ping || "Loading..."}</p>
          </div></>)
        
        }
      </main>
    </div>

    // <div id="main-container" style={{
    //   display: "flex",
    //   flexDirection: "column",
    //   alignItems: "center",
    //   justifyContent: "center",
    //   height: "100vh",
    //   gap: "12px",
    // }}>
    //   <h1>DriveHoster</h1>
    //   <p>A Self Hosted File hosting service</p>
    //   <p>Server Status: {ping || "Loading..."}</p>
    // </div>
  );
}
