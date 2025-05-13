"use client";
import { useEffect, useRef, useState } from "react";
import { BrowserQRCodeReader, IScannerControls } from "@zxing/browser";

import styles from "./QRCodeScanner.module.css";

const QRCodeScanner = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const controlsRef = useRef<IScannerControls | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const handleIsCameraActive = () => {
    setQRCodeResult(null);
    setIsCameraActive(!isCameraActive);
  };
  const [QRCodeResult, setQRCodeResult] = useState<string | null>(null);

  useEffect(() => {
    if (isCameraActive) {
      const codeReader = new BrowserQRCodeReader();

      if (!videoRef.current) return;

      codeReader
        .decodeFromVideoDevice(
          undefined, // auto-select camera
          videoRef.current,
          (result, error, controls) => {
            if (result) {
              setQRCodeResult(result.getText());
              console.log("✅ QR Code:", result.getText());
              // Optionally stop scanning after one result
              // controls.stop();
            }

            // Ignore "NotFoundException" errors (no QR in frame)
            if (error && error.name !== "NotFoundException") {
              console.error("QR scan error:", error);
            }

            controlsRef.current = controls;
          }
        )
        .catch((err) => console.error("Camera init error:", err));
    }

    return () => {
      controlsRef.current?.stop();
    };
  }, [isCameraActive]);

  return (
    <div>
      <div>
        {isCameraActive ? (
          <>
            <video ref={videoRef} className={styles.cameraContainer} />
            <p>Result : {QRCodeResult}</p>
          </>
        ) : (
          <div className={styles.cameraContainerEmpty}></div>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {!isCameraActive ? (
          <button
            onClick={handleIsCameraActive}
            className={styles.scannerButton}
          >
            Activate camera
          </button>
        ) : (
          <button
            onClick={handleIsCameraActive}
            className={styles.scannerButton}
          >
            Deactivate camera
          </button>
        )}
      </div>
    </div>
  );
};

export default QRCodeScanner;
