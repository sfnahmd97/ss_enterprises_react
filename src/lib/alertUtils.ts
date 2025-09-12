import Swal from "sweetalert2";

export const confirmAlert = (
  message: string,
  onConfirm: () => void,
  onCancel?: () => void
) => {
  Swal.fire({
    title: "Are you sure?",
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
    } else if (result.isDismissed && onCancel) {
      onCancel();
    }
  });
};

export const successAlert = (message: string) => {
  Swal.fire("Success", message, "success");
};

export const errorAlert = (message: string) => {
  Swal.fire("Error", message, "error");
};

export const infoAlert = (message: string) => {
  Swal.fire("Info", message, "info");
};
