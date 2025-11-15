import { formatDateTime } from "@/lib/utils";

const FormattedDateTime = ({ date }: { date: string }) => {
  return (
    <p className="body-2">
      {formatDateTime(date)}
    </p>
  );
};

export default FormattedDateTime;