import React, { useEffect, useState, useRef } from 'react';
import NewFlashcardForm from './components/NewFlashcardForm';
import CardList from './components/CardList';
import CardView from './components/CardView';
import card from './card';

function App() {
	const [cards, setCards] = useState<card[]>([]);
	const [focusedCard, setFocusedCard] = useState<card | null>(null);
	const [statusMessage, setStatusMessage] = useState<string>('Hello there');
	const [time, setTime] = useState<string>(new Date().toLocaleTimeString());

	setTimeout(() => {
		setTime(new Date().toLocaleTimeString());
	}, 1000);

	function loadCards() {
		let newCards = localStorage.getItem('cards') || '';
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
		localStorage.setItem('cards', JSON.stringify(cards));
		console.log('Saved', cards);
		setStatusMessage('Saved cards at ' + new Date().toLocaleTimeString());
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
			<h2>simple flashcards</h2>

			<CardView focusedCard={focusedCard} setFocusedCard={setFocusedCard} />

			<CardList
				cards={cards}
				setCards={setCards}
				setStatusMessage={setStatusMessage}
				setFocusedCard={setFocusedCard}
				focusedCard={focusedCard}
			/>

			<NewFlashcardForm
				cards={cards}
				setCards={setCards}
				setStatusMessage={setStatusMessage}
				saveCards={saveCards}
			/>
			<p>{statusMessage}</p>
			<p>
				<span className="gray">Current time:</span>
				{' ' + time}
			</p>
		</div>
	);
}

export default App;
