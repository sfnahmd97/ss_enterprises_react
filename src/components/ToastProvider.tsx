import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        className: "",
        duration: 4000,
        style: {
          background: "#333",
          color: "#fff",
          borderRadius: "12px",
          padding: "12px 16px",
        },
        success: {
          style: {
            background: "#4caf50",
            color: "#fff",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#4caf50",
          },
        },
        error: {
          style: {
            background: "#f44336",
            color: "#fff",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#f44336",
          },
        },
      }}
    />
  );
}
