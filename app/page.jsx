"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const messages = [
  "CINEMA IS THE LANGUAGE OF DREAMS",
  "STORIES THAT LAST FOREVER",
  "EMOTIONS ARE OUR CANVAS",
  "WHERE VISIONS COME ALIVE",
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    let current = 0;

    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        current++;

        if (current < messages.length) {
          setIndex(current);
          setFade(true);
        } else {
          clearInterval(interval);
        }
      }, 400);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Auto-hide form status messages after 3 seconds
  useEffect(() => {
    if (status === "success" || status === "error") {
      const timer = setTimeout(() => setStatus("idle"), 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.target);

    const body = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      to: "info@lacapellastudios.com", // target email address
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setStatus("success");
        e.target.reset();
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="container">
      <div className="desktop-layout">
        <div className="left-block">
          <div className="left-wrapper fade-card">
            <div className="logo-wrapper">
              <Image
                src="/logo.png"
                alt="La Capella Studios Logo"
                width={260}
                height={260}
                className="logo"
              />
            </div>
            <h2 className="coming-soon">COMING SOON</h2>
            <div className={`carousel ${fade ? "fade-in" : "fade-out"}`}>
              {messages[index]}
            </div>
            <p className="tagline">A new cinematic era begins...</p>
          </div>
        </div>

        <div className="right-block">
          <div className="contact-wrapper fade-card">
            <h2 className="contact-title">Contact Us</h2>

            <div className="contact-section">
              <div className="contact-card hover-animate">
                <div className="card-left">
                  <span className="emoji">📍</span>
                  <h3>Address</h3>
                </div>
                <p>Bengaluru, India</p>
              </div>

              <div className="contact-card hover-animate">
                <div className="card-left">
                  <span className="emoji">📧</span>
                  <h3>Email</h3>
                </div>
                <p>lacapellastudios@gmail.com</p>
              </div>

              <div className="contact-card hover-animate">
                <div className="card-left">
                  <span className="emoji">📞</span>
                  <h3>Phone</h3>
                </div>
                <p>+91 95356 77831</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer>© 2025 La Capella Studios. All Rights Reserved.</footer>
    </div>
  );
}
