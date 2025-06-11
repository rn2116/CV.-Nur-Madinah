import { redirect } from "next/navigation"; 


export default function Home(){

  redirect('/Signin');

  return (
    <div>
      <h1>Redirecting to Home Page...</h1>
    </div>
  )
}