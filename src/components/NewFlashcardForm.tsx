import { useState } from 'react';
import card from '../card';

export default function NewFlashcardForm({
	cards,
	setCards,
	setStatusMessage,
	saveCards,
}: {
	cards: card[];
	setStatusMessage: React.Dispatch<React.SetStateAction<string>>;
	setCards: React.Dispatch<React.SetStateAction<card[]>>;
	saveCards: () => void;
}) {
	const [newCard, setNewCard] = useState<card>({ id: crypto.randomUUID(), name: '', content: '' });

	return (
		<div>
			<input
				type="text"
				placeholder="flashcard name"
				onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
				value={newCard.name}
			/>
			<br />
			<textarea
				placeholder="flashcard content"
				onChange={(e) => setNewCard({ ...newCard, content: e.target.value })}
				value={newCard.content}
			></textarea>
			<br />
			<button
				onClick={() => {
					setCards([...cards, newCard]);
					setNewCard({ id: crypto.randomUUID(), name: '', content: '' });
					setStatusMessage('Added ' + newCard.name);
				}}
			>
				add
			</button>
			<button
				onClick={() => {
					setCards([]);
					setStatusMessage('Cleared');
				}}
			>
				clear
			</button>
			<button onClick={saveCards}>save</button>
			<br />
			<br />
			{/* <pre>{JSON.stringify(newCard, undefined, 2)}</pre> */}
		</div>
	);
}
