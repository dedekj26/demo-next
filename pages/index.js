import Head from "next/head";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { useState } from "react";
import { useAuth } from "@/hooks/auth";

export default function Login() {
     const { login } = useAuth("/api/auth");
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");

     return (
          <>
               <Head>
                    <title>Login | Latihan Next JS</title>
               </Head>

               <Card title={"Login"}>
                    <form
                         onSubmit={(event) => {
                              event.preventDefault();
                              login({
                                   email: email,
                                   password: password,
                              });
                         }}
                    >
                         <input
                              type="text"
                              placeholder="Email"
                              className="input input-bordered w-full my-2"
                              onChange={(event) => {
                                   setEmail(event.target.value);
                              }}
                         />

                         <input
                              type="password"
                              placeholder="Password"
                              className="input input-bordered w-full my-2"
                              onChange={(event) => {
                                   setPassword(event.target.value);
                              }}
                         />

                         <div className="flex justify-end">
                              <Button state="btn-info">Simpan</Button>
                         </div>
                    </form>
               </Card>
          </>
     );
}
