import Link from "next/link";

function NotFound() {
  return (
    <div>
      <p>Сторінка не знайдена</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
export default NotFound;
