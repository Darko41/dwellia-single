import { Link } from "react-router-dom";

export default function UnitCard({ unit }) {
  return (
    <Link to={`/units/${unit.id}`} className="card">
      <div className="card-header">
        <h3>{unit.title}</h3>
        <span className={`badge ${unit.status.toLowerCase()}`}>
          {unit.status}
        </span>
      </div>

      <p className="description">{unit.description}</p>

      <div className="card-footer">
        <div className="price">${unit.price} / month</div>
        <div className="meta">
          {unit.bedrooms} bed · {unit.bathrooms} bath
        </div>
      </div>
    </Link>
  );
}