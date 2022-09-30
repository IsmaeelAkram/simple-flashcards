// function Note({ name, content, id }) {
//     return (
//         <li>
//             <a
//                 href=""
//                 onClick={(e) => {
//                     e.preventDefault();
//                     setFocusedNote(name);
//                 }}
//                 key={name}
//             >
//                 {name}
//             </a>
//         </li>
//     );
// }

export default class Note {
	constructor(name, content, id) {
		this.name = name;
		this.content = content;
		this.id = id;
	}
}
