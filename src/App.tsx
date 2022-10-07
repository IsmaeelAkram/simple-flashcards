import { useEffect, useState, useRef } from 'react';
import NewFlashcardForm from './components/NewFlashcardForm';
import CardList from './components/CardList';
import CardView from './components/CardView';
import card from './card';
import QuizletButton from './components/QuizletButton';

function App() {
	const [cardSet, setCardSet] = useState<string | null>(null);
	const [cards, setCards] = useState<card[]>([]);
	const [focusedCard, setFocusedCard] = useState<card | null>(null);
	const [statusMessage, setStatusMessage] = useState<string>('Hello there');
	const [time, setTime] = useState<string>(new Date().toLocaleTimeString());

	setTimeout(() => {
		setTime(new Date().toLocaleTimeString());
	}, 1000);

	function loadCards(src = localStorage.getItem('cards')) {
		let newCards = src || '';
		let setName = localStorage.getItem('set') || null;
		setCardSet(setName);
		if (cards) {
			try {
				let jsonNewCards = JSON.parse(newCards);
				setCards(jsonNewCards);
				console.log('Loaded cards', newCards);
				setStatusMessage('Loaded cards at ' + new Date().toLocaleTimeString());
			} catch (e) {
				console.error(e);
			}
		}
	}

	function saveCards() {
		if (cardSet) {
			localStorage.setItem('set', cardSet);
		}
		localStorage.setItem('cards', JSON.stringify(cards));
		console.log('Saved', cards);
		setStatusMessage('Saved cards at ' + new Date().toLocaleTimeString());
	}

	function saveSet() {
		const name = prompt('Enter a name for the set') || 'untitled';
		const blob = new Blob([JSON.stringify(cards)], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.download = `${name}.json`;
		link.href = url;
		link.click();
		setCardSet(name);
		localStorage.setItem('set', name);
	}

	function loadSet() {
		const fileInput = document.createElement('input');
		fileInput.type = 'file';
		fileInput.addEventListener('change', (e) => {
			const files = (e.target as HTMLInputElement).files;
			let file: File;
			if (files != null) {
				file = files[0];
			} else {
				return;
			}
			const reader = new FileReader();
			reader.onload = (e) => {
				const text = (e.target as FileReader).result;
				if (text) {
					loadCards(text as string);
					const setName = file.name.replace('.json', '');
					setCardSet(setName);
					localStorage.setItem('set', setName);
				} else {
					console.error('no text');
				}
			};
			reader.readAsText(file);
		});
		fileInput.click();
	}

	const isInitialMount = useRef(true);

	useEffect(() => {
		if (isInitialMount.current) {
			loadCards();
			isInitialMount.current = false;
		} else {
			saveCards();
		}
	}, [cards]);

	return (
		<div>
			{/* <h2>simple flashcards</h2> */}
			<p>
				<strong>{cardSet ? `Set: ${cardSet}` : 'No set selected'}</strong>
			</p>
			<div className="flex">
				<div>
					<CardList
						cards={cards}
						setCards={setCards}
						setStatusMessage={setStatusMessage}
						setFocusedCard={setFocusedCard}
						focusedCard={focusedCard}
					/>
				</div>

				<div>
					<CardView focusedCard={focusedCard} setFocusedCard={setFocusedCard} />
				</div>
			</div>

			<NewFlashcardForm
				cards={cards}
				setCards={setCards}
				setStatusMessage={setStatusMessage}
				saveCards={saveCards}
				setCardSet={setCardSet}
			/>
			<button onClick={saveSet}>save to disk</button>
			<button onClick={loadSet}>load from disk</button>
			<QuizletButton loadCards={loadCards} />
			<br />
			<br />
			<p>{statusMessage}</p>
			<p>
				<span className="gray">Current time:</span>
				{' ' + time}
			</p>
		</div>
	);
}

export default App;
