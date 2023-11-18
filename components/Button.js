export default function Button({ state = "btn-info", children, ...props }) {
     return (
          <button className={`btn ${state}`} {...props}>
               {children}
          </button>
     );
}
