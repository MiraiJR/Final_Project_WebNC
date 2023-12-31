import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./shared/components/providers/AuthProvider";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./shared/libs/react-query";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer position="bottom-right" autoClose={500} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
