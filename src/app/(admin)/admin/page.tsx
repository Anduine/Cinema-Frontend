"use client";

import styles from "./AdminPage.module.css";

function AdminHomePage() {
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fileInput = e.currentTarget.elements.namedItem("fileInput") as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      const formdata = new FormData();
      formdata.append("video_file", file);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <h1>Панель адміністратора</h1>
    </div>
  );
}
export default AdminHomePage;
