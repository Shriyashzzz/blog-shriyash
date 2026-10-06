import { Form } from "radix-ui";
import { useRef, useState } from "react";

type Props = {
  className: String;
};
function SubNewsLetter({ className }: Props) {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const [responseInfo, setResponseInfo] = useState<String>("");

  const handleSubscribeClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();

    if (!emailRef.current) return;
    const emailBody = JSON.stringify({
      email: emailRef.current.value,
    });
    const response = await fetch("/api/newsletter/signup", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: emailBody,
    });
    if (response.ok && response.status == 200) {
      setResponseInfo("Thanks for subscribing <3");
      emailRef.current.value = "";
      setTimeout(() => {
        setResponseInfo("");
      }, 4000);
      return;
    }
    if (response.status == 409) {
      setResponseInfo("You are already subscribed <3");
      emailRef.current.value = "";
      setTimeout(() => {
        setResponseInfo("");
      }, 4000);
      return;
    }
    if (!response.ok) {
      setResponseInfo("Unable to subscribe at this moment");
      emailRef.current.value = "";
      setTimeout(() => {
        setResponseInfo("");
      }, 4000);
      return;
    }
  };

  return (
    <section className={`${className} `}>
      <Form.Root className="p-3">
        <Form.Field className="mb-2.5 grid" name="email">
          <div className="flex w-full flex-col items-baseline justify-between">
            <Form.Label className="flex-col font-[Nabla] text-sm text-[15px] leading-[35px] font-medium text-green-600 dark:text-white">
              <p className="">Like my Blogs? </p>
            </Form.Label>
          </div>
          <Form.Control asChild>
            <input
              ref={emailRef}
              className="bg-blackA2 shadow-blackA6 selection:bg-blackA6 selection:text-gray box-border inline-flex h-8.75 w-full appearance-none items-center justify-center rounded px-2.5 text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none dark:border-white dark:text-white dark:hover:shadow-[0_0_0_1px_white] dark:focus:shadow-[0_0_0_2px_white]"
              type="email"
              placeholder="email@example.com"
              required
            />
          </Form.Control>
          <Form.Message
            className="w-full text-[13px] text-black opacity-80 dark:text-white"
            match="valueMissing"
          >
            <p className="flex w-full justify-end">Please enter your email</p>
          </Form.Message>
          <Form.Message
            className="w-full text-[13px] text-black dark:text-white"
            match="typeMismatch"
          >
            <p className="flex w-full justify-end">
              {" "}
              Please provide a valid email
            </p>
          </Form.Message>
        </Form.Field>

        <Form.Submit asChild>
          <button
            onClick={(e) => handleSubscribeClick(e)}
            className="hover:bg-mauve3 box-border inline-flex h-8.75 w-full cursor-pointer items-center justify-center rounded bg-gray-300 px-3.75 leading-none font-medium shadow-[0_2px_3px] transition-all duration-100 focus:outline-none focus-visible:shadow-[0_0_0_2px] active:translate-y-px active:shadow-none disabled:cursor-wait disabled:opacity-60 dark:bg-gray-500"
          >
            Subscribe to my newsletter!
          </button>
        </Form.Submit>
        <div className="w-full p-1 text-[13px] text-black dark:text-white">
          <p className="flex w-full justify-center"> {responseInfo} </p>
        </div>
      </Form.Root>{" "}
    </section>
  );
}

export default SubNewsLetter;
