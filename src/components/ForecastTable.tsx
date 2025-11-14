type Props = {
  dates: string[];
  min: number[];
  max: number[];
};

export function ForecastTable({ dates, min, max }: Props) {
  if (!dates.length) return null;

  return (
    <div className="table-wrap">
      <table>
        <caption>Daily temperatures</caption>
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Min (°C)</th>
            <th scope="col">Max (°C)</th>
          </tr>
        </thead>
        <tbody>
          {dates.map((d, i) => (
            <tr key={d}>
              <td>{d}</td>
              <td>{min[i]}°</td>
              <td>{max[i]}°</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
