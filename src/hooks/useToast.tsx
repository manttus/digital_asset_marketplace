import { useToast } from "@chakra-ui/react";

const useCustomToast = () => {
  const toast = useToast();
  const showToast = (
    title: string,
    status: "success" | "warning" | "error" | "info",
    duration: number
  ) => {
    toast({
      title,
      status,
      duration,
      variant: "top-accent",
      position: "top-left",
      isClosable: true,
    });
  };
  return {
    showToast,
  };
};

export default useCustomToast;
