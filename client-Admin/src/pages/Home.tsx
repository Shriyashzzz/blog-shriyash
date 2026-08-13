import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Spinner } from "@radix-ui/themes";
import { useNavigate } from "react-router";
import useFetch from "../hooks/useFetch";
import { PostItem } from "../components/PostItem";
import { Grid } from "@radix-ui/themes";
import { MenuBar } from "../components/MenuBar";
export function Home() {
  const auth = useSelector((state: RootState) => state.auth.value);
  const navigate = useNavigate();
  useEffect(() => {
    // navigate to loginPage if admin is not authenticated
    if (!auth.isAuthenticated) {
      navigate("/login");
      return;
    }
  }, [auth]);

  const { data, loading, error } = useFetch<{ posts: Array<Post> }>(
    "/api/admin/posts",
  );

  if (error) {
    navigate("/error", {
      state: { title: "Error Getting posts", message: "No Posts to Show" },
    });
    return;
  }
  if (loading) return <Spinner />;
  console.log(data);
  if (data && data.posts)
    return (
      <section className="w-4/5 p-5 flex flex-col gap-5">
        <MenuBar />

        <Grid
          columns="repeat(auto-fit, minmax(250px, 350px))"
          gap="3"
          className="h-full w-full"
          justify={"center"}
        >
          {data.posts &&
            data.posts.map((post) => {
              return <PostItem post={post} key={post.id} />;
            })}
        </Grid>
      </section>
    );
}
