"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const messages = [
    "CINEMA IS THE LANGUAGE OF DREAMS",
    "STORIES THAT LAST FOREVER",
    "EMOTIONS ARE OUR CANVAS",
    "WHERE VISIONS COME ALIVE",
  ];

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
      {/* Logo */}
      <div className="logo-wrapper">
        <Image
          src="/logo.png"
          alt="La Capella Studios Logo"
          width={260}
          height={260}
          className="logo"
        />
      </div>

      {/* Text */}
      <h2 className="coming-soon">COMING SOON</h2>

      {/* Animated Message */}
      <div className={`carousel ${fade ? "fade-in" : "fade-out"}`}>
        {messages[index]}
      </div>

      <p className="tagline">A new cinematic era begins...</p>

      {/* Contact Form */}
      <form className="form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" required />
        <input type="email" name="email" placeholder="Your Email" required />
        <textarea rows="4" name="message" placeholder="Message"></textarea>
        <button type="submit">Notify Me</button>
        {status === "success" && (
          <p className="form-status">
            Thank you, we’ll get back to you shortly.
          </p>
        )}
        {status === "error" && (
          <p className="form-status">Something went wrong. Please try again.</p>
        )}
      </form>

      <footer>© 2025 La Capella Studios. All Rights Reserved.</footer>
    </div>
  );
}
