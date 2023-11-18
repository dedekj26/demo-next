import useSWR from "swr";
import axios from "axios";
import Swal from "sweetalert2";

export const usePost = (api) => {
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

     const store = async ({ values }) => {
          await axios
               .post("/api/post", values)
               .then((response) => {
                    Swal.fire({
                         icon: "success",
                         title: "Berhasil",
                         text: "berhasil simpan data",
                    });
                    mutate();

                    document.getElementById("closeModal").submit();
               })
               .catch((error) => {
                    Swal.fire({
                         icon: "error",
                         title: "Error",
                         text: "terjadi kesalahan",
                    });
                    console.log(error.message);
               });
     };

     const update = async ({ id, values }) => {
          await axios
               .patch(`/api/post/${id}`, values)
               .then((response) => {
                    Swal.fire({
                         icon: "success",
                         title: "Berhasil",
                         text: "berhasil update data",
                    });

                    mutate();

                    document.getElementById("closeModal2").submit();
               })
               .catch((error) => {
                    Swal.fire({
                         icon: "error",
                         title: "Error",
                         text: "terjadi kesalahan",
                    });
                    console.log(error.message);
               });
     };

     const destroy = ({ id, nama }) => {
          Swal.fire({
               icon: "warning",
               title: "Anda yakin?",
               text: `Anda akan menghapus konten "${nama}" ?`,
               showCancelButton: true,
               confirmButtonText: "Ya, hapus!",
               confirmButtonColor: "#EF4444",
               cancelButtonColor: "#9CA3AF",
          }).then(async (result) => {
               if (result.isConfirmed) {
                    await axios
                         .delete(`/api/post/${id}`)
                         .then((response) => {
                              Swal.fire(
                                   "Berhasil",
                                   "berhasil hapus data",
                                   "success"
                              );
                              mutate();
                         })
                         .catch((error) => {
                              Swal.fire("Error", "terjadi kesalahan", "error");
                              console.log(error.message);
                         });
               }
          });
     };

     return {
          data,
          store,
          update,
          destroy,
     };
};
