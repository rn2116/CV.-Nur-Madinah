import { redirect } from "next/navigation"; 


export default function Home(){

  redirect('/Homepage');

  return (
    <div>
      <h1>Redirecting to Home Page...</h1>
    </div>
  )
}