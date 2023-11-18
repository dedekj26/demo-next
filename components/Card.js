export default function Card({ title, children }) {
     return (
          <div className="p-12">
               <p>{title}</p>

               {children}
          </div>
     );
}
