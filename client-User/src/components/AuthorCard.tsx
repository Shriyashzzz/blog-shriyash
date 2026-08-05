import { Card, Flex, Box, Avatar, Text } from "@radix-ui/themes";

export function AuthorCard() {
  return (
    <>
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
              <Avatar
                size="3"
                src="https://scontent-sjc6-1.xx.fbcdn.net/v/t39.30808-6/684262166_26612009511790748_2315032028178435336_n.jpg?stp=cp6_dst-jpg_tt6&cstp=mx2048x2048&ctp=s2048x2048&_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=r-iOFVaVBREQ7kNvwFSiHTI&_nc_oc=AdpxCQ2Llo91ug6hX1E0jvPx8aewLeH0Tlu3LnDlkU9xTrydym602IztwBsgqyalqvJ8onM8GYXlHsFyhm6jXfE6&_nc_zt=23&_nc_ht=scontent-sjc6-1.xx&_nc_gid=_tntilGb5NTS23LVOdpo8g&_nc_ss=7b2a8&oh=00_AQG1oDZtmr36czaM4cRjECG2Ezr0wgNiTBQJ8W8uSMkSqw&oe=6A78F759"
                radius="full"
                fallback="T"
              />
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
    </>
  );
}
