// Simple confetti effect
export const createConfetti = () => {
  const colors = ['#6F4E37', '#4CAF50', '#FFD700', '#FF6B6B', '#4ECDC4'];
  const confettiCount = 50;
  
  for (let i = 0; i < confettiCount; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 10 + 5;
      const left = Math.random() * 100;
      const duration = Math.random() * 3 + 2;
      
      confetti.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        left: ${left}%;
        top: -10px;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: confetti-fall ${duration}s linear forwards;
      `;
      
      document.body.appendChild(confetti);
      
      setTimeout(() => {
        confetti.remove();
      }, duration * 1000);
    }, i * 20);
  }
  
  // Add animation if not exists
  if (!document.getElementById('confetti-style')) {
    const style = document.createElement('style');
    style.id = 'confetti-style';
    style.textContent = `
      @keyframes confetti-fall {
        to {
          transform: translateY(100vh) rotate(360deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
};
