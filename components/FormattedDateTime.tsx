import { cn, formatDateTime } from "@/lib/utils";

const FormattedDateTime = ({
  date,
  className
}: {
  date: string;
  className?: string;
}) => {
  return (
    <p className={cn("", className)}>
      {formatDateTime(date)}
    </p>
  );
};

export default FormattedDateTime;