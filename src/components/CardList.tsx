import card from '../card';

export default function CardList({
	cards,
	setCards,
	setStatusMessage,
	focusedCard,
	setFocusedCard,
}: {
	cards: card[];
	setCards: React.Dispatch<React.SetStateAction<card[]>>;
	setStatusMessage: React.Dispatch<React.SetStateAction<string>>;
	focusedCard: card | null;
	setFocusedCard: React.Dispatch<React.SetStateAction<card | null>>;
}) {
	function deleteCard(card: card) {
		setCards(cards.filter((c) => c.id !== card.id));
		setStatusMessage('Deleted ' + card.name);
	}

	return (
		<div>
			<p>{cards.length <= 0 ? "You don't have any cards yet" : ''}</p>
			<ul>
				{cards.map((card) => (
					<li key={card.id}>
						<a
							href=""
							onClick={(e) => {
								setFocusedCard(card);
								e.preventDefault();
							}}
						>
							{focusedCard?.id == card.id ? <strong>{card.name}</strong> : card.name}
						</a>{' '}
						<button onClick={() => deleteCard(card)}>delete</button>
					</li>
				))}
			</ul>
		</div>
	);
}
