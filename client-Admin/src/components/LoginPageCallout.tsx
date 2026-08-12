import { Callout } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";

export function LoginPageCallOut() {
  return (
    <div className="p-4">
      <Callout.Root>
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>
          You will need admin privileges to access this CMS. Visit the{" "}
          <a
            href={import.meta.env.VITE_BLOG_SITE_ADDRESS}
            target="_blank"
            className="border-b text-amber-50"
          >
            blog
          </a>{" "}
          to read articles instead.
        </Callout.Text>
      </Callout.Root>
    </div>
  );
}
