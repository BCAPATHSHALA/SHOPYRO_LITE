"use client";

import { checkEnvs } from "@/lib/actions";
import React from "react";

export const WebsyroSetup = () => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 16,
        right: 16,
        zIndex: 9999,
        padding: 12,
        borderRadius: 8,
        background: "#111",
        color: "#fff",
        boxShadow: "0 6px 24px rgba(0,0,0,0.2)",
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 4 }}>
        Websyro Ecommerce Setup
      </div>
      <div style={{ opacity: 0.85, marginBottom: 8 }}>
        Verify environment configuration for this template.
      </div>
      <button
        onClick={() => void checkEnvs()}
        style={{
          background: "#fff",
          color: "#111",
          padding: "6px 10px",
          borderRadius: 6,
          fontSize: 12,
          fontWeight: 600,
        }}
      >
        Run env check
      </button>
    </div>
  );
};

export default WebsyroSetup;
