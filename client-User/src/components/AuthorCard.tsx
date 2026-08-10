import { Card, Flex, Box, Avatar, Text } from "@radix-ui/themes";
import AuthorIcon from "../assets/icons/authorIcon.jpg";

export function AuthorCard() {
  return (
    <div>
      <p className="font-[Nabla] text-amber-600 sm:text-xl">
        Author: Shriyash Ghimire
      </p>
      <a
        className="block w-fit text-inherit no-underline"
        href="https://shriyash.dev/"
        target="_blank"
      >
        <Box maxWidth="250px">
          <Card>
            <Flex gap="3" align="center">
              <Avatar size="3" src={AuthorIcon} radius="full" fallback="T" />
              <Box>
                <Text as="div" size="2" weight="bold"></Text>
                <Text as="div" size="2" color="gray">
                  Full Stack Developer <br />
                  Student @ CSM
                </Text>
              </Box>
            </Flex>
          </Card>
        </Box>
      </a>
    </div>
  );
}
