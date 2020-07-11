import { useEffect, useState } from 'react';
import { da } from 'date-fns/locale';
import { ScrapeProvider } from './ScrapeContext';

function useScrapes() {
  // Initial State inside our hook
  const [scrapes, setScrapes] = useState({ instagram: [] });

  // Fetch function
  async function fetchScrapes() {
    const res = await fetch('http://localhost:4444/data');
    const data = await res.json();
    setScrapes(data);
  }

  // didMount / didUpdate
  useEffect(() => {
    fetchScrapes();
  }, []);
  return { scrapes, fetchScrapes };
}

export default function Page({ children }) {
  const hookInfo = useScrapes();
  return (
    <ScrapeProvider value={hookInfo}>
      <div className="page">{children}</div>
    </ScrapeProvider>
  );
}
