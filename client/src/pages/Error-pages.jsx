import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="text-center flex flex-col items-center justify-center fixed inset-0">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/login">
        <button className="mt-2 rounded-xl bg-[#523c72] text-white py-2 px-4 hover:bg-[#9a83ba] active:scale-[.97] hover:scale-[1.03] transition duration-200 ">
            Kembali ke Home
        </button>
      </Link>
    </div>
  );
}
