import React, { Suspense } from "react";

const Loadable = (Component) => (props) =>
(
  <Suspense
    fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    }
  >
    <Component {...props} />
  </Suspense>
);

export default Loadable;