import { useContext } from 'react';
import { ScrapeContext } from './ScrapeContext';
import Table from './Table';
import Chart from './Chart';

export default function Data() {
  const { scrapes, fetchScrapes } = useContext(ScrapeContext);
  return (
    <div>
      <button type="button" onClick={fetchScrapes}>
        Get Updated Data
      </button>
      <h2>Your Data: </h2>
      <Chart data={scrapes.instagram} dataKey="date" />
      <Table scrapes={scrapes.instagram} />
    </div>
  );
}
