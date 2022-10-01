import card from '../card';

export default function CardView({
	focusedCard,
	setFocusedCard,
}: {
	focusedCard: card | null;
	setFocusedCard: React.Dispatch<React.SetStateAction<card | null>>;
}) {
	return (
		<div className="card-view">
			{focusedCard ? (
				<>
					<h1>{focusedCard.name}</h1>
					{focusedCard.content.split('\n').map((line, i) => (
						<p key={i}>{line}</p>
					))}
					<button onClick={() => setFocusedCard(null)}>hide</button>
				</>
			) : (
				<p>Click a card to view it</p>
			)}
		</div>
	);
}
