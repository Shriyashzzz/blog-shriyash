import { Box, Container } from "@radix-ui/themes";

interface Props {
  post: Post;
}

export function PostItem({ post }: Props) {
  return (
    <Box
      style={{
        background: "var(--gray-a2)",
        borderRadius: "var(--radius-3)",
      }}
    >
      <Container size="1" className="w-full h-full"></Container>
    </Box>
  );
}
