import { toast } from "react-toastify";
import { dropUser } from "../lib/admin/users/usersAPI";

export const useUsers = () => {
  const deleteUser = async (id, token) => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const handleLoading = delay(1000);

    toast.promise(
      handleLoading.then(() => dropUser(id, token)),
      {
        pending: "Loading...",
        success: {
          render(response) {
            return response.data.message;
          },
          onClose: () => {
            window.location.reload();
          },
        },
        error: {
          render(response) {
            return response.data.message;
          },
        },
      }
    );
  };

  return { deleteUser };
};
