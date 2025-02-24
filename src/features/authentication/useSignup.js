import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (data) => {
      console.log("Signup Success:", data);
      toast.success(
        "Account successfully created! Please verify your email address."
      );
    },
    onError: (error) => {
      console.error("Signup Error:", error);
      toast.error(error.message || "Signup failed. Please try again.");
    },
  });

  return { signup, isLoading };
}
