import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Spinner } from "@radix-ui/themes";
import { useNavigate } from "react-router";
import useFetch from "../hooks/useFetch";
import { Grid } from "@radix-ui/themes";
import { MenuBar } from "../components/MenuBar";
import { ToolBar } from "../components/Toolbar";
import { NewsLetterItem } from "../components/NewsLetterItem";

export type NewsLetter = {
  id: number;
  createdAt: Date;
  html: string;
  subject: string;
  draft: boolean;
};

export function Newsletters() {
  const auth = useSelector((state: RootState) => state.auth.value);
  const [newsletters, setNewsLetter] = useState<Array<NewsLetter>>([]);

  const navigate = useNavigate();

  useEffect(() => {
    // navigate to loginPage if admin is not authenticated
    if (!auth.isAuthenticated) {
      navigate("/login");
      return;
    }
  }, [auth]);

  const { data, loading, error } = useFetch<{ data: Array<NewsLetter> }>(
    "/api/newsletter/getall",
    { credentials: "include" },
  );
  useEffect(() => {
    if (data && data.data) {
      setNewsLetter(data.data);
    }
    return () => setNewsLetter([]);
  }, [data]);
  if (error) {
    navigate("/error", {
      state: {
        title: "Error Getting Newsletters",
        message: "No Newsletters to Show",
      },
    });
    return;
  }
  if (loading) return <Spinner />;

  return (
    <section className="sm:w-4/5 w-full h-full p-5 flex flex-col gap-5">
      <ToolBar def={"Newsletters"} />
      <MenuBar
        ButtonText="New Newsletter?"
        OnClickNav="/new/newsletter"
        BtnColor="red"
      />
      <Grid
        columns="repeat(auto-fit, minmax(200px, 350px))"
        rows="repeat(auto-fill, minmax(200px, 250px))"
        gap="3"
        className="w-full"
        justify={"center"}
      >
        {newsletters.map((currLetter) => {
          return <NewsLetterItem key={currLetter.id} NewsLetter={currLetter} />;
        })}
      </Grid>
    </section>
  );
}
