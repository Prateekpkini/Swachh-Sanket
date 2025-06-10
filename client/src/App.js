import { useEffect, useRef } from 'react';
import styles from './App.module.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const wardData = [
  { name: 'Kadri South', collected: 1250 },
  { name: 'Bendoor', collected: 980 },
  { name: 'Hampankatta', collected: 1135 },
  { name: 'Surathkal', collected: 1430 },
  { name: 'Jeppinamogaru', collected: 890 },
  { name: 'Kankanady', collected: 1020 },
];

function App() {
  const particlesContainerRef = useRef(null);

  useEffect(() => {
    const container = particlesContainerRef.current;
    const particleCount = window.innerWidth < 768 ? 20 : 40;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add(styles.particle);

      const size = Math.random() * 4 + 2;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * 3;
      const duration = 12 + Math.random() * 10;
      const opacity = 0.2 + Math.random() * 0.4;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.opacity = opacity;
      particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;

      container.appendChild(particle);
    }
  }, []);

  const handleDispatch = (ward) => {
    alert(`🚛 Vehicle dispatched to ${ward}`);
    // You can later connect this to a backend API.
  };

  return (
    <div className={styles.container}>
      <div className={styles.particles} ref={particlesContainerRef}></div>

      <header className={styles.header}>
        <h1>Swachh Sanket</h1>
        <p>Mangaluru City Ward-wise Trash Collection Stats</p>
      </header>

      <section className={styles.statsSection}>
        {wardData.map((ward, index) => (
          <div className={styles.wardCard} key={index}>
            <h2>{ward.name}</h2>
            <p><strong>{ward.collected}</strong> kg Collected</p>
            <button className={styles.dispatchBtn} onClick={() => handleDispatch(ward.name)}>
              Dispatch Vehicle
            </button>
          </div>
        ))}
      </section>

      <section className={styles.chartSection}>
        <h2 className={styles.chartHeading}>Ward-wise Trash Collection (kg)</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={wardData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#ffffff" />
            <YAxis stroke="#ffffff" />
            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', color: '#fff' }} />
            <Bar dataKey="collected" fill="#10b981" barSize={40} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </section>

      <footer className={styles.footer}>
        <p>&copy; 2025 Swachh Sanket | Clean Mangaluru, Green Mangaluru</p>
      </footer>
    </div>
  );
}

export default App;
