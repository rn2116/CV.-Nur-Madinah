import Link from "next/link";
export default function Home() {
  return (
    <main className="max-w-4xl mx-auto mt-4">
        <div className="text-center my-5 flex flex-col gap-4">
          <h1 className=" text-2xl font-bold">TASKS</h1>
        </div>

        <div className="card bg-base-100 w-96 shadow-sm">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Card Title</h2>
            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
              <Link href="/Signin"> <span className="text-blue-500 hover:underline cursor-pointer">Lihat Syarat</span></Link>
            </div>
          </div>
        </div>
    </main>
  );
}