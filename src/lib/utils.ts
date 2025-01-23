export const blobToBase64 = (blob: Blob, callback: (base64: string | undefined) => void) => {
  const reader = new FileReader();
  reader.onload = () => {
    const base64String = reader.result?.toString().split(',')[1];
    callback(base64String);
  };
  reader.readAsDataURL(blob);
};

export const createMediaStream = (
  stream: MediaStream,
  isRecording: () => boolean,
  onPeak: (peak: number) => void
) => {
  const audioContext = new AudioContext();
  const source = audioContext.createMediaStreamSource(stream);
  const analyser = audioContext.createAnalyser();
  
  source.connect(analyser);
  analyser.fftSize = 256;
  
  const dataArray = new Uint8Array(analyser.frequencyBinCount);
  
  const updatePeak = () => {
    if (isRecording()) {
      analyser.getByteFrequencyData(dataArray);
      const peak = Math.max(...Array.from(dataArray)) / 255;
      onPeak(peak);
      requestAnimationFrame(updatePeak);
    }
  };
  
  updatePeak();
}; 