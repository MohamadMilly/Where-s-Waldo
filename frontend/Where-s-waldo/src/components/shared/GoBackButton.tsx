import { useNavigate } from "react-router";
import { Button } from "../ui/Button/Button";
import { ArrowBigLeft } from "lucide-react";

export function GoBackButton({ className = "" }: { className?: string }) {
  const navigate = useNavigate();

  return (
    <Button className={className} onClick={() => navigate(-1)}>
      <ArrowBigLeft />
    </Button>
  );
}
