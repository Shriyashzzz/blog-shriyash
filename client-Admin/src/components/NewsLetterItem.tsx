import { Box, Button } from "@radix-ui/themes";
import {
  CalendarIcon,
  CheckCircledIcon,
  CrossCircledIcon,
} from "@radix-ui/react-icons";
import { dateParser } from "../util/dateParse";
import { NewsLetter } from "../pages/Newsletters";
import { useNavigate } from "react-router";

interface Props {
  NewsLetter: NewsLetter;
}

export function NewsLetterItem({ NewsLetter }: Props) {
  const navigate = useNavigate();
  return (
    <Box
      style={{
        background: "var(--gray-a2)",
        borderRadius: "var(--radius-3)",
        minWidth: "0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <section className="p-6 justify-between h-fit ">
        <div className="flex justify-center gap-4 flex-col min-w-0">
          <h1 className="font-extrabold">{NewsLetter.subject}</h1>
          <span className="flex items-center gap-2 ">
            <CalendarIcon /> {dateParser(NewsLetter.createdAt)}
          </span>

          <span className="flex items-center gap-2">
            Sent:{" "}
            {!NewsLetter.draft ? <CheckCircledIcon /> : <CrossCircledIcon />}
          </span>
        </div>
      </section>
      {/* buttons */}
      {!NewsLetter.draft && (
        <div className="p-5 w-full flex justify-start ">
          <Button
            style={{ cursor: "pointer" }}
            color={"green"}
            onClick={() => navigate(`/edit/newsletter/:${NewsLetter.id}`)}
          >
            Edit Letter
          </Button>
        </div>
      )}
    </Box>
  );
}
