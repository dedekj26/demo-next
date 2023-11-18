import axios from "axios";
import Swal from "sweetalert2";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

export const useAuth = () => {
     const router = useRouter();
     const [cookies, setCookie, removeCookie] = useCookies(["user"]);

     const login = async (values) => {
          axios.post("/api/user/login", values)
               .then((response) => {
                    const users_data = {
                         name: response.data.data.name,
                         email: response.data.data.email,
                    };

                    setCookie("user", JSON.stringify(users_data), {
                         path: "/",
                         maxAge: 3600,
                         sameSite: true,
                    });

                    Swal.fire({
                         icon: "success",
                         title: "Berhasil",
                         text: "Berhasil Masuk",
                    }).then((result) => {
                         router.reload();
                    });
               })
               .catch((error) => {
                    Swal.fire("Error", error.response.data.error, "error");
               });
     };

     const logout = async (values) => {
          removeCookie("user", { path: "/" });

          Swal.fire({
               icon: "success",
               title: "Berhasil",
               text: "Berhasil Keluar",
          }).then((result) => {
               window.location.href = "/";
          });
     };

     return {
          login,
          logout,
     };
};
