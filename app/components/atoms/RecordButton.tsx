"use client"

import { useState, useEffect } from "react"
import { Mic } from "lucide-react"
import { Waveform } from "./Waveform"
import { useVoiceRecognition } from "@/app/hooks/useVoiceRecognition"
import { Button } from "@/app/components/ui/button"

type RecordButtonProps = {
  onTranscriptUpdate: (audioBlob: Blob) => void
}

export const RecordButton = ({ onTranscriptUpdate }: RecordButtonProps) => {
  const [isRecording, setIsRecording] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const { startRecording, stopRecording, audioStream } = useVoiceRecognition({
    onResult: (blob) => {
      onTranscriptUpdate(blob)
    },
  })

  useEffect(() => {
    let timerInterval: NodeJS.Timeout | null = null

    if (isRecording) {
      timerInterval = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    }

    return () => {
      if (timerInterval) {
        clearInterval(timerInterval)
      }
    }
  }, [isRecording])

  const handleClick = async () => {
    setError(null)
    console.log("Button clicked, current recording state:", isRecording)

    try {
      if (isRecording) {
        console.log("Attempting to stop recording...")
        await stopRecording()
        setIsRecording(false)
        setRecordingTime(0)
      } else {
        console.log("Attempting to start recording...")
        await startRecording()
        setIsRecording(true)
      }
      console.log("Recording state updated to:", !isRecording)
    } catch (err) {
      console.error("Recording error:", err)
      setError(
        err instanceof Error ? err.message : "録音中にエラーが発生しました"
      )
      setIsRecording(false)
      setRecordingTime(0)
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {isRecording && (
        <>
          <div className="flex items-center gap-2 text-slate-600">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Recording on</span>
          </div>
          {audioStream && (
            <div className="w-full h-24 bg-slate-200 rounded-xl overflow-hidden">
              <Waveform audioStream={audioStream} />
            </div>
          )}
          <div className="text-4xl font-medium">{formatTime(recordingTime)}</div>
          <div className="text-slate-500">Limit: 120:00</div>
        </>
      )}

      <div className="flex justify-center">
        <Button
          variant={isRecording ? "destructive" : "default"}
          size="icon"
          className={`w-24 h-24 rounded-full ${
            isRecording
              ? "bg-red-500 hover:bg-red-600"
              : "bg-gradient-to-br from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
          }`}
          onClick={handleClick}
          aria-label={isRecording ? "Stop Recording" : "Start Recording"}
        >
          <Mic className="h-12 w-12 text-white" />
        </Button>
      </div>

      {error && (
        <div className="text-red-500 text-sm mt-2 max-w-md text-center">
          {error}
        </div>
      )}
    </div>
  )
}
