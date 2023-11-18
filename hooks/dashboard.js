import useSWR from "swr";
import axios from "axios";
import Swal from "sweetalert2";

export const useDashboard = (api) => {
     const { data, mutate } = useSWR(api, (url) =>
          axios
               .get(url)
               .then((response) => {
                    return response.data;
               })
               .catch((error) => {
                    Swal.fire({
                         icon: "error",
                         title: "Error",
                         text: "terjadi kesalahan",
                    });
                    console.log(error.message);
               })
     );

     return {
          data,
     };
};
