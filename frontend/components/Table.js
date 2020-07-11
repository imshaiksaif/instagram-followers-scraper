import { formatDistanceToNow } from 'date-fns';

export default function Table({ scrapes }) {
  return (
    <table>
      <thead>
        <tr>
          <td>Count</td>
          <td>Time</td>
        </tr>
      </thead>
      <tbody>
        {scrapes.map(scrape => (
          <tr key={scrape.date}>
            <td>{scrape.count}</td> <td>{formatDistanceToNow(scrape.date)} </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
