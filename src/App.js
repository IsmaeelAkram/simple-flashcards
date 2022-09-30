import { useState, useRef, useEffect } from 'react';
import Note from './note';

function App() {
	function loadNotes() {
		let notes = localStorage.getItem('notes');
		if (notes) {
			notes = JSON.parse(notes);
			setNotes(notes);
		}
		console.log('Loaded notes');
	}
	function deleteNote(id) {
		let newNotes = notes.filter((note) => note.id !== id);
		setNotes(newNotes);
		if (newNotes.length <= 0) {
			setFocusedNote(-1);
		} else {
			setFocusedNote(newNotes[0].id);
		}
	}
	function addNote(name, content) {
		let newNote = new Note(name, content, notes.length + 1);
		setNotes([...notes, newNote]);
		setFocusedNote(newNote.id);
		setNewNoteContent('');
		setNewNoteName('');
	}
	function getFocusedNote() {
		if (focusedNote === -1) return undefined;
		return notes.find((note) => note.id == focusedNote);
	}

	const [focusedNote, setFocusedNote] = useState(1);
	const [notes, setNotes] = useState([]);
	const [statusMessage, setStatusMessage] = useState('');
	const [time, setTime] = useState(new Date().toLocaleTimeString());

	const [newNoteName, setNewNoteName] = useState('');
	const [newNoteContent, setNewNoteContent] = useState('');

	// loadNotes();
	const isInitialMount = useRef(true);

	useEffect(() => {
		if (isInitialMount.current) {
			loadNotes();
			isInitialMount.current = false;
		} else {
			localStorage.setItem('notes', JSON.stringify(notes));
			console.log('Saved to local storage', notes);
			setStatusMessage(`Last saved at ${new Date().toLocaleTimeString()}`);
		}
	}, [notes]);

	setTimeout(() => {
		setTime(new Date().toLocaleTimeString());
	}, 1000);

	return (
		<div>
			<h2>simple flashcards</h2>

			<div className="note">
				{getFocusedNote() == undefined ? (
					<>
						<p>You do not have any flashcards</p>
					</>
				) : (
					<>
						<h1>{getFocusedNote().name}</h1>
						{getFocusedNote()
							.content.split('\n')
							.map((item, i) => {
								return <p key={i}>{item}</p>;
							})}
					</>
				)}
			</div>
			<ul>
				{notes.map((note) => (
					<li key={note.id}>
						<a
							href=""
							onClick={(e) => {
								setFocusedNote(note.id);
								e.preventDefault();
							}}
						>
							{note.name}
						</a>{' '}
						<button onClick={() => deleteNote(note.id)}>delete</button>
						<button>edit</button>
					</li>
				))}
			</ul>

			{/* Section to add new note with text field */}
			<input
				type="text"
				placeholder="New flashcard name"
				onChange={(e) => {
					setNewNoteName(e.target.value);
				}}
				value={newNoteName}
			/>
			<br />
			<textarea
				placeholder="New flashcard content"
				onChange={(e) => {
					setNewNoteContent(e.target.value);
				}}
				width="500"
				value={newNoteContent}
			></textarea>
			<br />
			<button onClick={() => addNote(newNoteName, newNoteContent)}>add</button>
			<button
				onClick={() => {
					setNotes([]);
					setStatusMessage('Cleared all flashcards');
				}}
			>
				clear
			</button>
			<button
				onClick={() => {
					setNotes([...notes]);
				}}
			>
				save
			</button>
			<br />
			<br />
			<p>{statusMessage}</p>
			<p>Current time: {time}</p>
			<p>by ismaeel akram</p>
		</div>
	);
}

export default App;
