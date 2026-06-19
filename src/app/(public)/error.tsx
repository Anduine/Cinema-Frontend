"use client";

import { useEffect } from "react";

function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="information-block">
      <h2>Щось пішло не так!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Спробувати знову</button>
    </div>
  );
}
export default Error;
