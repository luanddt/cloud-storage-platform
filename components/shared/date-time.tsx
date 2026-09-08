import { formatDateTime } from "@/lib/utils";

const DateTime = ({ date, className }: { date: string; className?: string }) => {
  return (
    <div className={className}>
      {formatDateTime(date)}
    </div>
  );
};

export default DateTime;