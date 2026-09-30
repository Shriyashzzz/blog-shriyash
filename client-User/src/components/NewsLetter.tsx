import { Form } from "radix-ui";
import { useRef } from "react";

type Props = {
  className: String;
};
function SubNewsLetter({ className }: Props) {
  const emailRef = useRef<HTMLInputElement | null>(null);

  const handleSubscribeClick = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!e.currentTarget || !e.currentTarget.value) return;
    const 
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
              className="bg-blackA2 shadow-blackA6 selection:bg-blackA6 box-border inline-flex h-8.75 w-full appearance-none items-center justify-center rounded px-2.5 text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none selection:text-white hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] dark:text-white"
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
            className="text-violet11 hover:bg-mauve3 shadow-white-100 box-border inline-flex h-8.75 w-full cursor-pointer items-center justify-center rounded bg-amber-500 px-3.75 leading-none font-medium shadow-[0_2px_6px] focus:shadow-[0_0_0_2px] focus:shadow-green-600 focus:outline-none"
          >
            Subscribe to my newsletter
          </button>
        </Form.Submit>
      </Form.Root>{" "}
    </section>
  );
}

export default SubNewsLetter;
