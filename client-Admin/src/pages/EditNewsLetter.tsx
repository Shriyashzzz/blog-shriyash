import { useParams } from "react-router";

export function EditNewsLetter() {
  const { letterId } = useParams();
  return <>Edit News Letter</>;
}
