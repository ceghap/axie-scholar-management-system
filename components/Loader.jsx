import { Spinner } from "@chakra-ui/react";

export const Loader = () => {
  return (
    <div className="loader">
      <Spinner size="xl" color="red" />
    </div>
  );
};
