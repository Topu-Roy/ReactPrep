import Link from "next/link";

export default function AdminPage() {
  return (
    <div>
      <Link href={"/admin/questions"}>Questions</Link>
      <Link href={"/admin/settings"}>Settings</Link>
      <Link href={"/admin/questions/new"}>Topics</Link>
    </div>
  );
}
