import React, { useEffect, useRef } from 'react';

interface WaveformProps {
  audioStream: MediaStream | null;
}

export const Waveform = ({ audioStream }: WaveformProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const analyserRef = useRef<AnalyserNode | null>(null);

  useEffect(() => {
    if (!audioStream || !canvasRef.current) return;

    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(audioStream);
