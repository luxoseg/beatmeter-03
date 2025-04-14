import { useEffect, useRef } from 'react';

export default function AudioVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let animationFrameId: number;
    const analyserBars = 48;
    const barWidth = canvas.width / analyserBars;
    const time = { value: 0 };

    function animate() {
      if (!canvas || !context) return;
      time.value += 0.01;

      // Clear the canvas
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw horizontal lines (grid effect)
      context.strokeStyle = 'rgba(49, 49, 71, 0.5)';
      context.lineWidth = 1;
      
      for (let i = 0; i < canvas.height; i += 10) {
        context.beginPath();
        context.moveTo(0, i);
        context.lineTo(canvas.width, i);
        context.stroke();
      }
      
      // Draw vertical lines
      for (let i = 0; i < canvas.width; i += 20) {
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, canvas.height);
        context.stroke();
      }
      
      // Draw each bar
      for (let i = 0; i < analyserBars; i++) {
        // Calculate dynamic height with sine wave effect
        const height = Math.sin(time.value * 3 + i * 0.2) * 15 + 
                      Math.sin(time.value * 5 + i * 0.3) * 5 + 
                      Math.random() * 5 + 15;
        
        // Create gradient based on position
        let gradient;
        if (i < analyserBars / 3) {
          gradient = context.createLinearGradient(0, canvas.height, 0, canvas.height - height);
          gradient.addColorStop(0, 'rgba(0, 240, 255, 0.8)');
          gradient.addColorStop(1, 'rgba(0, 240, 255, 0.2)');
        } else if (i < 2 * analyserBars / 3) {
          gradient = context.createLinearGradient(0, canvas.height, 0, canvas.height - height);
          gradient.addColorStop(0, 'rgba(255, 46, 99, 0.8)');
          gradient.addColorStop(1, 'rgba(255, 46, 99, 0.2)');
        } else {
          gradient = context.createLinearGradient(0, canvas.height, 0, canvas.height - height);
          gradient.addColorStop(0, 'rgba(1, 195, 141, 0.8)');
          gradient.addColorStop(1, 'rgba(1, 195, 141, 0.2)');
        }
        
        // Draw bar
        context.fillStyle = gradient;
        context.fillRect(i * barWidth, canvas.height - height, barWidth - 1, height);
        
        // Draw glow effect on top of bar
        context.fillStyle = 'rgba(255, 255, 255, 0.3)';
        context.fillRect(i * barWidth, canvas.height - height, barWidth - 1, 2);
      }
      
      // Draw the oscilloscope line
      context.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(0, canvas.height / 2);
      
      for (let i = 0; i < canvas.width; i++) {
        const y = Math.sin(time.value * 2 + i * 0.05) * 10 + 
                 Math.sin(time.value * 4 + i * 0.1) * 5 + 
                 canvas.height / 2;
        context.lineTo(i, y);
      }
      
      context.stroke();
      
      // Request next frame
      animationFrameId = requestAnimationFrame(animate);
    }

    // Start animation
    animate();

    // Cleanup on unmount
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      width={400}
      height={120}
      className="w-full h-28 rounded bg-dark-surface border border-dark-border/50"
    />
  );
}