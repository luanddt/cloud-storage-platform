import { formatDateTime } from "@/lib/utils";

const DateTime = ({ date, className }: { date: string; className?: string }) => {
  return (
    <p className={className}>
      {formatDateTime(date)}
    </p>
  );
};

export default DateTime;