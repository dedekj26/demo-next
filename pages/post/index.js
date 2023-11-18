import Head from "next/head";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Navbar from "@/components/Navbar";
import { usePost } from "@/hooks/post";
import { useState } from "react";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Demo() {
     const { data, store, update, destroy } = usePost("/api/post");
     const [id, setId] = useState("");
     const [title, setTitle] = useState("");
     const [content, setContent] = useState("");

     function updateModal({ id, title, content }) {
          setId(id);
          setTitle(title);
          setContent(content);

          document.getElementById("my_modal_3").showModal();
     }

     function print(row_data) {
          if (row_data.length > 0) {
               const doc = new jsPDF();
               const data = [];

               row_data.map((value, index) => {
                    data.push([
                         index + 1,
                         value.name,
                         value.content,
                         new Date(value.created_at).toLocaleString("ID", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                         }),
                    ]);
               });

               doc.text("Laporan Data Post", 14, 15);

               doc.autoTable({
                    head: [
                         ["No", "Judul", "Konten", "Tanggal"],
                    ],
                    body: data,
                    startY: 22,
               });

               doc.save("report_post.pdf");
          } else {
               Swal.fire({
                    icon: "info",
                    title: "Info",
                    text: "Tidak ada data",
               });
          }
     }

     return (
          <>
               <Head>
                    <title>Post | Latihan Next JS</title>
               </Head>

               <Navbar />

               <Card title={"Data Post"}>
                    <div className="flex justify-end">
                         <Button
                              state="btn-info"
                              onClick={() =>
                                   document
                                        .getElementById("my_modal_2")
                                        .showModal()
                              }
                         >
                              Buat Data
                         </Button>

                         <Button
                              state="btn-info"
                              onClick={() => {
                                   print(data?.data);
                              }}
                         >
                              Generate Laporan
                         </Button>
                    </div>

                    <div className="overflow-x-auto">
                         <table className="table table-zebra">
                              {/* head */}
                              <thead>
                                   <tr>
                                        <th>No</th>
                                        <th>Judul</th>
                                        <th>Konten</th>
                                        <th>Aksi</th>
                                   </tr>
                              </thead>

                              <tbody>
                                   {data?.data?.map((value, index) => {
                                        return (
                                             <tr key={value.id}>
                                                  <th>{index + 1}</th>
                                                  <td>{value.name}</td>
                                                  <td>{value.content}</td>
                                                  <td>
                                                       <Button
                                                            state="btn-success"
                                                            onClick={(
                                                                 event
                                                            ) => {
                                                                 updateModal({
                                                                      id: value.id,
                                                                      title: value.name,
                                                                      content: value.content,
                                                                 });
                                                            }}
                                                       >
                                                            Edit
                                                       </Button>

                                                       <Button
                                                            state="btn-error"
                                                            onClick={(
                                                                 event
                                                            ) => {
                                                                 event.preventDefault();
                                                                 destroy({
                                                                      id: value.id,
                                                                      nama: value.name,
                                                                 });
                                                            }}
                                                       >
                                                            Hapus
                                                       </Button>
                                                  </td>
                                             </tr>
                                        );
                                   })}
                              </tbody>
                         </table>
                    </div>
               </Card>

               {/* Modal Create */}
               <dialog id="my_modal_2" className="modal">
                    <div className="modal-box">
                         <form
                              onSubmit={(event) => {
                                   event.preventDefault();
                                   store({
                                        values: {
                                             name: title,
                                             content: content,
                                        },
                                   });
                              }}
                         >
                              <input
                                   type="text"
                                   placeholder="Judul"
                                   className="input input-bordered w-full my-2"
                                   onChange={(event) => {
                                        setTitle(event.target.value);
                                   }}
                              />

                              <input
                                   type="text"
                                   placeholder="Konten"
                                   className="input input-bordered w-full my-2"
                                   onChange={(event) => {
                                        setContent(event.target.value);
                                   }}
                              />

                              <div className="flex justify-end">
                                   <Button state="btn-info">Simpan</Button>
                              </div>
                         </form>
                    </div>
                    <form
                         method="dialog"
                         className="modal-backdrop"
                         id="closeModal"
                    >
                         <button>close</button>
                    </form>
               </dialog>

               {/* Modal Update */}
               <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">
                         <form
                              onSubmit={(event) => {
                                   event.preventDefault();
                                   update({
                                        id: id,
                                        values: {
                                             name: title,
                                             content: content,
                                        },
                                   });
                              }}
                         >
                              <input
                                   type="text"
                                   placeholder="Judul"
                                   className="input input-bordered w-full my-2"
                                   onChange={(event) => {
                                        setTitle(event.target.value);
                                   }}
                                   value={title}
                              />

                              <input
                                   type="text"
                                   placeholder="Konten"
                                   className="input input-bordered w-full my-2"
                                   onChange={(event) => {
                                        setContent(event.target.value);
                                   }}
                                   value={content}
                              />

                              <div className="flex justify-end">
                                   <Button state="btn-info">Simpan</Button>
                              </div>
                         </form>
                    </div>
                    <form
                         method="dialog"
                         className="modal-backdrop"
                         id="closeModal2"
                    >
                         <button>close</button>
                    </form>
               </dialog>
          </>
     );
}
