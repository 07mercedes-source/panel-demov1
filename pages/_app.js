import "../styles/global.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [user, setUser] = useState({ name: "Admin" });
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(
        new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {router.pathname !== "/login" && (
        <nav className="navbar">
          <div className="nav-left">
            <img
              src="/logo.png"
              alt="Logo"
              onClick={() => router.push("/dashboard")}
            />
            <div className="nav-links">
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/depo">Depo</Link>
              <Link href="/ik">İK</Link>
            </div>
          </div>
          <div className="nav-right">
            <span>👤 {user.name}</span>
            <span>🕒 {dateTime}</span>
            <button className="logout-btn" onClick={() => router.push("/login")}>
              Çıkış
            </button>
          </div>
        </nav>
      )}
      <Component {...pageProps} />
    </>
  );
}
