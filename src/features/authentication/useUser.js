import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser, // Refetch user from backend
    retry: false, // Avoid infinite retries if not authenticated
  });

  return { isLoading, user, isAuthenticated: !!user };
}
