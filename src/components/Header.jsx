import Link from "next/link";
import { navigation } from "@/data/navigation";

export default function Header() {
  return (
    <header className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <h1 className="font-bold text-2xl">
          MyCompany
        </h1>

        <nav>
          <ul className="flex gap-6">
            {navigation.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className="hover:text-blue-400 transition"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}