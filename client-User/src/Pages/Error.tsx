import { isRouteErrorResponse, useRouteError } from "react-router";
import { Link } from "react-router";
import { useLocation } from "react-router";

export default function ErrorPage() {
  const error = useRouteError();
  const location = useLocation();

  console.error(error);

  //  default fallback messages
  let title = "Oops!";
  let message = "Something went wrong on our end.";

  //  specific React Router data responses (like 404 Not Found)
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = "Page Not Found";
      message = "The page you are looking for does not exist.";
    } else if (error.status === 401) {
      title = "Unauthorized";
      message = "You do not have permission to view this page.";
    } else if (error.status === 503) {
      title = "Service Unavailable";
      message = "Our database seems to be down.";
    }
  } else if (error instanceof Error) {
    // Handle standard JavaScript/Render runtime errors
    message = error.message;
  } else if (location.state?.message) {
    // fallback for navigate()-triggered errors-not caught by router error boundary
    title = location.state.title ?? title;
    message = location.state.message;
  }

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>{title}</h1>
      <p>{message}</p>
      <Link to="/">Go back Home</Link>
    </div>
  );
}
