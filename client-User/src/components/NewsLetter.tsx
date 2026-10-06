import { Form } from "radix-ui";
import { useEffect, useRef, useState } from "react";

type Props = {
  className?: string;
};

function SubNewsLetter({ className = "" }: Props) {
  const [responseInfo, setResponseInfo] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const showMessage = (msg: string) => {
    window.clearTimeout(timerRef.current);
    setResponseInfo(msg);
    timerRef.current = window.setTimeout(() => setResponseInfo(""), 4000);
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (submitting || !form.checkValidity()) return;

    const email = new FormData(form).get("email");
    setSubmitting(true);
    try {
      const response = await fetch("/api/newsletter/signup", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      console.log(response);
      if (response.ok) {
        showMessage("Thanks for subscribing <3");
        form.reset();
      } else if (response.status === 409) {
        showMessage("You are already subscribed <3");
        form.reset();
      } else {
        showMessage("Unable to subscribe at this moment");
      }
    } catch {
      showMessage("Unable to subscribe at this moment");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={className}>
      <Form.Root className="p-3" onSubmit={handleSubmit}>
        <Form.Field className="mb-2.5 grid" name="email">
          <Form.Label className="font-[Nabla] text-[15px] leading-[35px] font-medium text-green-600 dark:text-white">
            Like my Blogs?
          </Form.Label>
          <Form.Control asChild>
            <input
              className="bg-blackA2 shadow-blackA6 selection:bg-blackA6 box-border inline-flex h-8.75 w-full appearance-none items-center justify-center rounded px-2.5 text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none dark:text-white dark:hover:shadow-[0_0_0_1px_white] dark:focus:shadow-[0_0_0_2px_white]"
              type="email"
              placeholder="email@example.com"
              required
            />
          </Form.Control>
          <Form.Message
            className="flex w-full justify-end text-[13px] text-black opacity-80 dark:text-white"
            match="valueMissing"
          >
            Please enter your email
          </Form.Message>
          <Form.Message
            className="flex w-full justify-end text-[13px] text-black dark:text-white"
            match="typeMismatch"
          >
            Please provide a valid email
          </Form.Message>
        </Form.Field>

        <Form.Submit asChild>
          <button
            disabled={submitting}
            className="hover:bg-mauve3 box-border inline-flex h-8.75 w-full cursor-pointer items-center justify-center rounded bg-gray-300 px-3.75 leading-none font-medium shadow-[0_2px_3px] transition-all duration-100 focus:outline-none focus-visible:shadow-[0_0_0_2px] focus-visible:shadow-green-600 active:translate-y-px active:shadow-none disabled:cursor-wait disabled:opacity-60 dark:bg-gray-500"
          >
            {submitting ? "Subscribing..." : "Subscribe to my newsletter!"}
          </button>
        </Form.Submit>

        <div
          role="status"
          className="flex min-h-6 w-full justify-center p-1 text-[13px] text-black dark:text-white"
        >
          {responseInfo}
        </div>
      </Form.Root>
    </section>
  );
}

export default SubNewsLetter;
