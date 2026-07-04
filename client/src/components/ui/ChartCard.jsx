import Card, { CardBody, CardTitle } from './Card';

export default function ChartCard({ title, subtitle, children, action }) {
  return (
    <Card>
      <CardBody>
        <div className="flex items-center justify-between mb-4">
          <div>
            <CardTitle>{title}</CardTitle>
            {subtitle && <p className="text-sm text-base-content/60 mt-1">{subtitle}</p>}
          </div>
          {action}
        </div>
        {children}
      </CardBody>
    </Card>
  );
}
