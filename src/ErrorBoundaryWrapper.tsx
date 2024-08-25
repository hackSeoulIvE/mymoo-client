import Error from "@src/pages/error/Error";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { useLocation } from "react-router-dom";

type ErrorBoundaryWrapperProps = {
  children: React.ReactNode;
  fullScreen?: boolean;
};
const ErrorBoundaryWrapper = ({
  children,
  fullScreen,
}: ErrorBoundaryWrapperProps) => {
  const location = useLocation();
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          key={location.pathname}
          fallbackRender={({ error, resetErrorBoundary }) => (
            <Error
              error={error}
              resetErrorBoundary={resetErrorBoundary}
              fullScreen={fullScreen}
            />
          )}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default ErrorBoundaryWrapper;
