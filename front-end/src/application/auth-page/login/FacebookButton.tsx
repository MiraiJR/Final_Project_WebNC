import { useAuth0 } from "@auth0/auth0-react";

const FacebookButton = () => {
  const { loginWithPopup } = useAuth0();

  return (
    <button
      className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded
       cursor-pointer w-full m-3"
      onClick={() =>
        loginWithPopup({
          authorizationParams: {
            connection: "facebook",
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
        className="lucide lucide-facebook mr-3"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
      Log in with Facebook
    </button>
  );
};

export default FacebookButton;
