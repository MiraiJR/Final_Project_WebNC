import { useAuth0 } from "@auth0/auth0-react";

const GoogleButton = () => {
  const { loginWithPopup } = useAuth0();

  return (
    <button
      className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded 
      cursor-pointer w-full m-3"
      onClick={() =>
        loginWithPopup({
          authorizationParams: {
            connection: "google-oauth2",
          },
        })
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-mail mr-3"
      >
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
      Log in with Google
    </button>
  );
};

export default GoogleButton;
