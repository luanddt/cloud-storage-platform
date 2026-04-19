import { formatDateTime } from "@/lib/utils";

const FormattedDateTime = ({
  date,
  className
}: FormattedDateTimeProps) => {
  return (
    <p className={className}>
      {formatDateTime(date)}
    </p>
  );
};

export default FormattedDateTime;